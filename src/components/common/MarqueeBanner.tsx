"use client";

import React from "react";
import { Sparkles, Diamond, ShieldCheck, TreePine } from "lucide-react";
import { useCompany } from "@/context/CompanyContext";

export default function MarqueeBanner() {
  const { lang } = useCompany();

  const itemsId = [
    { text: "FURNITUR PREMIUM", icon: Diamond },
    { text: "SAMBUNGAN KAYU ASLI", icon: Sparkles },
    { text: "KUSTOM SESUAI PESANAN", icon: TreePine },
    { text: "GARANSI RESMI 10 TAHUN", icon: ShieldCheck },
    { text: "KAYU SOLID BERKUALITAS", icon: Diamond },
    { text: "GAYA JAPANDI & SKANDINAVIA", icon: Sparkles },
    { text: "LAYANAN PENGIRIMAN KHUSUS", icon: ShieldCheck },
    { text: "PROPORSI ARSITEKTURAL", icon: TreePine },
  ];

  const itemsEn = [
    { text: "PREMIUM FURNITURE", icon: Diamond },
    { text: "HANDCRAFTED JOINERY", icon: Sparkles },
    { text: "CUSTOM MADE TO ORDER", icon: TreePine },
    { text: "10-YEAR WARRANTY", icon: ShieldCheck },
    { text: "SOLID HARDWOOD", icon: Diamond },
    { text: "JAPANDI & SCANDINAVIAN", icon: Sparkles },
    { text: "WHITE-GLOVE SETUP", icon: ShieldCheck },
    { text: "ARCHITECTURAL PROPORTIONS", icon: TreePine },
  ];

  const items = lang === "id" ? itemsId : itemsEn;

  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden py-4 sm:py-5 bg-[#FAFAFA] dark:bg-[#151513] text-[#1A1A18] dark:text-[#F7F5F0] select-none border-y border-[#EEEEEC] dark:border-[#2A2A26]"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 text-xs sm:text-sm tracking-[0.22em] font-medium text-[#1A1A18] dark:text-[#F7F5F0] whitespace-nowrap uppercase font-sans"
            >
              <span>{item.text}</span>
              <Icon size={13} className="text-[#A88968] shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
