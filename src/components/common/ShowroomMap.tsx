"use client";

import { useState } from "react";
import {
  MapPin,
  Clock,
  Phone,
  ArrowUpRight,
  Navigation,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

export interface ShowroomItem {
  id: string;
  kota: string;
  tagline: string;
  alamat: string;
  jam: string;
  telepon: string;
  wa: string;
  fasilitas: string[];
}

export const SHOWROOM_LOCATIONS: ShowroomItem[] = [
  {
    id: "jakarta",
    kota: "Jakarta",
    tagline: "Flagship Showroom Senopati",
    alamat: "Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan",
    jam: "Senin – Minggu: 10.00 – 21.00 WIB",
    telepon: "0812-1000-1001",
    wa: "6281210001001",
    fasilitas: [
      "3 Lantai Display Ruangan",
      "Konsultasi Desain Interior Gratis",
      "Valet & Parkir Luas",
      "Coffee Lounge",
    ],
  },
  {
    id: "surabaya",
    kota: "Surabaya",
    tagline: "Showroom Modern Manyar",
    alamat: "Jl. Manyar Kertoarjo No. 45, Surabaya",
    jam: "Senin – Minggu: 10.00 – 21.00 WIB",
    telepon: "0812-1000-1002",
    wa: "6281210001002",
    fasilitas: [
      "Display Konsep Japandi & Scandinavian",
      "Sample Kayu & Kain Lengkap",
      "Parkir Depan Luas",
    ],
  },
  {
    id: "bandung",
    kota: "Bandung",
    tagline: "Showroom Heritage Setiabudi",
    alamat: "Jl. Setiabudi No. 120, Bandung",
    jam: "Senin – Minggu: 10.00 – 21.00 WIB",
    telepon: "0812-1000-1003",
    wa: "6281210001003",
    fasilitas: [
      "Koleksi Kayu Solid & Outdoor",
      "Konsultasi Custom Ukuran",
      "Area Display Living & Dining",
    ],
  },
];

interface ShowroomMapProps {
  activeCity?: string;
  onCityChange?: (city: string) => void;
  showHeader?: boolean;
}

export default function ShowroomMap({
  activeCity,
  onCityChange,
  showHeader = true,
}: ShowroomMapProps) {
  const [internalCity, setInternalCity] = useState("Jakarta");
  const selectedCityName = activeCity || internalCity;

  const current =
    SHOWROOM_LOCATIONS.find(
      (s) => s.kota.toLowerCase() === selectedCityName.toLowerCase()
    ) || SHOWROOM_LOCATIONS[0];

  const handleSelect = (city: string) => {
    setInternalCity(city);
    onCityChange?.(city);
  };

  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    `Efendy Furniture, ${current.alamat}`
  )}&output=embed`;

  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Efendy Furniture ${current.alamat}`
  )}`;

  const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    current.alamat
  )}`;

  return (
    <div className="w-full">
      {showHeader && (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C2410C]/10 text-[#C2410C] text-xs font-semibold uppercase tracking-wider mb-2">
              <MapPin size={13} />
              Lokasi Showroom
            </div>
            <h2 className="font-serif font-medium text-[26px] sm:text-[34px] lg:text-[40px] text-[#1A1A1A] leading-tight">
              Temukan Showroom Kami
            </h2>
            <p className="mt-2 text-[15px] sm:text-[17px] text-[#6B6B6B] max-w-2xl leading-relaxed">
              Kunjungi showroom Efendy Furniture terdekat untuk mencoba langsung material kain, kayu solid,
              dan kenyamanan duduk sebelum membeli. Tim konsultan kami siap menyambutmu.
            </p>
          </div>
        </div>
      )}

      {/* Tabs Pilihan Kota Showroom */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5">
        {SHOWROOM_LOCATIONS.map((s) => {
          const isActive = s.kota.toLowerCase() === current.kota.toLowerCase();
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => handleSelect(s.kota)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#1A1A1A] text-white shadow-md"
                  : "bg-white text-[#1A1A1A] border border-[#E8E6E1] hover:border-[#1A1A1A] hover:bg-[#F7F7F5]"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isActive ? "bg-[#C2410C]" : "bg-[#C9C5BC]"
                }`}
              />
              <span>Efendy {s.kota}</span>
            </button>
          );
        })}
      </div>

      {/* Map Container ala ZorrexTour */}
      <div className="overflow-hidden rounded-2xl border border-[#E8E6E1] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
        {/* Top Info Bar inside Map Card */}
        <div className="bg-[#1A1A1A] text-white px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm sm:text-base tracking-wide">
                Efendy Furniture — {current.kota}
              </span>
              <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded bg-[#C2410C] font-medium text-white">
                Buka Tiap Hari
              </span>
            </div>
            <p className="text-xs text-white/70 truncate mt-0.5">{current.alamat}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`https://wa.me/${current.wa}?text=${encodeURIComponent(
                `Halo Efendy Furniture ${current.kota}, saya mau tanya info kunjungan ke showroom.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C2410C] hover:bg-[#A8370A] text-white text-xs font-medium transition-colors"
            >
              <MessageCircle size={14} />
              <span>Chat Showroom</span>
            </a>
          </div>
        </div>

        {/* Embedded Google Maps iframe ala ZorrexTour */}
        <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] bg-[#F7F7F5]">
          <iframe
            key={current.id}
            title={`Peta Lokasi Showroom Efendy Furniture ${current.kota}`}
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Bottom Details Footer */}
        <div className="p-5 sm:p-6 bg-white border-t border-[#E8E6E1] grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F7F7F5] text-[#C2410C] border border-[#E8E6E1]">
              <MapPin size={17} />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Alamat</p>
              <p className="text-sm font-medium text-[#1A1A1A] mt-0.5 leading-snug">{current.alamat}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F7F7F5] text-[#C2410C] border border-[#E8E6E1]">
              <Clock size={17} />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Jam Operasional</p>
              <p className="text-sm font-medium text-[#1A1A1A] mt-0.5 leading-snug">{current.jam}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F7F7F5] text-[#C2410C] border border-[#E8E6E1]">
              <Phone size={17} />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">Telepon / Hotline</p>
              <p className="text-sm font-medium text-[#1A1A1A] mt-0.5 leading-snug">{current.telepon}</p>
            </div>
          </div>
        </div>

        {/* Fasilitas showroom */}
        <div className="px-5 py-3.5 bg-[#FAF9F6] border-t border-[#E8E6E1] flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#6B6B6B]">
          <span className="font-semibold text-[#1A1A1A]">Fasilitas Showroom:</span>
          {current.fasilitas.map((f) => (
            <span key={f} className="inline-flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-600" />
              <span>{f}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Action Links di bawah maps ala ZorrexTour */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-4">
          <a
            href={mapSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 font-semibold text-[#C2410C] hover:text-[#A8370A] transition-colors"
          >
            <span>Buka di Google Maps</span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          <span className="text-[#C9C5BC]">•</span>

          <a
            href={mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 font-medium text-[#1A1A1A] hover:text-[#C2410C] transition-colors"
          >
            <Navigation size={14} />
            <span>Petunjuk Arah</span>
          </a>
        </div>

        <p className="text-xs text-[#6B6B6B]">
          Butuh jemputan sampel atau reservasi konsultasi? Hubungi tim showroom kami.
        </p>
      </div>
    </div>
  );
}
