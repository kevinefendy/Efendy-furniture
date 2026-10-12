"use client";

import React from "react";
import Image from "next/image";

/**
 * SECTION 4: PROSES PENGERJAAN
 * 
 * ALASAN DESAIN (BUKAN TEMPLATE GENERIK):
 * 1. BUKAN 4 card seragam dengan icon line-art (koper, pensil, gear, truk).
 * 2. Menggunakan timeline vertikal linier asimetris dengan foto dokumentasi workshop asli tiap tahap.
 * 3. Teks menjelaskan teknis perkayuan yang jujur dan spesifik: kadar air kayu (MC < 12%),
 *    amplas nomor 400 dengan tangan, dan finishing natural oil tanpa bau tiner kimia menusuk hidung.
 */

interface ProcessStep {
  step: string;
  title: string;
  action: string;
  narrative: string;
  detail: string;
  image: string;
  alt: string;
}

const STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Konsultasi Santai",
    action: "Konsultasi",
    narrative:
      "Kamu tidak perlu gambar arsitek yang rumit. Cukup kirim foto sudut ruangan, ukuran kasar lantai atau dinding, dan cerita kebiasaan sehari-hari: punya anak kecil yang suka lompat di sofa, atau meja kerja yang butuh tempat kabel rapi.",
    detail: "Bisa lewat WhatsApp, video call bengkel, atau mampir ngopi di workshop Jepara & galeri Kemang.",
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=80",
    alt: "Diskusi pemilihan kayu di meja bengkel",
  },
  {
    step: "02",
    title: "Sketsa & Ukuran 1:1",
    action: "Sketsa",
    narrative:
      "Kami buatkan gambar proporsi skala 1:1. Kita sesuaikan tinggi dudukan sofa dengan tinggi badanmu, sudut sandaran punggung 105 derajat, dan jarak kaki meja agar lutut tidak membentur kayu saat duduk sila.",
    detail: "Gambar kerja teknis dikirimkan ke kamu untuk dicek bareng sebelum gergaji menyentuh kayu pertama kali.",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    alt: "Sketsa rancangan furnitur di atas meja kerja",
  },
  {
    step: "03",
    title: "Seleksi Kayu Jati Tua",
    action: "Pilih Kayu",
    narrative:
      "Ini tahap paling sakral. Kami pakai jati TPK Blora atau Perhutani legal umur 25 sampai 40 tahun. Kayu kami masukkan ruang oven vakum sampai moisture content (MC) stabil di bawah 12% agar tidak melengkung atau retak saat dipasang di ruangan ber-AC.",
    detail: "Kamu bisa minta foto serat kayu mentah yang dipilihkan tukang sebelum dirakit.",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
    alt: "Tumpukan kayu jati solid pilihan di bengkel perkayuan",
  },
  {
    step: "04",
    title: "Rakit Purus & Finishing Halus",
    action: "Finishing",
    narrative:
      "Semua rangka disambung pakai teknik purus dan lubang (mortise & tenon) dengan pasak kayu keras — bukan paku tembak murah yang cepat goyang. Permukaan kayu diamplas tangan bertahap sampai grid 400, lalu diusap hardwax oil organik buatan Jerman yang membiarkan serat kayu tetap bernapas.",
    detail: "Hasilnya: sentuhan halus seperti sutra, aman bersentuhan dengan makanan, tanpa bau tiner tajam.",
    image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=1200&q=80",
    alt: "Pengrajin mengamplas dan merakit sambungan kayu jati dengan tangan",
  },
  {
    step: "05",
    title: "Pengantaran & Pasang di Tempat",
    action: "Kirim",
    narrative:
      "Kami tidak kirim paket lewat kurir kargo umum yang dibanting. Tim bengkel kami sendiri yang bawa mobil box tertutup, angkat hati-hati ke dalam rumah sampai lantai atas, setel posisinya pas di tempat, lalu bungkus kardus dan debunya kami bawa pulang bersih.",
    detail: "Kami sertakan kartu garansi konstruksi 10 tahun dan minyak perawatan kayu gratis.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    alt: "Furnitur terpasang anggun di dalam rumah klien",
  },
];

export default function ProcessTimeline() {
  return (
    <section
      id="proses"
      className="py-24 sm:py-32 lg:py-40 bg-[#F5F1EA] text-[#2B2118] border-b border-[#2B2118]/15"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-24 space-y-4">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#8B6F47] font-semibold block">
            Alur Bengkel · Dari Papan Mentah ke Rumahmu
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#2B2118]">
            Lima langkah jujur, <br />
            <span className="italic text-[#8B6F47]">tanpa potong kompas.</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#8B6F47] leading-relaxed">
            Konsultasi → Sketsa → Pilih Kayu → Finishing → Kirim. 
            Semuanya transparan. Kamu tahu persis siapa yang mengetok kayu dan dari mana pohonnya berasal.
          </p>
        </div>

        {/* Vertical Timeline with Genuine Photography */}
        <div className="space-y-20 sm:space-y-28 lg:space-y-36">
          {STEPS.map((step, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={step.step}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Photo Column (Alternating on Desktop) */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative h-[340px] sm:h-[450px] lg:h-[500px] w-full overflow-hidden bg-[#2B2118]/10">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover editorial-img-hover filter contrast-[1.02] brightness-95"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-[#2B2118] text-[#F5F1EA] text-[10px] font-mono uppercase tracking-widest">
                      Tahap {step.step} · {step.action}
                    </div>
                  </div>
                </div>

                {/* Text Description Column */}
                <div
                  className={`lg:col-span-5 space-y-5 ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-4xl sm:text-5xl text-[#8B6F47] font-light">
                      {step.step}
                    </span>
                    <span className="h-[1px] w-12 bg-[#8B6F47]/40" />
                    <span className="font-sans text-xs uppercase tracking-widest text-[#8B6F47] font-semibold">
                      {step.action}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#2B2118] leading-snug">
                    {step.title}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-[#2B2118]/85 leading-relaxed font-normal">
                    {step.narrative}
                  </p>

                  <div className="pt-3 border-t border-[#2B2118]/15 text-xs text-[#8B6F47] font-sans leading-relaxed">
                    <strong>Catatan bengkel:</strong> {step.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
