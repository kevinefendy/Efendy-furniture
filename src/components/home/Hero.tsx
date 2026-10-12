"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin, Star, Search, Tag, Sparkles, MessagesSquare } from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";

// Hero: full background foto ruang tamu hangat + overlay putih gradasi (teks tetap terbaca,
// dominan putih terjaga). Kiri: copy + search + 2 CTA + trust bar.
// Kanan: kartu "paket ruang tamu di foto" (shoppable). Bawah: 3 kartu promo.
const PAKET_PRODUK = [
  {
    nama: "Sofa 3 Seat Oslo Fabric Abu",
    harga: "Rp 5.499.000",
    hargaCoret: "Rp 6.999.000",
    slug: "sofa-3-seat-oslo-fabric-abu",
    gambar:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&q=80",
  },
  {
    nama: "Meja Kopi Bulat Marmer Putih",
    harga: "Rp 1.899.000",
    slug: "meja-kopi-bulat-marmer-putih",
    gambar:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=200&q=80",
  },
  {
    nama: "Lampu Gantung Rotan Anyam 40cm",
    harga: "Rp 549.000",
    slug: "lampu-gantung-rotan-anyam-40cm",
    gambar:
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=200&q=80",
  },
];

const PROMO = [
  {
    Icon: Tag,
    judul: "Sale s/d 30%",
    deskripsi: "Sofa, meja makan & lemari pilihan. Stok terbatas.",
    link: "/shop?deal=sale",
    linkLabel: "Lihat Sale",
  },
  {
    Icon: Sparkles,
    judul: "Koleksi Baru 2026",
    deskripsi: "Scandinavian Warm & Japandi Calm, fresh dari showroom.",
    link: "/shop?sort=newest",
    linkLabel: "Lihat Koleksi",
  },
  {
    Icon: MessagesSquare,
    judul: "Gratis Konsultasi Desain",
    deskripsi: "Booking 15 menit, dibantu hitung budget ruanganmu.",
    link: "/#showroom",
    linkLabel: "Booking Sekarang",
  },
];

