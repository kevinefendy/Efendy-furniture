"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCompany } from "@/context/CompanyContext";
import {
  Sun,
  Moon,
  Globe,
  Menu,
  X,
  Type,
  MessageCircle,
} from "lucide-react";
import MagneticButton from "@/components/common/MagneticButton";

export default function CompanyNavbar() {
  const {
    theme,
    toggleTheme,
    lang,
    setLang,
    toggleLang,
    fontSize,
    toggleFontSize,
    openConsultModal,
    t,
  } = useCompany();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#koleksi", label: lang === "id" ? "Koleksi" : "Collection" },
    { href: "#custom", label: lang === "id" ? "Custom" : "Bespoke" },
    { href: "#kualitas", label: lang === "id" ? "Material" : "Materials" },
    { href: "#garansi", label: lang === "id" ? "Garansi" : "Warranty" },
    { href: "#testimoni", label: lang === "id" ? "Testimoni" : "Reviews" },
    { href: "#kontak", label: lang === "id" ? "Kontak" : "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-[#121211]/90 backdrop-blur-md border-b border-[#EEEEEC] dark:border-[#221F1B] py-3.5 shadow-xs"
          : "bg-white/80 dark:bg-transparent py-5 sm:py-6 border-b border-black/5 dark:border-white/5 backdrop-blur-xs"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Sleek Minimalist Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="Efendy Furniture"
        >
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-normal tracking-[0.1em] text-[#1D1A16] dark:text-[#F5F2EB] group-hover:text-amber-500 transition-colors">
              EFENDY
            </span>
            <span className="text-[9px] uppercase tracking-[0.28em] text-[#7A7267] dark:text-[#9A9184] font-medium -mt-1">
              FURNITURE · 1998
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Clean & Airy) */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.16em] font-medium text-[#7A7267] dark:text-[#A39B8E] hover:text-[#1D1A16] dark:hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Boomer Accessibility: Font Size Switcher */}
          <button
            onClick={toggleFontSize}
            title={lang === "id" ? (fontSize === "normal" ? "Perbesar Teks (A+)" : "Ukuran Normal (A)") : (fontSize === "normal" ? "Enlarge Text (A+)" : "Normal Size (A)")}
            aria-label={lang === "id" ? "Ubah Ukuran Teks" : "Toggle Text Size"}
            className={`p-2 rounded-xl text-xs font-semibold border transition-all ${
              fontSize === "large"
                ? "bg-amber-500 text-stone-900 border-amber-400 font-bold"
                : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-[#7A7267] dark:text-[#A39B8E] hover:bg-black/10 dark:hover:bg-white/10"
            }`}
          >
            <span className="flex items-center gap-1">
              <Type size={13} />
              <span className="text-[10px] font-bold">{fontSize === "normal" ? "A" : "A+"}</span>
            </span>
          </button>

          {/* Language Switcher [ ID | EN ] */}
          <div className="flex items-center rounded-sm bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-0.5 text-xs font-semibold">
            <button
              onClick={() => setLang("id")}
              className={`px-2.5 py-1 rounded-sm text-[11px] font-bold transition-all ${
                lang === "id"
                  ? "bg-[#20201E] text-white dark:bg-white dark:text-[#121211] shadow-xs"
                  : "text-[#817A71] dark:text-[#A19A8F] hover:text-[#20201E] dark:hover:text-white"
              }`}
              aria-label="Bahasa Indonesia"
            >
              ID
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-sm text-[11px] font-bold transition-all ${
                lang === "en"
                  ? "bg-[#20201E] text-white dark:bg-white dark:text-[#121211] shadow-xs"
                  : "text-[#817A71] dark:text-[#A19A8F] hover:text-[#20201E] dark:hover:text-white"
              }`}
              aria-label="English"
            >
              EN
            </button>
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            title={lang === "id" ? (theme === "dark" ? "Mode Terang" : "Mode Gelap") : (theme === "dark" ? "Light Mode" : "Dark Mode")}
            aria-label={lang === "id" ? "Ganti Tema" : "Toggle Theme"}
            className="p-2 rounded-xl text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[#7A7267] dark:text-[#A39B8E] hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            {theme === "dark" ? (
              <Sun size={15} className="text-amber-400" />
            ) : (
              <Moon size={15} className="text-stone-700" />
            )}
          </button>

          {/* WhatsApp CTA */}
          <div className="hidden sm:block ml-1">
            <MagneticButton
              onClick={() => openConsultModal()}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs tracking-wider uppercase shadow-sm"
            >
              <MessageCircle size={14} />
              <span>WhatsApp</span>
            </MagneticButton>
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl lg:hidden bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-[#1D1A16] dark:text-[#F5F2EB]"
            aria-label={lang === "id" ? "Buka Menu" : "Toggle Menu"}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EEEEEC] dark:border-[#24201C] bg-white dark:bg-[#12100E] px-5 py-6 space-y-4 animate-in slide-in-from-top-3 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-lg text-sm font-medium text-[#1E1B18] dark:text-[#F5F2EB] hover:bg-black/5 dark:hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-[#E5DFD5] dark:border-[#24201C]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openConsultModal();
              }}
              className="w-full py-3.5 rounded-xl bg-emerald-600 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle size={16} />
              <span>{lang === "id" ? "Konsultasi WhatsApp" : "WhatsApp Consultation"}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
