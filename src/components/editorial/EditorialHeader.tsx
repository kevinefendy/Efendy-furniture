"use client";

import React, { useState, useEffect } from "react";

/**
 * EditorialHeader
 * 
 * ALASAN DESAIN:
 * Tidak memakai navbar tebal dengan backdrop-blur pelangi atau tombol gradien berkilau.
 * Mengadopsi header masthead majalah arsitektur: tipografi tenang, proporsi renggang,
 * dan tautan langsung ke WhatsApp pemilik bengkel tanpa perantara chatbot.
 */
export default function EditorialHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#F5F1EA]/95 border-b border-[#2B2118]/15 py-4"
          : "bg-transparent py-6 sm:py-8"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between">
        {/* Brand Masthead */}
        <a
          href="#"
          className="group flex flex-col focus:outline-none"
          aria-label="Efendy Furniture Beranda"
        >
          <span className="font-serif text-xl sm:text-2xl font-normal text-[#2B2118] tracking-tight leading-none group-hover:text-[#8B6F47] transition-colors">
            Efendy
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#8B6F47] mt-1 font-medium">
            Jepara · Est. 1994
          </span>
        </a>

        {/* Minimal Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.16em] text-[#2B2118]/80 font-medium">
          <a href="#koleksi" className="hover:text-[#8B6F47] transition-colors">
            Koleksi
          </a>
          <a href="#manifesto" className="hover:text-[#8B6F47] transition-colors">
            Filosofi
          </a>
          <a href="#proses" className="hover:text-[#8B6F47] transition-colors">
            Cara Kerja
          </a>
          <a href="#testimoni" className="hover:text-[#8B6F47] transition-colors">
            Kata Mereka
          </a>
          <a href="#kontak" className="hover:text-[#8B6F47] transition-colors">
            Bengkel
          </a>
        </nav>

        {/* Candid WA Contact */}
        <a
          href="https://wa.me/6281288997700?text=Halo%20Mas%20Efendy,%20saya%20mau%20tanya-tanya%20furniture%20custom"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border border-[#2B2118] text-[#2B2118] text-xs uppercase tracking-[0.14em] font-medium hover:bg-[#2B2118] hover:text-[#F5F1EA] transition-colors duration-200"
        >
          <span>Chat Mas Efendy</span>
          <span className="text-[10px]">💬</span>
        </a>
      </div>
    </header>
  );
}
