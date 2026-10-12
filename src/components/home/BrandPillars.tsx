"use client";

import { TreePine, Sparkles, Truck, ShieldCheck } from "lucide-react";
import { useCompany } from "@/context/CompanyContext";

export default function BrandPillars() {
  const { lang } = useCompany();
  const isId = lang === "id";

  const pillars = [
    {
      icon: TreePine,
      title: isId ? "Kayu Solid Indonesia Resmi" : "FSC-Certified Solid Teak",
      description: isId
        ? "Diambil secara bertanggung jawab dari hutan legal Indonesia, diproses tahan puluhan tahun."
        : "Sustainably harvested from certified managed Indonesian forests, seasoned for generations.",
    },
    {
      icon: Sparkles,
      title: isId ? "Pengerjaan Presisi Tangan" : "Artisanal Hand-Finishing",
      description: isId
        ? "Sambungan purus tradisional & perlakuan minyak alami oleh pengrajin berpengalaman."
        : "Mortise-and-tenon joinery and organic oil treatments hand-rubbed by master artisans.",
    },
    {
      icon: Truck,
      title: isId ? "Gratis Antar & Pasang" : "White-Glove Delivery",
      description: isId
        ? "Jadwal penempatan langsung di ruangan Anda, perakitan lengkap, dan pembersihan kemasan."
        : "Scheduled room-of-choice placement, complete unboxing, and complimentary packaging removal.",
    },
    {
      icon: ShieldCheck,
      title: isId ? "Garansi Konstruksi 10 Tahun" : "10-Year Craftsmanship Guarantee",
      description: isId
        ? "Jaminan struktur rangka resmi untuk ketahanan furnitur seumur hidup di hunian Anda."
        : "Structural warranty ensuring each heirloom piece endures the cadence of everyday living.",
    },
  ];

  return (
    <section className="bg-white border-b border-[#EEEEEC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#EEEEEC]">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex items-start gap-4 pt-6 sm:pt-0 ${
                  index !== 0 ? "sm:pl-6 lg:pl-8" : ""
                } group`}
              >
                <div className="w-11 h-11 shrink-0 rounded-xl bg-[#FAFAFA] border border-[#EEEEEC] flex items-center justify-center text-[#1A1A18] group-hover:bg-[#1A1A18] group-hover:text-[#A88968] group-hover:border-[#1A1A18] transition-all duration-300">
                  <Icon size={19} strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-[17px] font-medium text-[#1A1A18] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#737370] leading-relaxed font-light font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
