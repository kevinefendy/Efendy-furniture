"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import ProductGrid from "@/components/product/ProductGrid";
import { ProductCategory } from "@/types";

const CATEGORIES: ("All" | ProductCategory)[] = [
  "All",
  "Sofa",
  "Chair",
  "Table",
  "Bed",
  "Storage",
  "Lighting",
  "Decor",
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return PRODUCTS;
    }
    return PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Editorial Header */}
      <div className="border-b border-[#E5E1DB] pb-8 mb-8">
        <span className="text-xs uppercase tracking-widest text-[#A88968] font-semibold block mb-2">
          The Full Collection
        </span>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <h1 className="font-serif text-3xl sm:text-5xl text-[#20201E] tracking-tight">
            Shop All Furniture
          </h1>
          <p className="text-xs sm:text-sm text-[#817A71] tracking-wider uppercase font-medium">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? "Piece" : "Pieces"}
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-[#E5E1DB]/60">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? "bg-[#20201E] text-white"
                : "bg-white text-stone-600 border border-[#E5E1DB] hover:border-stone-400"
            }`}
          >
            {cat === "All" ? "All Pieces" : cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
