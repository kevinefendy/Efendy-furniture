"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import ProductGrid from "@/components/product/ProductGrid";
import QuickViewModal from "@/components/product/QuickViewModal";
import { addToCart as addToCartStore, useWishlistIds, openCartDrawer } from "@/lib/store";
import type { Product } from "@/types";
import { Search, X } from "lucide-react";
import Link from "next/link";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { ids: wishlistIds, toggle: toggleWishlist } = useWishlistIds();

  const searchResults = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return PRODUCTS;

    return PRODUCTS.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchCollection = p.collectionName?.toLowerCase().includes(q);
      const matchStyle = p.style.toLowerCase().includes(q);
      const matchMaterial = p.material.toLowerCase().includes(q);
      const matchDescription = p.description.toLowerCase().includes(q);

      return (
        matchName ||
        matchCategory ||
        matchCollection ||
        matchStyle ||
        matchMaterial ||
        matchDescription
      );
    });
  }, [searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="border-b border-[#E5E1DB] pb-8 mb-10">
        <span className="text-xs uppercase tracking-widest text-[#6B6B6B] font-bold block mb-2">
          Discover Furniture
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#20201E] tracking-tight mb-6">
          Search Results
        </h1>

        {/* Search Bar Input */}
        <div className="relative max-w-2xl">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by product name, category, or collection..."
            className="w-full bg-white border border-[#E5E1DB] rounded-sm py-3.5 pl-11 pr-10 text-sm text-[#20201E] focus:outline-none focus:border-[#6B6B6B] shadow-xs"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Counter */}
        <p className="mt-4 text-xs sm:text-sm text-[#817A71]">
          {searchTerm.trim() ? (
            <>
              Found <strong className="text-[#20201E]">{searchResults.length}</strong> {searchResults.length === 1 ? "product" : "products"} for &ldquo;<span className="italic">{searchTerm}</span>&rdquo;
            </>
          ) : (
            `Showing all ${searchResults.length} products in our collection`
          )}
        </p>
      </div>

      {/* Results or Empty State */}
      {searchResults.length > 0 ? (
        <ProductGrid
          products={searchResults}
          onQuickView={setQuickViewProduct}
          wishlistIds={wishlistIds}
          onToggleWishlist={(p) => toggleWishlist(p.id)}
        />
      ) : (
        <div className="py-20 text-center bg-white border border-[#E5E1DB] rounded-sm p-8">
          <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#817A71]">
            <Search size={24} />
          </div>
          <h3 className="font-serif text-2xl text-[#20201E]">No pieces match your search</h3>
          <p className="text-sm text-[#817A71] max-w-md mx-auto mt-2 mb-6">
            We couldn&apos;t find any furniture matching &ldquo;{searchTerm}&rdquo;. Try browsing by our core categories below:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Sofa", "Chair", "Table", "Bed", "Lighting"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSearchTerm(cat)}
                className="px-4 py-2 bg-[#F7F5F0] border border-[#E5E1DB] text-xs uppercase tracking-wider font-semibold hover:border-[#6B6B6B] transition-colors"
              >
                {cat}
              </button>
            ))}
            <Link
              href="/shop"
              className="px-4 py-2 bg-[#20201E] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#6B6B6B] transition-colors"
            >
              All Catalog
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
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center">Loading search results...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
