"use client";

import React from "react";
import Image from "next/image";

/**
 * SECTION 1: HERO
 * 
 * ALASAN DESAIN (BUKAN TEMPLATE GENERIK):
 * 1. Tidak ada teks centered di tengah dengan 2 tombol pill kembar dan floating laptop mockup.
 * 2. Menggunakan 1 foto full-bleed dramatis dari satu kursi kayu buatan tangan di sudut workshop yang temaram.
 * 3. Teks ditaruh sengaja di kiri bawah layar (off-center) dengan tipografi tegas, membiarkan foto bernapas
 *    seperti sampul majalah interior independen.
 * 4. Scroll indicator dibuat minimalis dan fungsional di sudut kanan bawah, tanpa animasi bounce kartun.
 */
export default function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[680px] bg-[#2B2118] text-[#F5F1EA] overflow-hidden">
      {/* Full-bleed Photo of 1 Solid Timber Chair in Dark Workshop */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2200&q=85"
          alt="Satu kursi santai kayu jati di sudut workshop Efendy Jepara"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-75 contrast-105"
        />
        {/* Natural vignette from dark timber tones, without colorful gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B2118] via-[#2B2118]/40 to-transparent" />
      </div>

      {/* Asymmetric Bottom Content Placement */}
      <div className="relative h-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col justify-end pb-12 sm:pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Bottom Left: Human headline & candid narration */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#8B6F47] font-semibold block">
              Workshop Furniture Kayu Custom · Tahunan, Jepara
            </span>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal leading-[1.02] tracking-tight text-[#F5F1EA]">
              Kayu jati. <br />
              Tangan kami. <br />
              <span className="italic text-[#8B6F47]">Rumah kamu.</span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-[#F5F1EA]/80 max-w-lg leading-relaxed font-normal pt-1">
              Awalnya cuma garasi kecil tahun 1994. Bapak yang mulai dengan gergaji tangan dan serut kayu manual, 
              sekarang saya yang nerusin bareng 14 tukang kayu senior di Jepara. Kami tidak bikin ribuan unit 
              dalam sepekan — kami bikin satu meja atau lemari yang bakal kamu warisin ke anakmu.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6">
              <a
                href="#koleksi"
                className="inline-flex items-center text-xs uppercase tracking-[0.18em] font-semibold text-[#F5F1EA] border-b border-[#F5F1EA] pb-1 hover:text-[#8B6F47] hover:border-[#8B6F47] transition-colors"
              >
                Lihat Karya Bengkel ↓
              </a>
              <a
                href="https://wa.me/6281288997700?text=Halo%20Mas%20Efendy,%20mau%20konsultasi%20bikin%20furniture"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs uppercase tracking-[0.18em] font-semibold text-[#8B6F47] hover:text-[#F5F1EA] transition-colors"
              >
                Ngobrol dulu, gratis kok →
              </a>
            </div>
          </div>

          {/* Bottom Right: Minimalist Editorial Scroll Indicator */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#F5F1EA]/60 font-mono">
              <span>01 / 07</span>
              <span className="w-12 h-[1px] bg-[#F5F1EA]/30" />
              <span>Gulir</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
