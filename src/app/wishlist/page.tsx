"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ArrowLeft, ShoppingBag } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import QuickViewModal from "@/components/product/QuickViewModal";
import {
  useWishlistIds,
  addToCart as addToCartStore,
  openCartDrawer,
} from "@/lib/store";
import type { Product } from "@/types";

export default function WishlistPage() {
  const { ids: wishlistIds, toggle: toggleWishlist } = useWishlistIds();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const handleMoveToBag = (p: Product, color: string, size?: string, qty = 1) => {
    addToCartStore(p, color, size, qty);
    toggleWishlist(p.id);
    openCartDrawer();
  };

  const handleQuickAddDefault = (p: Product) => {
    addToCartStore(p, p.colors[0]?.name || "", p.sizes?.[0], 1);
    openCartDrawer();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <span className="text-xs uppercase tracking-widest text-[#A88968] font-semibold block mb-2">
        Saved pieces
      </span>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 border-b border-[#E5E1DB] pb-8">
        <h1 className="font-serif text-3xl sm:text-5xl text-[#20201E] tracking-tight">
          My Wishlist ({wishlistProducts.length})
        </h1>
        <Link
          href="/shop"
          className="text-xs uppercase tracking-wider font-semibold text-[#A88968] hover:underline inline-flex items-center gap-1"
        >
          <ArrowLeft size={13} /> Continue Shopping
        </Link>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="py-20 text-center bg-white border border-[#E5E1DB] rounded-sm px-8">
          <div className="w-14 h-14 bg-[#F7F5F0] border border-[#E5E1DB] rounded-full flex items-center justify-center mx-auto mb-4 text-[#817A71]">
            <Heart size={26} />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#20201E]">
            Nothing saved yet
          </h2>
          <p className="text-sm text-[#817A71] max-w-md mx-auto mt-2 mb-8">
            Tap the heart icon on any product to save it here for later.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#20201E] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#A88968] transition-colors"
          >
            <ShoppingBag size={14} /> Explore Catalog
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="flex flex-col gap-2">
                <ProductCard
                  product={product}
                  onQuickView={setQuickViewProduct}
                  isWishlisted
                  onToggleWishlist={(p) => toggleWishlist(p.id)}
                />
                <button
                  onClick={() => handleQuickAddDefault(product)}
                  disabled={product.stock === 0}
                  className="w-full py-2.5 bg-[#20201E] text-white text-[11px] font-semibold uppercase tracking-widest hover:bg-[#A88968] transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag size={13} />
                  {product.stock === 0 ? "Out of Stock" : "Move to Bag"}
                </button>
              </div>
            ))}
          </div>

          <QuickViewModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
            onAddToCart={handleMoveToBag}
          />
        </>
      )}
    </div>
  );
}
