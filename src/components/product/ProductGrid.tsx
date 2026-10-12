"use client";

import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onQuickView?: (product: Product) => void;
  wishlistIds?: string[];
  onToggleWishlist?: (product: Product) => void;
}

export default function ProductGrid({
  products,
  onQuickView,
  wishlistIds = [],
  onToggleWishlist,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-serif font-medium text-2xl">Nggak ketemu.</p>
        <p className="text-[15px] text-[#6B6B6B] mt-2">
          Coba longgarkan filter atau pakai kata kunci lain.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
          isWishlisted={wishlistIds.includes(product.id)}
          onToggleWishlist={onToggleWishlist}
        />
      ))}
    </div>
  );
}
