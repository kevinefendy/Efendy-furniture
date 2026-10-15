"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, MessageCircle, Clock, Check, Navigation } from "lucide-react";
import { SHOWROOMS } from "@/data/products";
import ScrollReveal from "@/components/common/ScrollReveal";
import ShowroomMap from "@/components/common/ShowroomMap";

// Showroom: split foto + info 3 lokasi + tombol Maps/WA + form booking konsultasi gratis + Google Maps interaktif.
export default function Showroom() {
  const [nama, setNama] = useState("");
  const [wa, setWa] = useState("");
  const [kota, setKota] = useState("Jakarta");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const booking = (e: React.FormEvent) => {
    e.preventDefault();
    if (nama.trim().length < 2) {
      setError("Tulis nama kamu dulu ya.");
      return;
    }
    if (!/^08\d{8,12}$/.test(wa.trim())) {
      setError("Nomor WA diawali 08, 10–14 digit ya. Contoh: 081234567890.");
      return;
    }
    setError("");
    setDone(true);
  };

  return (
    <section id="showroom" className="bg-[#F7F7F5]" aria-labelledby="showroom-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[60px] lg:py-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Foto */}
          <ScrollReveal>
            <div className="relative rounded-[8px] overflow-hidden border border-[#E8E6E1]">
              <div className="relative aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80"
                  alt="Suasana showroom Efendy Furniture Jakarta"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-[8px] border border-[#E8E6E1] px-4 py-2.5 text-sm">
                <strong className="font-semibold">Showroom Jakarta</strong>
                <span className="text-[#6B6B6B]"> · Buka tiap hari 10.00–21.00</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Info */}
          <ScrollReveal delay={100}>
            <h2
              id="showroom-heading"
              className="font-serif font-medium text-[28px] lg:text-[44px] tracking-tight text-[#1A1A1A]"
            >
              Mampir, coba duduk, baru putuskan
            </h2>
            <p className="mt-3 text-[17px] text-[#6B6B6B]">
              Furniture itu harus dicoba. Datang ke showroom terdekat — semua produk bisa disentuh,
              diduduki, dan dibuka-tutup. Gratis konsultasi desain juga.
            </p>

            <ul className="mt-6 space-y-4">
              {SHOWROOMS.map((s) => {
                const isSelected = s.kota.toLowerCase() === kota.toLowerCase();
                return (
                  <li
                    key={s.kota}
                    className={`bg-white border rounded-[8px] p-5 transition-colors ${
                      isSelected ? "border-[#C2410C] shadow-sm" : "border-[#E8E6E1]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-[16px] flex items-center gap-2">
                        <MapPin size={17} className="text-[#C2410C]" /> Efendy {s.kota}
                      </p>
                      {isSelected && (
                        <span className="text-[11px] font-semibold text-[#C2410C] bg-[#C2410C]/10 px-2 py-0.5 rounded">
                          Dipilih
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-[15px] text-[#6B6B6B]">{s.alamat}</p>
                    <p className="mt-1 text-sm text-[#6B6B6B] flex items-center gap-1.5">
                      <Clock size={15} /> {s.jam}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setKota(s.kota);
                          document.getElementById("showroom-live-map")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] border border-[#E8E6E1] text-sm font-medium hover:border-[#1A1A1A] transition-colors bg-white text-[#1A1A1A]"
                      >
                        <Navigation size={14} /> Lihat di Peta
                      </button>
                      <a
                        href={`https://wa.me/62${s.telepon.replace(/\D/g, "").slice(1)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] bg-[#C2410C] hover:bg-[#A8370A] text-white text-sm font-medium transition-colors"
                      >
                        <MessageCircle size={15} /> Chat WA
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Form booking */}
            <div className="mt-6 bg-white border border-[#E8E6E1] rounded-[8px] p-5 sm:p-6">
              <h3 className="font-serif text-[20px] font-medium">Booking konsultasi desain gratis</h3>
              <p className="mt-1 text-[15px] text-[#6B6B6B]">
                Ceritakan kebutuhanmu, tim kami siapkan rekomendasi + estimasi budget sebelum kamu datang.
              </p>
              {done ? (
                <p role="status" className="mt-4 flex items-center gap-2 text-[15px] text-emerald-700">
                  <Check size={17} /> Makasih {nama}! Tim {kota} akan hubungi kamu via WA maksimal 1x24 jam.
                </p>
              ) : (
                <form onSubmit={booking} noValidate className="mt-4 space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="bk-nama" className="block text-sm font-medium mb-1">
                        Nama
                      </label>
                      <input
                        id="bk-nama"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        placeholder="Nama kamu"
                        className="w-full border border-[#E8E6E1] rounded-[8px] px-4 py-2.5 text-[15px] focus:outline-none focus:border-[#C2410C]"
                      />
                    </div>
                    <div>
                      <label htmlFor="bk-wa" className="block text-sm font-medium mb-1">
                        No. WA
                      </label>
                      <input
                        id="bk-wa"
                        value={wa}
                        onChange={(e) => setWa(e.target.value)}
                        placeholder="08xxxxxxxxxx"
                        inputMode="tel"
                        className="w-full border border-[#E8E6E1] rounded-[8px] px-4 py-2.5 text-[15px] focus:outline-none focus:border-[#C2410C]"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="bk-kota" className="block text-sm font-medium mb-1">
                      Showroom tujuan
                    </label>
                    <select
                      id="bk-kota"
                      value={kota}
                      onChange={(e) => setKota(e.target.value)}
                      className="w-full border border-[#E8E6E1] rounded-[8px] px-4 py-2.5 text-[15px] bg-white focus:outline-none focus:border-[#C2410C]"
                    >
                      {SHOWROOMS.map((s) => (
                        <option key={s.kota}>{s.kota}</option>
                      ))}
                    </select>
                  </div>
                  {error && (
                    <p role="alert" className="text-sm text-[#C2410C]">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-[8px] bg-[#1A1A1A] hover:bg-black text-white font-medium transition-colors"
                  >
                    Minta Dijadwalkan
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* ── Section Peta Google Maps interaktif ala ZorrexTour ── */}
        <div id="showroom-live-map" className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-[#E8E6E1]">
          <ScrollReveal>
            <ShowroomMap activeCity={kota} onCityChange={setKota} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
