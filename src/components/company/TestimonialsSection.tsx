"use client";

import React, { useState } from "react";
import { useCompany } from "@/context/CompanyContext";
import ScrollReveal from "@/components/common/ScrollReveal";

interface Review {
  quoteId: string;
  quoteEn: string;
  name: string;
  locationId: string;
  locationEn: string;
  piece: string;
}

const REVIEWS: Review[] = [
  {
    quoteId:
      "Meja makan Oak dan kursi Neva yang kami pesan sangat kokoh dan presisi. Pengiriman sampai ke lantai 2 sangat rapi. Garansi 10 tahunnya memberi rasa tenang luar biasa.",
    quoteEn:
      "The Oak dining table and Neva chairs we commissioned are remarkably solid and precise. The delivery up to the second floor was seamless. The 10-year warranty gives genuine peace of mind.",
    name: "Ir. Hendra Gunawan",
    locationId: "Menteng, Jakarta Pusat",
    locationEn: "Menteng, Central Jakarta",
    piece: "Luna Dining Table & 8 Chairs",
  },
  {
    quoteId:
      "Efendy Furniture rekanan wajib untuk proyek residensial high-end kantor kami. Kemampuan atelier mewujudkan desain kustom dengan proporsi pas adalah keunggulan langka.",
    quoteEn:
      "Efendy Furniture is an essential partner for our studio's high-end residential projects. Their atelier's precision in executing custom bespoke furniture is a rare mastery.",
    name: "Clara Sastrawidjaja, S.Ars",
    locationId: "Senopati, Jakarta Selatan",
    locationEn: "Senopati, South Jakarta",
    piece: "Custom Curved Sofa & Credenza",
  },
  {
    quoteId:
      "Kualitas kayunya jauh melampaui sofa impor mahal. Kami dikirimi foto progres workshop secara rutin. Sangat puas dengan hasil akhir di rumah kami.",
    quoteEn:
      "The timber and craftsmanship far surpass costly imported pieces. We received weekly workshop progress updates. Truly satisfied with the final result in our home.",
    name: "Ibu Ratna Sutanto",
    locationId: "CitraLand, Surabaya Barat",
    locationEn: "CitraLand, West Surabaya",
    piece: "Sora 3-Seater & Kanso Lounge",
  },
];

export default function TestimonialsSection() {
  const { lang } = useCompany();
  const [active, setActive] = useState(0);

  const isId = lang === "id";

  return (
    <section
      id="testimoni"
      className="py-20 sm:py-28 bg-white dark:bg-[#121211] border-b border-[#EEEEEC] dark:border-[#2A2A26] transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#817A71] dark:text-[#A19A8F] font-semibold block">
              {isId ? "Testimoni Klien" : "Client Testimonials"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#20201E] dark:text-[#F7F5F0] tracking-tight">
              {isId ? "Dipercaya Pemilik Hunian" : "Trusted by Homeowners"}
            </h2>
          </div>
        </ScrollReveal>

        {/* Minimal Large Quote Display */}
        <div className="text-center space-y-6">
          <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-relaxed text-[#20201E] dark:text-[#F7F5F0] tracking-tight max-w-4xl mx-auto">
            &ldquo;{isId ? REVIEWS[active].quoteId : REVIEWS[active].quoteEn}&rdquo;
          </blockquote>

          <div className="space-y-1">
            <h4 className="font-serif text-xl font-normal text-[#20201E] dark:text-[#F7F5F0]">
              {REVIEWS[active].name}
            </h4>
            <p className="text-xs text-[#817A71] dark:text-[#A19A8F]">
              {isId ? REVIEWS[active].locationId : REVIEWS[active].locationEn} · {REVIEWS[active].piece}
            </p>
          </div>

          {/* Minimal Dots Switcher */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                aria-label={`Ulasan ${idx + 1}`}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  active === idx
                    ? "w-8 bg-[#20201E] dark:bg-white"
                    : "w-2 bg-black/20 dark:bg-white/20 hover:bg-black/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
