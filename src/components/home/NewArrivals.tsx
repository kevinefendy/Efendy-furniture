"use client";

import Link from "next/link";
import { Product } from "@/types";
import ProductCard from "@/components/product/ProductCard";
import { ArrowRight } from "lucide-react";

interface NewArrivalsProps {
  products: Product[];
  onQuickView?: (product: Product) => void;
  wishlistIds?: string[];
  onToggleWishlist?: (product: Product) => void;
}

export default function NewArrivals({
  products,
  onQuickView,
  wishlistIds = [],
  onToggleWishlist,
}: NewArrivalsProps) {
  const newArrivals = products.filter((p) => p.isNewArrival || p.featured).slice(0, 8);

  return (
    <section className="py-20 bg-white border-y border-[#E5E1DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#A88968] font-semibold block mb-2">
              Fresh Off The Workshop
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#20201E] tracking-tight">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/shop"
            className="mt-4 sm:mt-0 text-xs font-semibold uppercase tracking-widest text-[#20201E] hover:text-[#A88968] transition-colors flex items-center gap-1 group"
          >
            View All Pieces
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
