"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { PRODUCTS, ROOMS_DATA } from "@/data/products";
import { formatIDR } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = ["Sofa", "Meja makan", "Kursi kerja", "Lemari", "Tempat tidur", "Rak"];

// Cari nama produk, kategori, koleksi, gaya, material, dan ruangan.
function cariProduk(q: string, limit: number) {
  const query = q.trim().toLowerCase();
  if (!query) return [];
  return PRODUCTS.filter((p) => {
    const ruang = ROOMS_DATA.find((r) => r.id === p.room)?.name.toLowerCase() ?? "";
    return (
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      (p.collectionName && p.collectionName.toLowerCase().includes(query)) ||
      p.style.toLowerCase().includes(query) ||
      p.material.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      ruang.includes(query)
    );
  }).slice(0, limit);
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
      return () => clearTimeout(t);
    }
    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen ]);

  const liveResults = useMemo(() => cariProduk(query, 6), [query]);

  const keHalamanSearch = (kata: string) => {
    const q = kata.trim();
    if (!q) return;
    onClose();
    setQuery("");
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    keHalamanSearch(query);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start bg-black/60 animate-in fade-in duration-200">
      <div className="w-full bg-white border-b border-[#E8E6E1] py-8 px-4 sm:px-8 max-h-[85vh] overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[13px] uppercase tracking-widest text-[#6B6B6B] font-medium">
              Cari Furniture
            </span>
            <button
              onClick={onClose}
              className="p-2 text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
              aria-label="Tutup pencarian"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} role="search" className="relative">
            <label htmlFor="search-modal-input" className="sr-only">
              Cari furniture
            </label>
            <input
              id="search-modal-input"
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari nama, kategori, atau bahan… (mis. sofa, jati, rotan)"
              autoComplete="off"
              className="w-full bg-white border border-[#E8E6E1] rounded-[8px] py-4 pl-12 pr-12 text-[16px] placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#C2410C] transition-colors"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B6B]" size={20} />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#1A1A1A]"
                aria-label="Hapus kata kunci"
              >
                <X size={16} />
              </button>
            )}
          </form>

          {/* Pencarian populer */}
          {!query && (
            <div className="mt-6">
              <span className="text-[13px] text-[#6B6B6B] uppercase tracking-widest block mb-2 font-medium">
                Sering dicari
              </span>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => keHalamanSearch(item)}
                    className="px-4 py-1.5 bg-white border border-[#E8E6E1] text-sm hover:border-[#C2410C] hover:text-[#C2410C] rounded-full transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Hasil langsung */}
          {query.trim() && (
            <div className="mt-8">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E6E1] mb-4">
                <span className="text-[13px] uppercase tracking-widest font-medium text-[#6B6B6B]">
                  Hasil ({liveResults.length})
                </span>
                {liveResults.length > 0 && (
                  <button
                    type="button"
                    onClick={() => keHalamanSearch(query)}
                    className="text-sm font-medium text-[#C2410C] underline underline-offset-4 flex items-center gap-1"
                  >
                    Lihat semua <ArrowRight size={14} />
                  </button>
                )}
              </div>

              {liveResults.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-[15px] text-[#6B6B6B]">
                    Nggak ketemu yang cocok dengan “{query.trim()}”.
                  </p>
                  <button
                    type="button"
                    onClick={() => keHalamanSearch(query)}
                    className="mt-3 text-sm font-medium text-[#C2410C] underline underline-offset-4"
                  >
                    Tetap tampilkan di halaman pencarian
                  </button>
                </div>
              ) : (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {liveResults.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-4 p-3 bg-white border border-[#E8E6E1] rounded-[8px] hover:border-[#C2410C] transition-colors group"
                      >
                        <span className="relative w-16 h-16 bg-[#F7F7F5] rounded-[8px] overflow-hidden shrink-0">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="text-xs uppercase tracking-widest text-[#6B6B6B] block">
                            {product.category}
                          </span>
                          <span className="block text-[15px] font-medium truncate group-hover:text-[#C2410C] transition-colors">
                            {product.name}
                          </span>
                          <span className="price block text-sm font-semibold mt-0.5">
                            {formatIDR(product.price)}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Klik latar untuk tutup */}
      <div className="flex-1 w-full" onClick={onClose} aria-hidden />
    </div>
  );
}
