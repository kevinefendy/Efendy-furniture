"use client";

import { useState } from "react";
import Hero from "@/components/home/Hero";
import KategoriCepat from "@/components/home/KategoriCepat";
import ProdukUnggulan from "@/components/home/ProdukUnggulan";
import KenapaEfendy from "@/components/home/KenapaEfendy";
import ShopTheRoom from "@/components/home/ShopTheRoom";
import KoleksiKurasi from "@/components/home/KoleksiKurasi";
import Testimoni from "@/components/home/Testimoni";
import Showroom from "@/components/home/Showroom";
import Artikel from "@/components/home/Artikel";
import QuickViewModal from "@/components/product/QuickViewModal";
import { addToCart as addToCartStore, useWishlistIds, openCartDrawer } from "@/lib/store";
import type { Product } from "@/types";

// Homepage retail: Hero → Kategori → Unggulan → Kenapa → Shop the Room →
// Koleksi → Testimoni → Showroom → Artikel. Putih/#F7F7F5 bergantian.
export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { ids: wishlistIds, toggle: toggleWishlist } = useWishlistIds();

  return (
    <div className="flex flex-col w-full bg-white">
      <Hero />
      <KategoriCepat />
      <ProdukUnggulan
        onQuickView={setQuickViewProduct}
        wishlistIds={wishlistIds}
        onToggleWishlist={(p) => toggleWishlist(p.id)}
      />
      <KenapaEfendy />
      <ShopTheRoom />
      <KoleksiKurasi />
      <Testimoni />
      <Showroom />
      <Artikel />
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
