"use client";

import React, { useState } from "react";
import Image from "next/image";

/**
 * SECTION 5: KOLEKSI KARYA
 * 
 * ALASAN DESAIN (BUKAN TEMPLATE GENERIK):
 * 1. Menghindari grid 3-kolom seragam dengan card putih berbayang dan rating bintang kuning template e-commerce.
 * 2. Mengadopsi layout editorial majalah seni interior (asymmetric masonry): ada foto vertikal tinggi,
 *    ada foto horizontal lebar, dengan ritme visual yang dinamis dan ruang nafas yang tidak kaku.
 * 3. Interaksi hover dibuat sangat tenang dan bersahaja: hanya transisi opacity halus dan teks nama produk
 *    minimalis di sudut bawah, tanpa animasi 3D tilt yang berlebihan.
 */

interface CollectionPiece {
  id: string;
  name: string;
  spec: string;
  material: string;
  colSpan: string;
  heightClass: string;
  image: string;
  note: string;
}

const PIECES: CollectionPiece[] = [
  {
    id: "p-1",
    name: "Meja Makan Jati Blora 240cm",
    spec: "240 × 100 × 76 cm · 8 Kursi",
    material: "Solid Teak TPK Grade A, Natural Hardwax Oil",
    colSpan: "lg:col-span-7",
    heightClass: "h-[440px] sm:h-[540px]",
    image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1400&q=80",
    note: "Tepi kayu dibiarkan mengikuti kurva alami batang pohon (live edge halus).",
  },
  {
    id: "p-2",
    name: "Kursi Santai Kanso",
    spec: "84 × 86 × 74 cm",
    material: "Rangka Jati Jepara & Kain Wool Boucle",
    colSpan: "lg:col-span-5",
    heightClass: "h-[440px] sm:h-[540px]",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80",
    note: "Kemiringan dudukan santai tanpa menekan tulang punggung bawah.",
  },
  {
    id: "p-3",
    name: "Lemari Buffet Kisi-Kisi",
    spec: "200 × 45 × 82 cm",
    material: "Full Kayu Jati Tua, Pintu Geser Kisi",
    colSpan: "lg:col-span-5",
    heightClass: "h-[400px] sm:h-[480px]",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
    note: "Kisi-kisi kayu dirakit rapat untuk sirkulasi udara audio & barang koleksi.",
  },
  {
    id: "p-4",
    name: "Sofa 3-Dudukan Sora Linen",
    spec: "230 × 95 × 76 cm",
    material: "Rangka Jati Solid, Linen Belgia, Bulu Angsa Sintetis",
    colSpan: "lg:col-span-7",
    heightClass: "h-[400px] sm:h-[480px]",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=80",
    note: "Busa density 35 tahan kempes hingga puluhan tahun pemakaian harian.",
  },
  {
    id: "p-5",
    name: "Meja Kerja Aethel Solid Walnut",
    spec: "180 × 80 × 75 cm",
    material: "American Walnut & Jalur Kabel Tersembunyi",
    colSpan: "lg:col-span-6",
    heightClass: "h-[380px] sm:h-[460px]",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
    note: "Laci kayu tanpa rel besi — pakai alur kayu lilin tradisional yang senyap.",
  },
  {
    id: "p-6",
    name: "Ranjang Floating Jati Minimalis",
    spec: "200 × 200 cm (King Size)",
    material: "Solid Teak & Headboard Akustik",
    colSpan: "lg:col-span-6",
    heightClass: "h-[380px] sm:h-[460px]",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
    note: "Konstruksi knock-down pasak kayu kokoh tanpa goyangan derit saat bergerak.",
  },
];

