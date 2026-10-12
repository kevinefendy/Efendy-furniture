"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCompany } from "@/context/CompanyContext";
import { Check } from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";

interface MaterialDetail {
  id: string;
  nameId: string;
  nameEn: string;
  tabLabelId: string;
  tabLabelEn: string;
  image: string;
  specsId: string[];
  specsEn: string[];
  descriptionId: string;
  descriptionEn: string;
}

export default function CraftsmanshipShowcase() {
  const { lang } = useCompany();
  const [activeTab, setActiveTab] = useState<number>(0);

  const materials: MaterialDetail[] = [
    {
      id: "jati",
      nameId: "Kayu Jati Solid Indonesia (Perhutani)",
      nameEn: "Solid Indonesian Hardwood (Teak)",
      tabLabelId: "Kayu Jati",
      tabLabelEn: "Teak Hardwood",
      image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=80",
      specsId: [
        "Kadar minyak alami tinggi tahan rayap & cuaca tropis",
        "Kering oven stabil (Kadar Air / MC < 12%)",
        "Warna madu alami yang semakin indah seiring waktu",
      ],
      specsEn: [
        "Naturally rich in organic oils, termite & humidity resilient",
        "Kiln-dried stability (Moisture Content < 12%)",
        "Golden honey tones that develop a graceful organic patina",
      ],
      descriptionId:
        "Dipanen dari hutan tanaman industri legal Perhutani dengan kerapatan serat kayu tertinggi untuk ketahanan lintas generasi.",
      descriptionEn:
        "Sustainably harvested from certified managed plantations with dense grain structure ensuring generational heirloom longevity.",
    },
    {
      id: "oak",
      nameId: "Kayu Oak Putih Eropa & Walnut Amerika",
      nameEn: "European White Oak & American Walnut",
      tabLabelId: "Oak & Walnut",
      tabLabelEn: "Oak & Walnut",
      image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80",
      specsId: [
        "Serat lurus tegas berkarakter arsitektural",
        "Lapisan minyak lilin alami ramah lingkungan (food-safe)",
        "Toleransi benturan tinggi untuk meja makan & kerja",
      ],
      specsEn: [
        "Striking linear grain with refined architectural clarity",
        "Eco-friendly organic hard-wax oil finish (food-safe)",
        "High impact tolerance engineered for heavy dining & desk use",
      ],
      descriptionId:
        "Kayu keras pilihan bergaya minimalis kontemporer yang menghadirkan keanggunan garis bersih pada ruangan hunian.",
      descriptionEn:
        "Curated premium hardwoods tailored for contemporary minimalism, imbuing spaces with quiet tactile elegance.",
    },
    {
      id: "fabrics",
      nameId: "Linen Belgia & Kulit Asli Italia",
      nameEn: "Belgian Linen & Italian Top-Grain Leather",
      tabLabelId: "Linen & Kulit",
      tabLabelEn: "Linen & Leather",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      specsId: [
        "Kulit sapi asli lapis atas yang sejuk dan bernapas",
        "Kain linen tenun wol lembut bersertifikat OEKO-TEX",
        "Busa ketahanan tinggi (Density 35) + lapisan bulu angsa sintetis",
      ],
      specsEn: [
        "Supple top-grain leather that breathes in warm climates",
        "Tactile woven linen and soft wool certified OEKO-TEX",
        "High-Resilience Density 35 foam paired with down-feather filling",
      ],
      descriptionId:
        "Kain pelapis bertekstur taktil mewah yang diimpor langsung untuk kenyamanan duduk terbaik dan tahan kempis.",
      descriptionEn:
        "World-class upholstery textiles imported directly for tactile lounging comfort that endures everyday living.",
    },
  ];

  return (
    <section
      id="kualitas"
      className="py-20 sm:py-28 bg-white dark:bg-[#121211] border-b border-[#EEEEEC] dark:border-[#2A2A26] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-12 sm:mb-16 gap-6">
          <ScrollReveal direction="up">
            <span className="text-xs uppercase tracking-[0.25em] text-[#817A71] dark:text-[#A19A8F] font-semibold block mb-2 font-sans">
              {lang === "id" ? "Standar Kualitas" : "Quality Standards"}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#20201E] dark:text-[#F7F5F0] tracking-tight">
              {lang === "id" ? "Kurasi Material Utama" : "Master Material Curation"}
            </h2>
          </ScrollReveal>

          {/* Minimalist Material Selector */}
          <div className="flex flex-wrap items-center gap-2 font-sans">
            {materials.map((mat, index) => (
              <button
                key={mat.id}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm transition-all duration-200 ${
                  activeTab === index
                    ? "bg-[#20201E] text-white dark:bg-white dark:text-[#121211]"
                    : "text-[#817A71] dark:text-[#A19A8F] hover:text-[#20201E] dark:hover:text-white"
                }`}
              >
                {lang === "id" ? mat.tabLabelId : mat.tabLabelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Clean Showcase View */}
        {(() => {
          const current = materials[activeTab];
          const name = lang === "id" ? current.nameId : current.nameEn;
          const description = lang === "id" ? current.descriptionId : current.descriptionEn;
          const specs = lang === "id" ? current.specsId : current.specsEn;

          return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 relative aspect-[16/10] rounded-sm overflow-hidden bg-[#F5F5F5] dark:bg-[#1A1A18] border border-[#EEEEEC] dark:border-[#2A2A26]">
                <Image
                  src={current.image}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="lg:col-span-5 space-y-5">
                <h3 className="font-serif text-2xl sm:text-4xl font-normal text-[#20201E] dark:text-[#F7F5F0]">
                  {name}
                </h3>

                <p className="text-sm text-[#817A71] dark:text-[#A19A8F] leading-relaxed font-sans">
                  {description}
                </p>

                <div className="pt-2 border-t border-[#EEEEEC] dark:border-[#2A2A26] space-y-2.5 font-sans">
                  {specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#20201E] dark:text-[#F7F5F0]">
                      <Check size={16} className="text-[#A88968] shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
