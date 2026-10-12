"use client";

import React from "react";
import { useCompany } from "@/context/CompanyContext";
import { ShieldCheck, Truck, Building2, MessageCircle } from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function TrustAndWarrantySection() {
  const { lang } = useCompany();

  const isId = lang === "id";

  const pillars = [
    {
      icon: ShieldCheck,
      title: isId ? "Garansi Rangka 10 Tahun" : "10-Year Frame Warranty",
      desc: isId
        ? "Sertifikat resmi jaminan struktur kayu anti-retak dan anti-rayap."
        : "Official certificate guaranteeing structural integrity, crack-free, and termite-resistant timbers.",
    },
    {
      icon: Truck,
      title: isId ? "Gratis Pengantaran & Pasang" : "Free Delivery & Assembly",
      desc: isId
        ? "Tim kami mengantar dan merakit langsung di ruangan pilihan Anda."
        : "Our professional white-glove team delivers and installs right into your designated room.",
    },
    {
      icon: Building2,
      title: isId ? "Galeri Jakarta & Jepara" : "Jakarta & Jepara Galleries",
      desc: isId
        ? "Kunjungi showroom Kemang atau saksikan produksi di Jepara."
        : "Visit our Kemang showroom lounge or explore our manufacturing workshop in Jepara.",
    },
    {
      icon: MessageCircle,
      title: isId ? "Konsultasi Personal Langsung" : "Dedicated Design Consultation",
      desc: isId
        ? "Ditemani konsultan desainer tanpa bot, respons cepat setiap hari."
        : "Consult directly with real design specialists without bots, responsive daily.",
    },
  ];

  return (
    <section
      id="garansi"
      className="py-20 sm:py-28 bg-white dark:bg-[#121211] border-b border-[#EEEEEC] dark:border-[#2A2A26] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#817A71] dark:text-[#A19A8F] font-semibold block">
              {isId ? "Jaminan Pelanggan" : "Client Guarantee"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#20201E] dark:text-[#F7F5F0] tracking-tight">
              {isId ? "Ketenangan & Layanan Purnajual" : "Peace of Mind & Aftersales Care"}
            </h2>
          </div>
        </ScrollReveal>

        {/* 4 Clean Minimal Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#EEEEEC] dark:divide-[#2A2A26]">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} direction="up" delayMs={idx * 60}>
                <div className={`pt-6 sm:pt-0 ${idx !== 0 ? "sm:pl-6 lg:pl-8" : ""} space-y-3`}>
                  <div className="w-10 h-10 rounded-full bg-[#F5F5F5] dark:bg-[#1A1A18] text-[#20201E] dark:text-white flex items-center justify-center">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-serif text-xl font-normal text-[#20201E] dark:text-[#F7F5F0]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#817A71] dark:text-[#A19A8F] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