export default function CollectionMasonry() {
  const [activeModalPiece, setActiveModalPiece] = useState<CollectionPiece | null>(null);

  return (
    <section
      id="koleksi"
      className="py-24 sm:py-32 lg:py-40 bg-[#F5F1EA] text-[#2B2118] border-b border-[#2B2118]/15"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Editorial Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div className="space-y-3">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#8B6F47] font-semibold block">
              Dokumentasi Hasil Karya
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#2B2118] leading-tight">
              Karya yang sudah <br />
              <span className="italic text-[#8B6F47]">menghuni rumah orang.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-sans text-sm text-[#8B6F47] leading-relaxed">
              Semua foto di bawah ini adalah pesanan custom asli klien kami. 
              Bukan rendering 3D komputer palsu. Kamu bisa pesan model yang sama 
              atau minta diubah ukurannya agar pas dengan ruanganmu.
            </p>
          </div>
        </div>

        {/* Asymmetric Masonry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {PIECES.map((piece) => (
            <div
              key={piece.id}
              onClick={() => setActiveModalPiece(piece)}
              className={`${piece.colSpan} group cursor-pointer`}
            >
              <div
                className={`relative ${piece.heightClass} w-full overflow-hidden bg-[#2B2118]/10`}
              >
                <Image
                  src={piece.image}
                  alt={piece.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover editorial-img-hover group-hover:opacity-90 group-hover:scale-[1.02] transition-all duration-400"
                />

                {/* Minimalist overlay on hover: only opacity & subtle text at bottom */}
                <div className="absolute inset-0 bg-[#2B2118]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 sm:p-8 text-[#F5F1EA]">
                  <span className="font-sans text-[11px] uppercase tracking-widest text-[#8B6F47] font-mono">
                    {piece.spec}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal mt-1">
                    {piece.name}
                  </h3>
                  <p className="font-sans text-xs text-[#F5F1EA]/80 mt-2 max-w-md">
                    {piece.note}
                  </p>
                  <span className="font-sans text-xs uppercase tracking-widest text-[#F5F1EA] underline underline-offset-4 mt-4 font-medium">
                    Tanya rincian furniture ini →
                  </span>
                </div>
              </div>

              {/* Quiet caption underneath for clean readability */}
              <div className="pt-4 flex items-baseline justify-between border-b border-[#2B2118]/15 pb-2">
                <div>
                  <h4 className="font-serif text-lg sm:text-xl font-normal text-[#2B2118]">
                    {piece.name}
                  </h4>
                  <p className="font-sans text-xs text-[#8B6F47] mt-0.5">
                    {piece.material}
                  </p>
                </div>
                <span className="font-mono text-xs text-[#8B6F47]">
                  {piece.spec.split("·")[0].trim()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Candid Consultation Prompt */}
        <div className="mt-16 pt-8 border-t border-[#2B2118]/15 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <p className="font-serif text-lg sm:text-xl text-[#2B2118] italic">
            Punya gambar referensi sendiri dari majalah atau Pinterest?
          </p>
          <a
            href="https://wa.me/6281288997700?text=Halo%20Mas%20Efendy,%20saya%20punya%20desain%20sendiri%20mau%20minta%20estimasi%20harga"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-[#2B2118] text-[#2B2118] text-xs uppercase tracking-[0.16em] font-semibold hover:bg-[#2B2118] hover:text-[#F5F1EA] transition-colors"
          >
            Kirim Gambar ke WhatsApp Kami →
          </a>
        </div>
      </div>

      {/* Editorial Detail Modal for Selected Piece */}
      {activeModalPiece && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#2B2118]/80 backdrop-blur-none"
          onClick={() => setActiveModalPiece(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#F5F1EA] text-[#2B2118] border border-[#2B2118] p-6 sm:p-10 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start border-b border-[#2B2118]/20 pb-4">
              <div>
                <span className="font-sans text-xs uppercase tracking-widest text-[#8B6F47] block">
                  Detail Karya
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal mt-1">
                  {activeModalPiece.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalPiece(null)}
                className="font-mono text-xs uppercase tracking-wider text-[#2B2118] hover:text-[#8B6F47] p-1"
              >
                [Tutup ×]
              </button>
            </div>

            <div className="relative h-64 sm:h-80 w-full bg-[#2B2118]/10 overflow-hidden">
              <Image
                src={activeModalPiece.image}
                alt={activeModalPiece.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-3 font-sans text-sm text-[#2B2118]/90">
              <p><strong>Spesifikasi Ukuran:</strong> {activeModalPiece.spec}</p>
              <p><strong>Bahan Kayu & Pelapis:</strong> {activeModalPiece.material}</p>
              <p><strong>Catatan Tukang:</strong> {activeModalPiece.note}</p>
            </div>

            <div className="pt-4 border-t border-[#2B2118]/20 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/6281288997700?text=Halo%20Mas%20Efendy,%20saya%20tertarik%20pesan%20furniture%20ini:%20${encodeURIComponent(
                  activeModalPiece.name
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3 bg-[#2B2118] text-[#F5F1EA] text-xs uppercase tracking-[0.16em] font-semibold hover:bg-[#8B6F47] transition-colors"
              >
                Tanya Estimasi Biaya via WhatsApp
              </a>
              <button
                onClick={() => setActiveModalPiece(null)}
                className="w-full sm:w-auto px-6 py-3 border border-[#2B2118] text-[#2B2118] text-xs uppercase tracking-[0.16em] hover:bg-[#2B2118]/10"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
