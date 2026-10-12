"use client";

import React from "react";

/**
 * SECTION 7: FOOTER
 * 
 * ALASAN DESAIN (BUKAN TEMPLATE GENERIK):
 * 1. Tidak ada newsletter popup yang mengganggu atau form subscribe email buatan AI.
 * 2. Tidak ada tumpukan icon media sosial warna-warni generik (hanya tautan WhatsApp asli ke Mas Efendy).
 * 3. Disusun dalam kolom teks editorial murni yang jujur: alamat bengkel di Jepara, galeri di Jakarta,
 *    dan kalimat penutup langsung dari pemilik workshop: "Ngobrol dulu, gratis kok."
 */
export default function EditorialFooter() {
  return (
    <footer
      id="kontak"
      className="bg-[#2B2118] text-[#F5F1EA] pt-20 sm:pt-28 pb-12 border-t border-[#8B6F47]/30"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Main Conversation CTA */}
        <div className="border-b border-[#F5F1EA]/15 pb-16 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#8B6F47] font-semibold block">
                Mulai Diskusi Furniture Kamu
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#F5F1EA]">
                Ngobrol dulu, <br />
                <span className="italic text-[#8B6F47]">gratis kok.</span>
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#F5F1EA]/80 max-w-lg leading-relaxed">
                Kirim foto ruangan, denah kasar, atau ide meja yang kamu bayangkan. 
                Kami bantu hitung estimasi bahan kayu, waktu pengerjaan bengkel, 
                dan biaya tanpa paksaan beli.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <a
                href="https://wa.me/6281288997700?text=Halo%20Mas%20Efendy,%20saya%20mau%20konsultasi%20bikin%20furniture%20custom"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#F5F1EA] text-[#2B2118] text-xs uppercase tracking-[0.18em] font-semibold hover:bg-[#8B6F47] hover:text-[#F5F1EA] transition-colors duration-200"
              >
                <span>Chat Langsung di WhatsApp</span>
                <span>💬</span>
              </a>
            </div>
          </div>
        </div>

        {/* Clean Editorial Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 text-sm">
          {/* Col 1: Identity */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-serif text-xl font-normal text-[#F5F1EA]">
              Efendy Furniture
            </h3>
            <p className="font-sans text-xs text-[#F5F1EA]/70 leading-relaxed max-w-sm">
              Workshop kayu jati custom keluarga. Dikerjakan manual dengan sambungan purus di Jepara sejak 1994. 
              Melayani pesanan rumah tinggal, villa, dan proyek arsitektur di seluruh Indonesia.
            </p>
            <span className="font-mono text-xs text-[#8B6F47] block pt-2">
              Hotline: +62 812-8899-7700
            </span>
          </div>

          {/* Col 2: Jepara Workshop */}
          <div className="lg:col-span-3 space-y-2">
            <h4 className="font-sans text-xs uppercase tracking-[0.16em] text-[#8B6F47] font-semibold">
              Bengkel Utama Jepara
            </h4>
            <p className="font-sans text-xs text-[#F5F1EA]/80 leading-relaxed">
              Jl. Pemuda Raya No. 84, Tahunan, Jepara, Jawa Tengah 59427
            </p>
            <p className="font-sans text-xs text-[#F5F1EA]/60">
              Buka Senin – Sabtu: 07.30 – 17.00 WIB
            </p>
          </div>

          {/* Col 3: Jakarta Gallery */}
          <div className="lg:col-span-3 space-y-2">
            <h4 className="font-sans text-xs uppercase tracking-[0.16em] text-[#8B6F47] font-semibold">
              Galeri Kunjungan Jakarta
            </h4>
            <p className="font-sans text-xs text-[#F5F1EA]/80 leading-relaxed">
              Jl. Kemang Timur Raya No. 42B, Jakarta Selatan 12730
            </p>
            <p className="font-sans text-xs text-[#F5F1EA]/60">
              Setiap Hari (Janji Temu): 10.00 – 19.00 WIB
            </p>
          </div>

          {/* Col 4: Ethics & Guarantee */}
          <div className="lg:col-span-2 space-y-2">
            <h4 className="font-sans text-xs uppercase tracking-[0.16em] text-[#8B6F47] font-semibold">
              Jaminan Bengkel
            </h4>
            <ul className="font-sans text-xs text-[#F5F1EA]/70 space-y-1.5">
              <li>· Kayu Jati TPK Legal</li>
              <li>· MC Oven &lt; 12%</li>
              <li>· Pasak Purus Tradisional</li>
              <li>· Garansi Rangka 10 Tahun</li>
            </ul>
          </div>
        </div>

        {/* Minimal Copyright Bottom */}
        <div className="mt-16 pt-8 border-t border-[#F5F1EA]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F1EA]/40 font-mono">
          <p>© 1994 – 2026 Efendy Furniture Jepara. Dikelola keluarga.</p>
          <p>Dibuat dengan kayu jati, serutan tangan, dan kejujuran tukang.</p>
        </div>
      </div>
    </footer>
  );
}