export default function Hero() {
  const [kataKunci, setKataKunci] = useState("");
  const router = useRouter();

  const cari = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kataKunci.trim()) return;
    router.push(`/search?q=${encodeURIComponent(kataKunci.trim())}`);
  };

  return (
    <section className="relative overflow-hidden bg-[#F7F7F5]">
      {/* Background foto + overlay putih gradasi agar teks tetap terbaca */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Desktop: putih solid di kiri → transparan di kanan. Mobile: putih dominan. */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white/70 lg:bg-gradient-to-r lg:from-white lg:via-white/90 lg:to-white/10" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 lg:pt-20 lg:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Kiri */}
          <ScrollReveal className="lg:col-span-7">
            <p className="inline-flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-[0.14em] text-[#6B6B6B] border border-[#E8E6E1] bg-white/80 rounded-full px-4 py-1.5 mb-6">
              <Star size={14} className="fill-[#C2410C] text-[#C2410C]" />
              Toko furniture Indonesia · Sejak 2012
            </p>
            <h1 className="font-serif font-medium text-[36px] leading-[1.15] sm:text-[54px] lg:text-[64px] tracking-tight text-[#1A1A1A]">
              Rumah kamu,
              <br />
              gaya kamu.
            </h1>
            <p className="mt-5 text-[17px] leading-[1.5] text-[#1A1A1A]/70 max-w-xl">
              Furniture lengkap untuk setiap ruang. Dari sofa minimalis sampai lemari custom.
              Ready stock atau pesan sesuai ukuran — tinggal pilih yang cocok buat rumahmu.
            </p>

            {/* Search ala retail */}
            <form onSubmit={cari} role="search" className="mt-6 max-w-xl">
              <label htmlFor="hero-search" className="sr-only">
                Cari furniture
              </label>
              <div className="flex items-center gap-2 bg-white border border-[#E8E6E1] rounded-[8px] p-1.5 pl-4 focus-within:border-[#C2410C] transition-colors">
                <Search size={19} className="shrink-0 text-[#6B6B6B]" />
                <input
                  id="hero-search"
                  type="search"
                  value={kataKunci}
                  onChange={(e) => setKataKunci(e.target.value)}
                  placeholder="Cari sofa, meja makan, lemari…"
                  className="flex-1 min-w-0 bg-transparent text-[16px] placeholder:text-[#6B6B6B] focus:outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 px-6 py-2.5 rounded-[8px] bg-[#1A1A1A] hover:bg-black text-white text-sm font-medium transition-colors"
                >
                  Cari
                </button>
              </div>
            </form>

            <div className="mt-4 flex flex-col sm:flex-row gap-3 max-w-xl">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[8px] bg-[#C2410C] hover:bg-[#A8370A] text-white text-[16px] font-medium transition-colors"
              >
                Belanja Sekarang <ArrowRight size={18} />
              </Link>
              <Link
                href="/#showroom"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[8px] bg-white/90 border border-[#E8E6E1] text-[#1A1A1A] text-[16px] font-medium hover:border-[#1A1A1A] transition-colors"
              >
                <MapPin size={18} /> Kunjungi Showroom
              </Link>
            </div>

            {/* Trust bar */}
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-[#1A1A1A]">
              <span className="flex items-center gap-1.5">
                <span className="flex text-[#C2410C]" aria-hidden>
                  {"★".repeat(5)}
                </span>
                <strong className="font-semibold">4.9</strong>
              </span>
              <span className="text-[#E8E6E1]" aria-hidden>
                |
              </span>
              <span>
                <strong className="font-semibold">12.000+</strong> pelanggan
              </span>
              <span className="text-[#E8E6E1]" aria-hidden>
                |
              </span>
              <span>
                <strong className="font-semibold">3</strong> showroom
              </span>
            </div>
          </ScrollReveal>

          {/* Kanan: kartu paket ruangan di foto */}
          <ScrollReveal delay={120} className="lg:col-span-5">
            <div className="bg-white/95 backdrop-blur border border-[#E8E6E1] rounded-[8px] p-5 sm:p-6">
              <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-[#6B6B6B]">
                Wujudkan ruang tamu di foto ini
              </p>
              <ul className="mt-4 space-y-3">
                {PAKET_PRODUK.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/product/${p.slug}`}
                      className="group flex items-center gap-3 rounded-[8px] border border-transparent hover:border-[#E8E6E1] hover:bg-white p-2 -m-2 transition-colors"
                    >
                      <span className="relative w-14 h-14 rounded-[8px] overflow-hidden bg-[#F7F7F5] shrink-0">
                        <Image
                          src={p.gambar}
                          alt={p.nama}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[15px] font-medium truncate group-hover:text-[#C2410C] transition-colors">
                          {p.nama}
                        </span>
                        <span className="block text-sm">
                          <span className="price font-semibold">{p.harga}</span>{" "}
                          {p.hargaCoret && (
                            <span className="price text-[#6B6B6B] line-through text-[13px]">
                              {p.hargaCoret}
                            </span>
                          )}
                        </span>
                      </span>
                      <ArrowRight
                        size={17}
                        className="shrink-0 text-[#6B6B6B] group-hover:text-[#C2410C] group-hover:translate-x-0.5 transition-all"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-[#E8E6E1] flex items-center justify-between gap-3">
                <p className="text-sm text-[#6B6B6B]">
                  Total paket{" "}
                  <strong className="price text-[#1A1A1A] font-semibold">Rp 7.947.000</strong>
                </p>
                <Link
                  href="/shop"
                  className="shrink-0 px-5 py-2.5 rounded-[8px] bg-[#1A1A1A] hover:bg-black text-white text-sm font-medium transition-colors"
                >
                  Beli Paket Ini
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Bawah: 3 kartu promo */}
        <div className="mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
          {PROMO.map(({ Icon, judul, deskripsi, link, linkLabel }, i) => (
            <ScrollReveal key={judul} delay={Math.min(i * 80, 200)}>
              <div className="h-full bg-white/95 backdrop-blur border border-[#E8E6E1] rounded-[8px] p-5 flex gap-4">
                <span className="inline-flex w-11 h-11 shrink-0 items-center justify-center rounded-full border border-[#E8E6E1] text-[#1A1A1A]">
                  <Icon size={20} strokeWidth={1.7} />
                </span>
                <span>
                  <span className="block text-[16px] font-semibold">{judul}</span>
                  <span className="block mt-0.5 text-[14px] text-[#6B6B6B]">{deskripsi}</span>
                  <Link
                    href={link}
                    className="inline-block mt-1.5 text-sm font-medium text-[#C2410C] underline underline-offset-4"
                  >
                    {linkLabel}
                  </Link>
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
