"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCompany } from "@/context/CompanyContext";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  TreePine,
  MessageCircle,
} from "lucide-react";
import MagneticButton from "@/components/common/MagneticButton";

export default function HeroSection() {
  const { lang, openConsultModal } = useCompany();
  const [scrollY, setScrollY] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 45;
      const y = (e.clientY - innerHeight / 2) / 45;
      setMouseOffset({ x, y });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-white dark:bg-[#121211] text-[#1A1A18] dark:text-[#F7F5F0] border-b border-[#EEEEEC] dark:border-[#2A2A26] transition-colors duration-300">
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAFAFA] dark:bg-white/5 border border-[#EEEEEC] dark:border-white/10 text-xs text-[#737370] dark:text-[#A19A8F] font-medium font-sans">
              <Sparkles size={13} className="text-[#A88968]" />
              <span>
                {lang === "id"
                  ? "Koleksi Arsitektural Efendy Furniture · 2026"
                  : "Efendy Furniture Architectural Living Capsule · 2026"}
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.04] tracking-tight text-[#1A1A18] dark:text-[#F7F5F0]">
              {lang === "id" ? (
                <>
                  Dirancang untuk <br />
                  <span className="italic font-normal text-stone-500 dark:text-stone-400">
                    kehidupan sehari-hari.
                  </span>
                </>
              ) : (
                <>
                  Designed for <br />
                  <span className="italic font-normal text-stone-500 dark:text-stone-400">
                    everyday living.
                  </span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-[#737370] dark:text-[#A19A8F] font-light leading-relaxed max-w-xl font-sans">
              {lang === "id"
                ? "Koleksi sofa, meja makan, kursi santai, lemari credenza, dan custom furniture. Dibuat presisi dengan kayu solid bersertifikat dan garansi rangka 10 tahun."
                : "Curated collection of sofas, dining tables, lounge chairs, credenzas, and custom furniture. Crafted with certified solid hardwood and backed by an official 10-year warranty."}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 font-sans">
              <MagneticButton
                onClick={() => openConsultModal()}
                className="px-8 py-4 bg-[#1A1A18] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#A88968] dark:bg-white dark:text-[#121211] dark:hover:bg-[#A88968] transition-all duration-200 rounded-sm shadow-sm flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} />
                <span>
                  {lang === "id" ? "Konsultasi WhatsApp" : "WhatsApp Consultation"}
                </span>
              </MagneticButton>

              <a
                href="#koleksi"
                className="inline-flex items-center justify-center px-8 py-4 border border-[#E5E5E5] dark:border-[#333] hover:border-[#1A1A18] dark:hover:border-white text-[#1A1A18] dark:text-[#F7F5F0] text-xs font-semibold uppercase tracking-widest hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-200 rounded-sm group"
              >
                <span>{lang === "id" ? "Lihat Koleksi" : "View Collection"}</span>
                <ArrowRight
                  size={15}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </a>
            </div>

            {/* Clean Trust Pills */}
            <div className="pt-6 border-t border-[#EEEEEC] dark:border-[#2A2A26] flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-[#737370] dark:text-[#A19A8F] font-light font-sans">
              <span className="flex items-center gap-2">
                <TreePine size={15} className="text-[#A88968]" />
                <span>
                  {lang === "id"
                    ? "Kayu Keras Solid Indonesia"
                    : "Solid Indonesian Hardwood"}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={15} className="text-[#A88968]" />
                <span>
                  {lang === "id"
                    ? "Garansi Rangka 10 Tahun"
                    : "10-Year Frame Warranty"}
                </span>
              </span>
              <span className="flex items-center gap-2">
                <Truck size={15} className="text-[#A88968]" />
                <span>
                  {lang === "id"
                    ? "Gratis Pengantaran & Pasang"
                    : "White-Glove In-Home Setup"}
                </span>
              </span>
            </div>
          </div>

          {/* Right Column: Framed Architectural Showcase with Subtle Shift */}
          <div className="lg:col-span-5 relative">
            <div
              className="relative aspect-[4/5] rounded-sm overflow-hidden border border-[#EEEEEC] dark:border-[#2A2A26] shadow-xl bg-[#F5F5F5] dark:bg-[#1A1A18]"
              style={{
                transform: `translate3d(${-mouseOffset.x * 0.25}px, ${-mouseOffset.y * 0.25}px, 0)`,
                transition: "transform 0.2s ease-out",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85"
                alt="Efendy Modern Architectural Living"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-[#A88968] font-semibold font-sans">
                  {lang === "id" ? "Koleksi Pilihan" : "Featured Series"}
                </span>
                <h3 className="font-serif text-2xl font-normal text-white">
                  Sora Living Capsule
                </h3>
                <p className="text-xs text-stone-200 font-light font-sans">
                  {lang === "id"
                    ? "Kayu Jati Solid & Linen Organik Belgia"
                    : "FSC Solid Teak & Organic Belgian Linen"}
                </p>
              </div>
            </div>

            {/* Small floating reassurance pill in bottom left */}
            <div className="absolute -bottom-5 -left-5 bg-white dark:bg-[#1A1A18] border border-[#EEEEEC] dark:border-[#2A2A26] rounded-sm p-3.5 shadow-lg hidden sm:flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FAFAFA] dark:bg-white/5 border border-[#EEEEEC] dark:border-white/10 flex items-center justify-center text-[#A88968]">
                <TreePine size={17} />
              </div>
              <div className="text-xs">
                <p className="font-serif text-sm font-normal text-[#1A1A18] dark:text-[#F7F5F0]">
                  100% Solid Hardwood
                </p>
                <p className="text-[11px] text-[#737370] dark:text-[#A19A8F]">
                  {lang === "id" ? "Kering oven & anti rayap" : "Kiln-dried & termite-free"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
