"use client";

import { useState } from "react";
import Hero from "@/components/home/Hero";
import ShopByRoom from "@/components/home/ShopByRoom";
import NewArrivals from "@/components/home/NewArrivals";
import CollectionSpotlight from "@/components/home/CollectionSpotlight";
import ShopTheRoom from "@/components/home/ShopTheRoom";
import InspirationSection from "@/components/home/InspirationSection";
import HomeCta from "@/components/home/HomeCta";
import QuickViewModal from "@/components/product/QuickViewModal";
import { PRODUCTS } from "@/data/products";
import { addToCart as addToCartStore, useWishlistIds } from "@/lib/store";
import type { Product } from "@/types";

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { ids: wishlistIds, toggle: toggleWishlist } = useWishlistIds();

  return (
    <div className="flex flex-col w-full">
      <Hero />
      <ShopByRoom />
      <NewArrivals
        products={PRODUCTS}
        onQuickView={setQuickViewProduct}
        wishlistIds={wishlistIds}
        onToggleWishlist={(p) => toggleWishlist(p.id)}
      />
      <CollectionSpotlight />
      <ShopTheRoom />
      <InspirationSection />
      <HomeCta />
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, color, size, qty) => addToCartStore(p, color, size, qty || 1)}
      />
    </div>
  );
}
