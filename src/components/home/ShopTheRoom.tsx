"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, X } from "lucide-react";
import { SHOP_THE_ROOM_DATA } from "@/data/products";
import ScrollReveal from "@/components/common/ScrollReveal";
import { formatIDR } from "@/lib/utils";

// Shop the Room: foto besar + pin interaktif. Klik pin → produk + harga + tombol beli.
export default function ShopTheRoom() {
  const [aktif, setAktif] = useState<string | null>(SHOP_THE_ROOM_DATA.hotspots[0].id);
  const hotspotAktif = SHOP_THE_ROOM_DATA.hotspots.find((h) => h.id === aktif);

  return (
    <section className="bg-white" aria-labelledby="shop-room-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[60px] lg:py-[100px]">
        <ScrollReveal>
          <h2
            id="shop-room-heading"
            className="font-serif font-medium text-[28px] lg:text-[44px] tracking-tight text-[#1A1A1A] text-center"
          >
            Belanja langsung dari fotonya
          </h2>
          <p className="mt-3 text-[17px] text-[#6B6B6B] text-center max-w-2xl mx-auto">
            {SHOP_THE_ROOM_DATA.roomName} — {SHOP_THE_ROOM_DATA.description} Klik titiknya buat lihat harga.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mt-10 relative rounded-[8px] overflow-hidden border border-[#E8E6E1] bg-[#F7F7F5]">
            <div className="relative aspect-[16/10] sm:aspect-[16/8]">
              <Image
                src={SHOP_THE_ROOM_DATA.image}
                alt={`${SHOP_THE_ROOM_DATA.roomName} — klik titik untuk belanja produknya`}
                fill
                sizes="100vw"
                className="object-cover"
              />
              {/* Pin interaktif */}
              {SHOP_THE_ROOM_DATA.hotspots.map((h) => {
                const isAktif = aktif === h.id;
                return (
                  <button
                    key={h.id}
                    onClick={() => setAktif(isAktif ? null : h.id)}
                    aria-expanded={isAktif}
                    aria-label={`Lihat ${h.name}`}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group"
                    style={{ top: h.top, left: h.left }}
                  >
                    <span
                      className={`flex w-9 h-9 items-center justify-center rounded-full border-2 transition-colors ${
                        isAktif
                          ? "bg-[#C2410C] border-white text-white"
                          : "bg-white border-[#C2410C] text-[#C2410C] group-hover:bg-[#C2410C] group-hover:text-white"
                      }`}
                    >
                      {isAktif ? <X size={17} /> : <Plus size={17} />}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Panel produk aktif */}
            {hotspotAktif && (
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[340px] bg-white rounded-[8px] border border-[#E8E6E1] p-4 flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] uppercase tracking-widest text-[#6B6B6B]">
                    {hotspotAktif.color}
                  </p>
                  <p className="font-medium text-[15px] truncate">{hotspotAktif.name}</p>
                  <p className="price text-[15px] font-semibold text-[#C2410C]">
                    {formatIDR(hotspotAktif.price)}
                  </p>
                </div>
                <Link
                  href={`/product/${hotspotAktif.slug}`}
                  className="shrink-0 px-5 py-2.5 rounded-[8px] bg-[#1A1A1A] hover:bg-black text-white text-sm font-medium transition-colors"
                >
                  Beli
                </Link>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
