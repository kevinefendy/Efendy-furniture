"use client";

import React from "react";
import { useCompany } from "@/context/CompanyContext";
import { PhoneCall, MapPin, Clock } from "lucide-react";

export default function CompanyFooter() {
  const { lang } = useCompany();
  const isId = lang === "id";

  return (
    <footer className="bg-[#100E0C] text-[#E5DFD5] border-t border-[#221F1B] pt-16 pb-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Intro */}
          <div className="lg:col-span-5 space-y-3">
            <span className="font-serif text-2xl font-normal tracking-wider text-white">
              EFENDY
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#A88968] block">
              FURNITURE & ATELIER · EST. 1998
            </span>
            <p className="text-xs text-[#A39B8E] leading-relaxed max-w-sm pt-1">
              {isId
                ? "Brand furniture premium all-rounder. Menjual sofa, meja makan, kursi santai, lemari credenza, dan custom furniture dengan garansi resmi 10 tahun."
                : "All-rounder premium furniture brand. Crafting luxury sofas, dining tables, lounge chairs, credenzas, and custom bespoke furniture with a 10-year official warranty."}
            </p>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs uppercase tracking-widest text-white font-medium">
              {isId ? "Koleksi" : "Collections"}
            </h4>
            <ul className="space-y-1.5 text-xs text-[#A39B8E]">
              <li><a href="#koleksi" className="hover:text-white transition-colors">{isId ? "Sofa Mewah & Modular" : "Luxury & Modular Sofas"}</a></li>
              <li><a href="#koleksi" className="hover:text-white transition-colors">{isId ? "Meja Makan & Kerja" : "Dining & Office Tables"}</a></li>
              <li><a href="#koleksi" className="hover:text-white transition-colors">{isId ? "Kursi Santai Lounge" : "Lounge & Accent Chairs"}</a></li>
              <li><a href="#koleksi" className="hover:text-white transition-colors">{isId ? "Lemari & Credenza" : "Wardrobes & Credenzas"}</a></li>
              <li><a href="#custom" className="hover:text-white transition-colors">{isId ? "Custom Bespoke Atelier" : "Custom Bespoke Atelier"}</a></li>
            </ul>
          </div>

          {/* Showrooms */}
          <div className="lg:col-span-4 space-y-2.5">
            <h4 className="text-xs uppercase tracking-widest text-white font-medium">
              {isId ? "Lokasi & Layanan" : "Locations & Service"}
            </h4>
            <div className="space-y-2 text-xs text-[#A39B8E]">
              <p className="flex items-start gap-2">
                <MapPin size={14} className="text-[#A88968] shrink-0 mt-0.5" />
                <span>{isId ? "Galeri Jakarta: Jl. Kemang Raya No. 42B, Jakarta Selatan" : "Jakarta Gallery: Jl. Kemang Raya No. 42B, South Jakarta"}</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={14} className="text-[#A88968] shrink-0 mt-0.5" />
                <span>{isId ? "Workshop Jepara: Jl. Pemuda Raya No. 108, Jepara" : "Jepara Atelier: Jl. Pemuda Raya No. 108, Jepara"}</span>
              </p>
              <p className="flex items-center gap-2 pt-1 text-emerald-400 font-medium">
                <PhoneCall size={14} />
                <span>Hotline & WA: 0812-8899-7700</span>
              </p>
            </div>
          </div>
        </div>

        {/* Minimal Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7267]">
          <p>© 1998 - 2026 Efendy Furniture. {isId ? "Seluruh Hak Cipta Dilindungi." : "All Rights Reserved."}</p>
          <div className="flex items-center gap-4">
            <a href="#koleksi" className="hover:text-white transition-colors">{isId ? "Katalog" : "Catalog"}</a>
            <span>·</span>
            <a href="#garansi" className="hover:text-white transition-colors">{isId ? "Garansi 10 Tahun" : "10-Year Warranty"}</a>
            <span>·</span>
            <a href="#kontak" className="hover:text-white transition-colors">{isId ? "Kontak" : "Contact"}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
