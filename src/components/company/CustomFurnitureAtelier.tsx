"use client";

import React from "react";
import { useCompany } from "@/context/CompanyContext";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";
import MagneticButton from "@/components/common/MagneticButton";

export default function CustomFurnitureAtelier() {
  const { lang, openConsultModal } = useCompany();

  const stepsId = [
    {
      num: "01",
      title: "Konsultasi Ide",
      desc: "Kirim foto denah ruangan atau referensi desain via WhatsApp.",
    },
    {
      num: "02",
      title: "Desain 3D CAD",
      desc: "Visualisasi realistis sesuai proporsi aktual plafon & dinding.",
    },
    {
      num: "03",
      title: "Kurasi Material",
      desc: "Pilih jenis kayu (Jati, Oak, Walnut) dan kain (Boucle, Leather).",
    },
    {
      num: "04",
      title: "Produksi Ahli",
      desc: "Dikerjakan tangan oleh master pengrajin dengan pasak kayu.",
    },
    {
      num: "05",
      title: "Instalasi Kamar",
      desc: "Tim kami mengantar dan merakit langsung di ruangan Anda.",
    },
  ];

  const stepsEn = [
    {
      num: "01",
      title: "Idea Discussion",
      desc: "Share your room floor plan or Pinterest moodboards via WhatsApp.",
    },
    {
      num: "02",
      title: "3D CAD Rendering",
      desc: "True-to-scale 3D visualization tailored to your wall & ceiling heights.",
    },
    {
      num: "03",
      title: "Material Curation",
      desc: "Select timbers (Teak, Oak, Walnut) and textiles (Boucle, Leather).",
    },
    {
      num: "04",
      title: "Master Joinery",
      desc: "Handcrafted by senior woodcrafters with mortise & tenon joints.",
    },
    {
      num: "05",
      title: "In-Home Setup",
      desc: "Our white-glove crew delivers, places, and sets up in your room.",
    },
  ];

  const steps = lang === "id" ? stepsId : stepsEn;

  return (
    <section
      id="custom"
      className="py-20 sm:py-28 bg-[#FAFAFA] dark:bg-[#121211] border-b border-[#EEEEEC] dark:border-[#2A2A26] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-16 gap-6">
          <ScrollReveal direction="up">
            <span className="text-xs uppercase tracking-[0.25em] text-[#817A71] dark:text-[#A19A8F] font-semibold block mb-2 font-sans">
              {lang === "id" ? "Layanan Bespoke" : "Bespoke Service"}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#20201E] dark:text-[#F7F5F0] tracking-tight">
              {lang === "id" ? "Atelier Custom Furniture" : "Custom Bespoke Atelier"}
            </h2>
          </ScrollReveal>

          <p className="text-sm text-[#817A71] dark:text-[#A19A8F] max-w-md leading-relaxed font-sans">
            {lang === "id"
              ? "Punya denah arsitek atau ukuran khusus? Tim kami siap mewujudkan perabot impian dari nol dengan proporsi presisi."
              : "Have an architectural blueprint or unique dimensions? Our team crafts your dream furniture from scratch with true proportions."}
          </p>
        </div>

        {/* 5-Step Process */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 border-t border-[#EEEEEC] dark:border-[#2A2A26] pt-10">
          {steps.map((step, idx) => (
            <ScrollReveal key={step.num} direction="up" delayMs={idx * 60}>
              <div className="space-y-3 font-sans">
                <span className="font-serif text-3xl font-light text-[#A88968] block">
                  {step.num}
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#20201E] dark:text-[#F7F5F0]">
                  {step.title}
                </h3>
                <p className="text-xs text-[#817A71] dark:text-[#A19A8F] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Action Bar */}
        <ScrollReveal direction="up" delayMs={150}>
          <div className="mt-16 p-8 sm:p-10 rounded-sm bg-white dark:bg-[#1A1A18] border border-[#EEEEEC] dark:border-[#2A2A26] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#20201E] dark:text-[#F7F5F0]">
                {lang === "id"
                  ? "Mulai Konsultasi Desain Custom Anda"
                  : "Start Your Custom Bespoke Consultation"}
              </h3>
              <p className="text-xs text-[#817A71] dark:text-[#A19A8F] font-sans">
                {lang === "id"
                  ? "Estimasi biaya transparan dan konsultasi 3D gratis tanpa komitmen."
                  : "Transparent quotation and complimentary 3D consultations with zero obligations."}
              </p>
            </div>

            <MagneticButton
              onClick={() => openConsultModal({ category: lang === "id" ? "Custom Bespoke" : "Custom Bespoke" })}
              className="px-8 py-4 bg-[#20201E] hover:bg-[#A88968] dark:bg-white dark:text-[#121211] dark:hover:bg-[#A88968] text-white font-semibold text-xs uppercase tracking-widest rounded-sm transition-colors shrink-0 flex items-center gap-2 font-sans"
            >
              <span>{lang === "id" ? "Mulai Diskusi WhatsApp" : "Start WhatsApp Consultation"}</span>
              <ArrowRight size={14} />
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
