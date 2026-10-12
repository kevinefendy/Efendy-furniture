"use client";

import React, { useState } from "react";

/**
 * SECTION 6: TESTIMONI
 * 
 * ALASAN DESAIN (BUKAN TEMPLATE GENERIK):
 * 1. Menghindari format carousel 3 card seragam dengan bintang emas kuning dan foto avatar bulat kecil.
 * 2. Mengadopsi format kutipan editorial monumen: 1 kutipan berukuran besar (36px-48px) yang mengisi layar,
 *    fokus penuh pada suara dan emosi asli customer.
 * 3. Navigasi sederhana berbasis teks ("Kutipan Berikutnya →") yang tenang dan tidak mekanis.
 */

interface ReviewQuote {
  quote: string;
  author: string;
  location: string;
  piece: string;
  year: string;
}

const REVIEWS: ReviewQuote[] = [
  {
    quote:
      "Mejanya berat sekali, harus diangkat empat orang dewasa. Tapi begitu ditaruh di tengah ruang makan, suasananya langsung berubah total. Serat kayu jatinya hidup, halusnya seperti batu sungai, dan wanginya aroma kayu alami — bukan cat tiner yang bikin pusing.",
    author: "Bpk. Hendra Gunawan",
    location: "Bintaro Jaya, Tangerang Selatan",
    piece: "Meja Makan Jati Solid 260 cm & 8 Kursi",
    year: "Pemakaian sejak 2021",
  },
  {
    quote:
      "Saya arsitek, paling rewel soal detail sambungan kayu. Waktu Mas Efendy antar pesanan credenza ke rumah klien saya di Kemang, saya intip sampai bagian kolong dan belakang: sambungan purus dan lubangnya presisi tanpa celah dempul murahan. Jarang nemu workshop yang tetap jujur di sudut yang tidak kelihatan mata orang.",
    author: "Clara Sastrawidjaja, S.Ars",
    location: "Studio Senopati, Jakarta",
    piece: "Credenza Kisi-Kisi Jati & Meja Konsol",
    year: "Kolaborasi proyek residensial 2024",
  },
  {
    quote:
      "Awalnya ragu bayar uang muka untuk barang puluhan juta ke bengkel di Jepara cuma lewat chat WhatsApp. Tapi tiap hari Sabtu Mas Efendy kirim video progres kayu lagi diserut sama tukang tua di bengkelnya. Pas sampai di Surabaya, kualitas kayunya jauh melampaui sofa impor mahal yang pernah saya beli di mall.",
    author: "Ibu Ratna & Bpk. Bambang Sutanto",
    location: "CitraLand, Surabaya Barat",
    piece: "Sofa L-Shape Linen & Meja Kopi Sungkai",
    year: "Pemakaian sejak 2023",
  },
];

export default function TestimonialEditorial() {
  const [index, setIndex] = useState(0);

  const nextQuote = () => {
    setIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevQuote = () => {
    setIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const current = REVIEWS[index];

  return (
    <section
      id="testimoni"
      className="py-24 sm:py-36 lg:py-44 bg-[#F5F1EA] text-[#2B2118] border-b border-[#2B2118]/15"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* Header Indicator */}
        <div className="flex items-center justify-between border-b border-[#2B2118]/20 pb-4 mb-12 sm:mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#8B6F47] font-semibold">
            Kata Pemilik Rumah
          </span>
          <span className="font-mono text-xs text-[#8B6F47]">
            0{index + 1} / 0{REVIEWS.length}
          </span>
        </div>

        {/* 1 Large Single Editorial Quote */}
        <div className="space-y-8 sm:space-y-12">
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.3] text-[#2B2118] tracking-tight">
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          {/* Small details below quote */}
          <div className="pt-4 border-t border-[#2B2118]/15 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-1">
              <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#2B2118]">
                {current.author}
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#8B6F47]">
                {current.location} · {current.piece}
              </p>
              <span className="font-mono text-xs text-[#2B2118]/60 block pt-1">
                {current.year}
              </span>
            </div>

            {/* Next / Previous Text Triggers */}
            <div className="flex items-center gap-6 pt-2 sm:pt-0">
              <button
                onClick={prevQuote}
                className="font-sans text-xs uppercase tracking-[0.16em] text-[#8B6F47] hover:text-[#2B2118] transition-colors py-2"
                aria-label="Kutipan sebelumnya"
              >
                ← Sebelumnya
              </button>
              <span className="text-[#8B6F47]/40">|</span>
              <button
                onClick={nextQuote}
                className="font-sans text-xs uppercase tracking-[0.16em] text-[#2B2118] font-semibold hover:text-[#8B6F47] transition-colors py-2"
                aria-label="Kutipan berikutnya"
              >
                Kutipan berikutnya →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
