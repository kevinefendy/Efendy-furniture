"use client";

import React from "react";

/**
 * SECTION 2: MARQUEE
 * 
 * ALASAN DESAIN (BUKAN TEMPLATE GENERIK):
 * 1. Tidak menggunakan pita warna neon atau icon bintang berputar yang berisik.
 * 2. Menggunakan teks besar serif editorial monokromatik seperti heading koran klasik.
 * 3. Frasa yang mengalir sederhana dan membumi: jenis kayu asli nusantara dan layanan custom order.
 */
export default function MarqueeText() {
  const phrases = [
    "jati",
    "mahoni",
    "sungkai",
    "custom order",
    "sambungan purus",
    "kering oven",
    "jepara 1994",
  ];

  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden py-6 sm:py-8 bg-[#F5F1EA] border-b border-[#2B2118]/15 select-none"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {/* Repeating text block for seamless infinite scrolling */}
        {[...phrases, ...phrases, ...phrases].map((item, index) => (
          <span
            key={index}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#2B2118] whitespace-nowrap px-6 sm:px-10 tracking-tight lowercase italic"
          >
            {item} <span className="text-[#8B6F47] not-italic text-2xl sm:text-4xl ml-4">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
