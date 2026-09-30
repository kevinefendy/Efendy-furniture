"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { formatIDR } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = ["Sofa", "Nara", "Oak Table", "Lounge Chair", "Bed", "Lighting"];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const liveResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.collectionName && p.collectionName.toLowerCase().includes(q)) ||
        p.style.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q)
    ).slice(0, 4);
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full bg-[#F7F5F0] border-b border-[#E5E1DB] shadow-2xl py-8 px-4 sm:px-8 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header Close */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs uppercase tracking-widest text-[#6B6B6B] font-bold">
              Product Search
            </span>
            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-[#20201E] transition"
              aria-label="Close search"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search Input Form */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by furniture name, category, or style (e.g. sofa, oak, japandi)..."
              className="w-full bg-white border border-[#E5E1DB] rounded-sm py-4 pl-12 pr-12 text-base text-[#20201E] placeholder-stone-400 focus:outline-none focus:border-[#6B6B6B] shadow-sm font-sans"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X size={16} />
              </button>
            )}
          </form>

          {/* Popular Suggestions */}
          {!query && (
            <div className="mt-6">
              <span className="text-xs text-[#817A71] uppercase tracking-wider block mb-2 font-medium">
                Trending Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQuery(item)}
                    className="px-3 py-1.5 bg-white border border-[#E5E1DB] text-xs text-[#20201E] hover:border-[#6B6B6B] hover:text-[#6B6B6B] rounded-full transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Live Preview Results */}
          {query && (
            <div className="mt-8">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E1DB] mb-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#817A71]">
                  Live Results ({liveResults.length})
                </span>
                {liveResults.length > 0 && (
                  <button
                    onClick={handleSearchSubmit}
                    className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] hover:underline flex items-center gap-1"
                  >
                    View All Results <ArrowRight size={13} />
                  </button>
                )}
              </div>

              {liveResults.length === 0 ? (
                <div className="py-8 text-center text-sm text-[#817A71]">
                  No matching furniture pieces for &ldquo;{query}&rdquo;. Press Enter to view full search page.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {liveResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-3 bg-white border border-[#E5E1DB] rounded-sm hover:border-[#6B6B6B] transition-all group"
                    >
                      <div className="relative w-16 h-16 bg-stone-100 rounded-xs overflow-hidden shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-[#817A71] block">
                          {product.category} • {product.style}
                        </span>
                        <h4 className="font-serif text-sm text-[#20201E] group-hover:text-[#6B6B6B] transition-colors truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs font-semibold text-stone-900 mt-0.5">
                          {formatIDR(product.price)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Background click to close */}
      <div className="flex-1 w-full" onClick={onClose} />
    </div>
  );
}
