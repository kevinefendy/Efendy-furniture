"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Facebook, Youtube, Check, MapPin, Phone, Mail } from "lucide-react";

// Footer retail 4 kolom + newsletter simpel (1 input + 1 tombol). Border top tipis.
const KATEGORI = [
  { nama: "Sofa", href: "/shop?category=Sofa" },
  { nama: "Meja", href: "/shop?category=Meja" },
  { nama: "Kursi", href: "/shop?category=Kursi" },
  { nama: "Lemari", href: "/shop?category=Lemari" },
  { nama: "Tempat Tidur", href: "/shop?category=Tempat%20Tidur" },
  { nama: "Rak", href: "/shop?category=Rak" },
  { nama: "Outdoor", href: "/shop?category=Outdoor" },
  { nama: "Dekorasi", href: "/shop?category=Dekorasi" },
];

const BANTUAN = [
  { nama: "Pengiriman & Instalasi", href: "/#bantuan" },
  { nama: "Retur 30 Hari", href: "/#bantuan" },
  { nama: "Garansi 1–3 Tahun", href: "/#bantuan" },
  { nama: "Cicilan 0% 12 Bulan", href: "/#bantuan" },
  { nama: "Lacak Pesanan", href: "/cart" },
];

const TENTANG = [
  { nama: "Akun Saya", href: "/akun" },
  { nama: "Koleksi Baru", href: "/shop?sort=newest" },
  { nama: "Sale", href: "/shop?deal=sale" },
  { nama: "Showroom Kami", href: "/#showroom" },
  { nama: "Hubungi Kami", href: "/contact" },
  { nama: "Tips Dekorasi", href: "/#artikel" },
  { nama: "Wishlist", href: "/wishlist" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Masukkan alamat email yang valid ya.");
      return;
    }
    setError("");
    setDone(true);
  };

  return (
    <footer className="bg-white text-[#1A1A1A] border-t border-[#E8E6E1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Kategori */}
          <nav aria-label="Kategori produk">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-widest mb-4">
              Kategori
            </h3>
            <ul className="space-y-2.5 text-[15px] text-[#1A1A1A]">
              {KATEGORI.map((l) => (
                <li key={l.nama}>
                  <Link href={l.href} className="hover:text-[#C2410C] hover:underline underline-offset-4 transition">
                    {l.nama}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bantuan */}
          <nav aria-label="Bantuan" id="bantuan">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-widest mb-4">
              Bantuan
            </h3>
            <ul className="space-y-2.5 text-[15px]">
              {BANTUAN.map((l) => (
                <li key={l.nama}>
                  <Link href={l.href} className="hover:text-[#C2410C] hover:underline underline-offset-4 transition">
                    {l.nama}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Tentang */}
          <nav aria-label="Tentang Efendy">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-widest mb-4">
              Tentang Efendy
            </h3>
            <ul className="space-y-2.5 text-[15px]">
              {TENTANG.map((l) => (
                <li key={l.nama}>
                  <Link href={l.href} className="hover:text-[#C2410C] hover:underline underline-offset-4 transition">
                    {l.nama}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 mt-5">
              {[
                { Icon: Instagram, label: "Instagram Efendy Furniture" },
                { Icon: Facebook, label: "Facebook Efendy Furniture" },
                { Icon: Youtube, label: "Youtube Efendy Furniture" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-[#E8E6E1] flex items-center justify-center text-[#1A1A1A] hover:border-[#C2410C] hover:text-[#C2410C] transition-colors"
                >
                  <Icon size={18} strokeWidth={1.7} />
                </a>
              ))}
            </div>
          </nav>

          {/* Kontak + newsletter */}
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-widest mb-4">
              Kabar & Promo
            </h3>
            <p className="text-[15px] text-[#6B6B6B] mb-4">
              Daftarkan email biar nggak ketinggalan koleksi baru dan sale.
            </p>
            {done ? (
              <p role="status" className="flex items-center gap-2 text-[15px] text-emerald-700">
                <Check size={17} /> Siap! Cek inbox email kamu ya.
              </p>
            ) : (
              <form onSubmit={subscribe} noValidate className="flex gap-2">
                <label htmlFor="newsletter-email" className="sr-only">
                  Alamat email
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Alamat email"
                  aria-invalid={!!error}
                  className="flex-1 min-w-0 border border-[#E8E6E1] rounded-[8px] px-4 py-2.5 text-[15px] placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#C2410C]"
                />
                <button
                  type="submit"
                  className="shrink-0 px-5 py-2.5 rounded-[8px] bg-[#1A1A1A] hover:bg-black text-white text-sm font-medium transition-colors"
                >
                  Daftar
                </button>
              </form>
            )}
            {error && (
              <p role="alert" className="mt-2 text-sm text-[#C2410C]">
                {error}
              </p>
            )}
            <ul className="mt-6 space-y-2.5 text-[15px] text-[#6B6B6B]">
              <li className="flex items-start gap-2">
                <MapPin size={17} className="mt-0.5 shrink-0" /> Jakarta · Surabaya · Bandung
              </li>
              <li className="flex items-center gap-2">
                <Phone size={17} className="shrink-0" /> 0812-1000-1001
              </li>
              <li className="flex items-center gap-2">
                <Mail size={17} className="shrink-0" /> halo@efendyfurniture.id
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#E8E6E1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-[#6B6B6B]">
          <p className="font-sans font-bold text-[#1A1A1A] text-lg">
            Efendy<span className="text-[#C2410C]">.</span>
            <span className="ml-2 font-normal text-sm text-[#6B6B6B]">Furniture Indonesia</span>
          </p>
          <p>© 2026 Efendy Furniture. Buatan Indonesia, untuk rumah Indonesia.</p>
        </div>
      </div>
    </footer>
  );
}
