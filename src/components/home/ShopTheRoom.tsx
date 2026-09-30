"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SHOP_THE_ROOM_DATA } from "@/data/products";
import { formatIDR } from "@/lib/utils";
import { ArrowRight, X } from "lucide-react";

export default function ShopTheRoom() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(
    SHOP_THE_ROOM_DATA.hotspots[0].id
  );

  return (
    <section className="py-20 bg-white border-t border-[#E5E1DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#A88968] font-semibold block mb-2">
            Interactive Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#20201E] tracking-tight">
            Shop This Room
          </h2>
          <p className="mt-2 text-sm text-[#817A71]">
            Tap the illuminated pins on the scene below to explore and purchase the curated pieces.
          </p>
        </div>

        {/* Large Room Image Frame */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-sm overflow-hidden bg-stone-900 shadow-md">
          <Image
            src={SHOP_THE_ROOM_DATA.image}
            alt={SHOP_THE_ROOM_DATA.roomName}
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-center filter brightness-95"
          />

          {/* Hotspots */}
          {SHOP_THE_ROOM_DATA.hotspots.map((spot) => {
            const isActive = activeHotspot === spot.id;
            return (
              <div
                key={spot.id}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{ top: spot.top, left: spot.left }}
              >
                {/* Hotspot Pin */}
                <button
                  onClick={() => setActiveHotspot(isActive ? null : spot.id)}
                  className={`group relative flex items-center justify-center w-11 h-11 rounded-full transition-transform ${
                    isActive ? "scale-110" : "hover:scale-110"
                  }`}
                  aria-label={`View ${spot.name}`}
                  aria-expanded={isActive}
                >
                  <span className="absolute w-full h-full rounded-full bg-white/40 animate-ping opacity-75" />
                  <span
                    className={`relative w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors ${
                      isActive
                        ? "bg-[#A88968] text-white border-white shadow-lg"
                        : "bg-white text-[#20201E] border-[#20201E]/20 hover:bg-[#A88968] hover:text-white"
                    }`}
                  >
                    ●
                  </span>
                </button>

                {/* Popover Card */}
                {isActive && (
                  <div className="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 w-56 sm:w-64 max-w-[calc(100vw-3rem)] bg-white/95 backdrop-blur-md p-4 rounded-sm shadow-2xl border border-[#E5E1DB] animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#A88968] font-bold">
                          {spot.color}
                        </span>
                        <h4 className="font-serif text-base text-[#20201E] font-medium leading-tight">
                          {spot.name}
                        </h4>
                        <p className="text-xs font-semibold text-stone-800 mt-1">
                          {formatIDR(spot.price)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveHotspot(null);
                        }}
                        className="text-stone-400 hover:text-stone-700"
                        aria-label="Close hotspot preview"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <Link
                      href={`/product/${spot.slug}`}
                      className="mt-3 w-full py-1.5 bg-[#20201E] text-white text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1 hover:bg-[#A88968] transition-colors"
                    >
                      View Piece
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick summary below image */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SHOP_THE_ROOM_DATA.hotspots.map((spot) => (
            <div
              key={spot.id}
              onClick={() => setActiveHotspot(spot.id)}
              className={`p-4 rounded-sm border cursor-pointer transition-all ${
                activeHotspot === spot.id
                  ? "border-[#A88968] bg-[#F7F5F0]"
                  : "border-[#E5E1DB] bg-white hover:border-stone-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-sm font-semibold text-[#20201E]">{spot.name}</h4>
                  <p className="text-xs text-[#817A71] mt-0.5">{formatIDR(spot.price)}</p>
                </div>
                <Link
                  href={`/product/${spot.slug}`}
                  className="text-xs text-[#A88968] hover:underline font-medium"
                >
                  Shop →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
