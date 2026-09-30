"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Eye } from "lucide-react";
import { Product } from "@/types";
import { formatIDR } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onQuickView,
  isWishlisted = false,
  onToggleWishlist,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const displayImage =
    isHovered && product.images[1] ? product.images[1] : product.images[0];

  return (
    <div
      className="group relative flex flex-col bg-white border border-[#E5E1DB]/60 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EAE6DF]">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <Image
            src={displayImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center transition-all duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.isNewArrival && (
            <span className="bg-[#20201E] text-white text-[10px] uppercase font-semibold px-2 py-0.5 tracking-widest">
              New
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="bg-[#6B6B6B] text-white text-[10px] uppercase font-semibold px-2 py-0.5 tracking-widest">
              Low Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleWishlist?.(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 ${
            isWishlisted
              ? "bg-[#6B6B6B] text-white shadow-sm"
              : "bg-white/80 backdrop-blur-sm text-[#20201E] hover:bg-white hover:text-[#6B6B6B]"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={16} className={isWishlisted ? "fill-current" : ""} />
        </button>

        {/* Quick View Button Hover Overlay */}
        {onQuickView && (
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10 hidden sm:block">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="w-full py-2.5 bg-white/95 backdrop-blur-sm text-[#20201E] text-xs font-semibold uppercase tracking-widest hover:bg-[#20201E] hover:text-white transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Eye size={14} />
              Quick View
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-[#817A71] mb-1">
            <span className="uppercase tracking-wider">{product.category}</span>
            <span className="font-serif italic text-stone-500">{product.style}</span>
          </div>
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-[15px] font-medium text-[#20201E] group-hover:text-[#6B6B6B] transition-colors leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>

        <div className="mt-3 pt-2 border-t border-[#E5E1DB]/50 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-[#20201E]">
              {formatIDR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                {formatIDR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color preview dots */}
          <div className="flex items-center gap-1">
            {product.colors.slice(0, 3).map((col) => (
              <span
                key={col.name}
                className="w-2.5 h-2.5 rounded-full border border-stone-300"
                style={{ backgroundColor: col.code }}
                title={col.name}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-[10px] text-stone-400">+{product.colors.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
