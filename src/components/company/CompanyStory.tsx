"use client";

import React from "react";
import Image from "next/image";
import { useCompany } from "@/context/CompanyContext";
import { CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function CompanyStory() {
  const { lang } = useCompany();

  return (
    <section
      id="tentang"
      className="py-20 sm:py-28 bg-white dark:bg-[#121211] border-b border-[#EEEEEC] dark:border-[#2A2A26] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Photo */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="left">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-lg bg-[#F5F5F5] dark:bg-[#1A1A18] border border-[#EEEEEC] dark:border-[#2A2A26]">
                <Image
                  src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=80"
                  alt={
                    lang === "id"
                      ? "Workshop Pengrajin Efendy Furniture"
                      : "Efendy Furniture Master Workshop"
                  }
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Clean Editorial Story */}
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="up">
              <span className="text-xs uppercase tracking-[0.25em] text-[#817A71] dark:text-[#A19A8F] font-semibold block font-sans">
                {lang === "id" ? "Filosofi & Warisan" : "Philosophy & Heritage"}
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#20201E] dark:text-[#F7F5F0] leading-tight">
                {lang === "id" ? (
                  <>
                    Keahlian Tangan Jepara. <br />
                    <span className="italic font-normal text-stone-500">
                      Estetika Minimalis Modern.
                    </span>
                  </>
                ) : (
                  <>
                    Jepara Handcrafted Mastery. <br />
                    <span className="italic font-normal text-stone-500">
                      Modern Minimalist Poise.
                    </span>
                  </>
                )}
              </h2>

              <p className="text-base text-[#817A71] dark:text-[#A19A8F] leading-relaxed pt-1 font-sans">
                {lang === "id"
                  ? "Berdiri sejak 1998, Efendy Furniture menghadirkan perabot berskala arsitektural. Kami memadukan teknik sambungan mortise & tenon yang kokoh dengan proporsi proporsional yang tenang untuk hunian masa kini."
                  : "Established in 1998, Efendy Furniture crafts architectural living pieces. We harmonize time-honored mortise-and-tenon joinery with serene modern proportions built for mindful everyday living."}
              </p>
            </ScrollReveal>

            {/* Clean Value Highlights */}
            <ScrollReveal direction="up" delayMs={100}>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#20201E] dark:text-[#F7F5F0] font-sans">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#A88968] shrink-0" />
                  <span>
                    {lang === "id"
                      ? "Kayu Keras Legal Indonesia"
                      : "Solid Indonesian Hardwood"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#A88968] shrink-0" />
                  <span>
                    {lang === "id"
                      ? "Garansi Resmi Rangka 10 Tahun"
                      : "Official 10-Year Frame Warranty"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#A88968] shrink-0" />
                  <span>
                    {lang === "id"
                      ? "Kustom Ukuran Sesuai Denah"
                      : "Custom Sizing to Floorplan"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#A88968] shrink-0" />
                  <span>
                    {lang === "id"
                      ? "Gratis Perakitan di Lokasi"
                      : "Complimentary In-Home Assembly"}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
