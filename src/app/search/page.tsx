"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, ROOMS_DATA } from "@/data/products";
import ProductGrid from "@/components/product/ProductGrid";
import QuickViewModal from "@/components/product/QuickViewModal";
import { addToCart as addToCartStore, useWishlistIds, openCartDrawer } from "@/lib/store";
import type { Product } from "@/types";
import { Search, X } from "lucide-react";
import Link from "next/link";

const KATEGORI_SUGGEST = ["Sofa", "Meja", "Kursi", "Lemari", "Tempat Tidur", "Rak", "Outdoor", "Dekorasi"];

function cocok(p: Product, q: string): boolean {
  const query = q.trim().toLowerCase();
  if (!query) return true;
  const ruang = ROOMS_DATA.find((r) => r.id === p.room)?.name.toLowerCase() ?? "";
  return (
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query) ||
    (p.collectionName?.toLowerCase().includes(query) ?? false) ||
    p.style.toLowerCase().includes(query) ||
    p.material.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query) ||
    ruang.includes(query)
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const paramQ = searchParams.get("q") || "";
  // Sinkron dengan URL: kalau datang dari hero/modal saat sudah di halaman ini, ikut update.
  const [searchTerm, setSearchTerm] = useState(paramQ);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { ids: wishlistIds, toggle: toggleWishlist } = useWishlistIds();

  useEffect(() => {
    setSearchTerm(paramQ);
  }, [paramQ]);

  const searchResults = useMemo(
    () => PRODUCTS.filter((p) => cocok(p, searchTerm)),
    [searchTerm]
  );

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="border-b border-[#E8E6E1] pb-8 mb-10">
          <span className="text-[13px] uppercase tracking-widest text-[#C2410C] font-semibold block mb-2">
            Pencarian
          </span>
          <h1 className="font-serif font-medium text-[32px] sm:text-[44px] tracking-tight mb-6">
            Hasil pencarian
          </h1>

          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="relative max-w-2xl"
          >
            <label htmlFor="search-page-input" className="sr-only">
              Cari furniture
            </label>
            <input
              id="search-page-input"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama produk, kategori, atau bahan…"
              className="w-full bg-white border border-[#E8E6E1] rounded-[8px] py-3.5 pl-11 pr-10 text-[16px] placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#C2410C] transition-colors"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6B6B]" size={18} />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#1A1A1A]"
                aria-label="Hapus pencarian"
              >
                <X size={16} />
              </button>
            )}
          </form>

          <p className="mt-4 text-[15px] text-[#6B6B6B]">
            {searchTerm.trim() ? (
              <>
                Ketemu <strong className="text-[#1A1A1A]">{searchResults.length}</strong> produk
                untuk “<span className="italic">{searchTerm.trim()}</span>”
              </>
            ) : (
              <>Menampilkan semua {searchResults.length} produk</>
            )}
          </p>
        </div>

        {searchResults.length > 0 ? (
          <ProductGrid
            products={searchResults}
            onQuickView={setQuickViewProduct}
            wishlistIds={wishlistIds}
            onToggleWishlist={(p) => toggleWishlist(p.id)}
          />
        ) : (
          <div className="py-16 text-center bg-white border border-[#E8E6E1] rounded-[8px] p-8">
            <div className="w-12 h-12 bg-[#F7F7F5] border border-[#E8E6E1] rounded-full flex items-center justify-center mx-auto mb-4 text-[#6B6B6B]">
              <Search size={22} />
            </div>
            <h2 className="font-serif font-medium text-2xl">Yah, nggak ketemu.</h2>
            <p className="text-[15px] text-[#6B6B6B] max-w-md mx-auto mt-2 mb-6">
              Coba kata lain, atau telusuri langsung per kategori di bawah ini:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {KATEGORI_SUGGEST.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSearchTerm(cat)}
                  className="px-4 py-2 bg-white border border-[#E8E6E1] text-sm font-medium rounded-full hover:border-[#C2410C] hover:text-[#C2410C] transition-colors"
                >
                  {cat}
                </button>
              ))}
              <Link
                href="/shop"
                className="px-4 py-2 bg-[#1A1A1A] text-white text-sm font-medium rounded-full hover:bg-black transition-colors"
              >
                Semua Katalog
              </Link>
            </div>
          </div>
        )}
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={(p, color, size, qty) => {
            addToCartStore(p, color, size, qty || 1);
            openCartDrawer();
          }}
        />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center">Memuat pencarian...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
