"use client";

import React from "react";

/**
 * SECTION 3: MANIFESTO
 * 
 * ALASAN DESAIN (BUKAN TEMPLATE GENERIK):
 * 1. Tidak dibungkus card dengan rounded corners dan drop-shadow tebal.
 * 2. Tidak memakai 3 icon line-art dengan heading "Why Choose Us".
 * 3. Diletakkan telanjang di atas kanvas kertas (#F5F1EA) dengan ruang kosong luas (intentional white space),
 *    menggunakan font serif 40px-52px seperti esai pembuka majalah Cereal / Kinfolk.
 * 4. Kata-kata ditulis langsung dari sudut pandang tukang kayu, bukan copywriter korporat.
 */
export default function ManifestoSection() {
  return (
    <section
      id="manifesto"
      className="relative py-24 sm:py-36 lg:py-44 px-6 sm:px-10 lg:px-14 bg-[#F5F1EA] text-[#2B2118]"
    >
      <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
        <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8B6F47] font-semibold block">
          Manifesto Bengkel
        </span>

        {/* The 3-line 48px Serif Paragraph */}
        <blockquote className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] leading-[1.28] tracking-tight text-[#2B2118] font-normal">
          &ldquo;Kami tidak bikin ribuan kursi seragam dalam sehari di pabrik bising. 
          Kami rawat sebatang kayu jati tua dari Blora sampai pas masuk ke ruang makan rumahmu.&rdquo;
        </blockquote>

        <div className="pt-2 max-w-xl mx-auto space-y-4">
          <div className="w-12 h-[1px] bg-[#8B6F47] mx-auto" />
          <p className="font-sans text-sm sm:text-base text-[#8B6F47] leading-relaxed">
            Kayu itu makhluk hidup yang terus bernapas bahkan setelah jadi meja. 
            Kalau dipotong sembarangan atau dipaksa kering kilat, nanti melengkung saat kena AC. 
            Kami luangkan waktu 3 sampai 6 minggu agar seratnya tenang dan tahan puluhan tahun.
          </p>
          <span className="font-serif italic text-xs text-[#2B2118]/70 block pt-1">
            — Bpk. Efendy & Tim Pengrajin Jepara
          </span>
        </div>
      </div>
    </section>
  );
}
