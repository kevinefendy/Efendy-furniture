"use client";

import { useEffect, useState } from "react";
import { ArrowUp, ShoppingBag } from "lucide-react";
import { useCartCount, openCartDrawer, useCart } from "@/lib/store";

// Floating: cart kalau ada item, back-to-top setelah scroll 500px.
export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const count = useCartCount();
  const { subtotal } = useCart();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (count === 0 && !showTop) return null;

  // Naik ke atas tombol Chair AI (pojok kanan bawah) biar tidak numpuk
  return (
    <div className="fixed bottom-[92px] right-5 z-40 flex flex-col items-end gap-3 sm:right-6 pointer-events-none [&>*]:pointer-events-auto">
      {/* Cart mengambang kalau ada item */}
      {count > 0 && (
        <button
          onClick={() => openCartDrawer()}
          className="flex items-center gap-2 rounded-full bg-[#1A1A1A] text-white pl-4 pr-5 py-3 text-sm font-medium hover:bg-black transition-colors shadow-lg"
          aria-label={`Buka keranjang, ${count} barang`}
        >
          <span className="relative">
            <ShoppingBag size={19} />
            <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-[#C2410C] text-white text-[11px] font-bold flex items-center justify-center">
              {count}
            </span>
          </span>
          <span className="price">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(subtotal)}
          </span>
        </button>
      )}

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-11 h-11 rounded-full bg-white border border-[#E8E6E1] text-[#1A1A1A] flex items-center justify-center hover:border-[#1A1A1A] transition-colors shadow-md"
          aria-label="Kembali ke atas"
        >
          <ArrowUp size={19} />
        </button>
      )}
    </div>
  );
}

// Agar import lama tidak rusak
export function BackToTop() {
  return null;
}
