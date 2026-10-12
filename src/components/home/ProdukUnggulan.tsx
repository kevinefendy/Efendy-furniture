"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import ScrollReveal from "@/components/common/ScrollReveal";
import type { Product } from "@/types";

// Produk unggulan: tab filter (Semua/Sofa/Meja/Kursi/Lemari/Tempat Tidur).
// Grid 4 kolom desktop, 2 tablet, 1 mobile. Filter tab: underline slide.
const TABS = ["Semua", "Sofa", "Meja", "Kursi", "Lemari", "Tempat Tidur"] as const;

interface Props {
  onQuickView: (p: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (p: Product) => void;
}

export default function ProdukUnggulan({ onQuickView, wishlistIds, onToggleWishlist }: Props) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Semua");

  const items = useMemo(() => {
    const list = tab === "Semua" ? PRODUCTS : PRODUCTS.filter((p) => p.category === tab);
    return list.slice(0, 8);
  }, [tab]);

  return (
    <section className="bg-white" aria-labelledby="unggulan-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[60px] lg:py-[100px]">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2
                id="unggulan-heading"
                className="font-serif font-medium text-[28px] lg:text-[44px] tracking-tight text-[#1A1A1A]"
              >
                Paling laris minggu ini
              </h2>
              <p className="mt-2 text-[17px] text-[#6B6B6B]">
                Pilihan pelanggan yang sudah terbukti nyaman dan awet.
              </p>
            </div>
            <Link
              href="/shop"
              className="shrink-0 text-[15px] font-medium text-[#1A1A1A] underline underline-offset-4 decoration-[#C2410C] decoration-2"
            >
              Lihat semua produk
            </Link>
          </div>
        </ScrollReveal>

        {/* Tab filter dengan underline slide */}
        <ScrollReveal>
          <div className="flex gap-6 overflow-x-auto border-b border-[#E8E6E1] mb-8" role="tablist" aria-label="Filter produk unggulan">
            {TABS.map((t) => {
              const aktif = tab === t;
              return (
                <button
                  key={t}
                  role="tab"
                  aria-selected={aktif}
                  onClick={() => setTab(t)}
                  className={`relative whitespace-nowrap pb-3 text-[15px] transition-colors ${
                    aktif ? "font-semibold text-[#1A1A1A]" : "text-[#6B6B6B] hover:text-[#1A1A1A]"
                  }`}
                >
                  {t}
                  {/* underline slide */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#C2410C] transition-all duration-300 ${
                      aktif ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((p, i) => (
            <ScrollReveal key={p.id} delay={Math.min(i * 60, 240)}>
              <ProductCard
                product={p}
                onQuickView={onQuickView}
                isWishlisted={wishlistIds.includes(p.id)}
                onToggleWishlist={onToggleWishlist}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
