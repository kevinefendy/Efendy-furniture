"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  User,
  Heart,
  ShoppingBag,
  Package,
  Check,
  ArrowRight,
  MapPin,
} from "lucide-react";
import {
  useProfile,
  useWishlistIds,
  useCart,
  getOrders,
  ORDERS_EVENT,
  type Profile,
} from "@/lib/store";
import type { Order, OrderStatus } from "@/types";
import { formatIDR } from "@/lib/utils";

// Halaman Akun: data diri (tersimpan di browser) + riwayat pesanan + jalan pintas.
// Sebelumnya ikon akun di navbar nyasar ke /cart — sekarang ke sini.
const STATUS_LABEL: Record<OrderStatus, string> = {
  created: "Pesanan dibuat",
  paid: "Sudah dibayar",
  processing: "Diproses",
  shipped: "Diserahkan ke kurir",
  in_transit: "Dalam pengiriman",
  delivered: "Sampai",
};

function formatTanggal(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function AkunPage() {
  const { profile, save } = useProfile();
  const [form, setForm] = useState<Profile>(profile);
  const [tersimpan, setTersimpan] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const { ids: wishlistIds } = useWishlistIds();
  const { count: cartCount } = useCart();

  useEffect(() => {
    setForm(profile);
  }, [profile]);

  useEffect(() => {
    const sync = () => setOrders(getOrders());
    sync();
    window.addEventListener(ORDERS_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(ORDERS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const set = (k: keyof Profile) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [k]: e.target.value }));
    setTersimpan(false);
  };

  const simpan = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.fullName.trim().length < 2) {
      setError("Tulis nama kamu dulu ya.");
      return;
    }
    if (form.phone.trim() && !/^08\d{8,12}$/.test(form.phone.trim())) {
      setError("Nomor WA diawali 08, 10–14 digit ya. Contoh: 081234567890.");
      return;
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("Format email-nya belum tepat.");
      return;
    }
    setError("");
    save({
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
    });
    setTersimpan(true);
  };

  return (
    <div className="bg-[#F7F7F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <span className="text-[13px] uppercase tracking-widest text-[#C2410C] font-semibold block mb-2">
          {profile.fullName ? `Halo, ${profile.fullName.split(" ")[0]}` : "Akun pelanggan"}
        </span>
        <h1 className="font-serif font-medium text-[32px] sm:text-[44px] tracking-tight">
          Akun Saya
        </h1>
        <p className="mt-2 text-[16px] text-[#6B6B6B]">
          Data diri buat checkout lebih cepat, plus semua riwayat pesananmu.
        </p>

        {/* Ringkasan */}
        <div className="mt-8 grid grid-cols-3 gap-4 lg:gap-5">
          {[
            { Icon: Package, angka: orders.length, label: "Pesanan", href: "#riwayat" },
            { Icon: Heart, angka: wishlistIds.length, label: "Wishlist", href: "/wishlist" },
            { Icon: ShoppingBag, angka: cartCount, label: "Keranjang", href: "/cart" },
          ].map(({ Icon, angka, label, href }) => (
            <Link
              key={label}
              href={href}
              className="bg-white border border-[#E8E6E1] rounded-[8px] p-4 sm:p-5 flex items-center gap-3 hover:border-[#C2410C] transition-colors"
            >
              <span className="inline-flex w-10 h-10 shrink-0 items-center justify-center rounded-full border border-[#E8E6E1]">
                <Icon size={19} strokeWidth={1.7} />
              </span>
              <span>
                <span className="block font-serif text-2xl font-medium leading-none">{angka}</span>
                <span className="block mt-1 text-sm text-[#6B6B6B]">{label}</span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
          {/* Data diri */}
          <section className="bg-white border border-[#E8E6E1] rounded-[8px] p-5 sm:p-6" aria-labelledby="data-diri">
            <h2 id="data-diri" className="font-serif font-medium text-[22px] flex items-center gap-2">
              <User size={20} /> Data Diri
            </h2>
            <p className="mt-1 text-[15px] text-[#6B6B6B]">
              Dipakai otomatis saat checkout. Tersimpan aman di browser ini.
            </p>
            <form onSubmit={simpan} noValidate className="mt-5 space-y-3">
              <div>
                <label htmlFor="akun-nama" className="block text-sm font-medium mb-1">
                  Nama lengkap
                </label>
                <input
                  id="akun-nama"
                  value={form.fullName}
                  onChange={set("fullName")}
                  placeholder="Nama kamu"
                  autoComplete="name"
                  className="w-full border border-[#E8E6E1] rounded-[8px] px-4 py-2.5 text-[15px] focus:outline-none focus:border-[#C2410C] transition-colors"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="akun-wa" className="block text-sm font-medium mb-1">
                    No. WA
                  </label>
                  <input
                    id="akun-wa"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="08xxxxxxxxxx"
                    inputMode="tel"
                    autoComplete="tel"
                    className="w-full border border-[#E8E6E1] rounded-[8px] px-4 py-2.5 text-[15px] focus:outline-none focus:border-[#C2410C] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="akun-email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    id="akun-email"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="kamu@email.com"
                    autoComplete="email"
                    className="w-full border border-[#E8E6E1] rounded-[8px] px-4 py-2.5 text-[15px] focus:outline-none focus:border-[#C2410C] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="akun-alamat" className="block text-sm font-medium mb-1">
                  Alamat
                </label>
                <input
                  id="akun-alamat"
                  value={form.address}
                  onChange={set("address")}
                  placeholder="Jalan, nomor rumah, patokan"
                  autoComplete="street-address"
                  className="w-full border border-[#E8E6E1] rounded-[8px] px-4 py-2.5 text-[15px] focus:outline-none focus:border-[#C2410C] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="akun-kota" className="block text-sm font-medium mb-1">
                  Kota
                </label>
                <input
                  id="akun-kota"
                  value={form.city}
                  onChange={set("city")}
                  placeholder="Jakarta, Surabaya, Bandung…"
                  autoComplete="address-level2"
                  className="w-full border border-[#E8E6E1] rounded-[8px] px-4 py-2.5 text-[15px] focus:outline-none focus:border-[#C2410C] transition-colors"
                />
              </div>
              {error && (
                <p role="alert" className="text-sm text-[#C2410C]">
                  {error}
                </p>
              )}
              {tersimpan && (
                <p role="status" className="flex items-center gap-1.5 text-sm text-emerald-700">
                  <Check size={15} /> Data tersimpan. Checkout nanti tinggal sekali klik.
                </p>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-[8px] bg-[#C2410C] hover:bg-[#A8370A] text-white font-medium transition-colors"
              >
                Simpan Data
              </button>
            </form>
          </section>

          {/* Riwayat pesanan */}
          <section id="riwayat" className="bg-white border border-[#E8E6E1] rounded-[8px] p-5 sm:p-6" aria-labelledby="riwayat-pesanan">
            <h2 id="riwayat-pesanan" className="font-serif font-medium text-[22px] flex items-center gap-2">
              <Package size={20} /> Riwayat Pesanan
            </h2>
            {orders.length === 0 ? (
              <div className="mt-4 text-center py-8 border border-dashed border-[#E8E6E1] rounded-[8px]">
                <p className="text-[15px] text-[#6B6B6B]">Belum ada pesanan. Yuk isi rumahmu!</p>
                <Link
                  href="/shop"
                  className="mt-4 inline-flex items-center gap-1.5 px-6 py-2.5 rounded-[8px] bg-[#1A1A1A] hover:bg-black text-white text-sm font-medium transition-colors"
                >
                  Belanja Sekarang <ArrowRight size={15} />
                </Link>
              </div>
            ) : (
              <ul className="mt-4 space-y-3">
                {orders.map((o) => (
                  <li key={o.id} className="border border-[#E8E6E1] rounded-[8px] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-semibold text-[15px]">{o.id}</p>
                        <p className="text-sm text-[#6B6B6B]">
                          {formatTanggal(o.createdAt)} · {o.items.reduce((s, i) => s + i.quantity, 0)} barang
                        </p>
                      </div>
                      <span
                        className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${
                          o.status === "delivered"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-[#FDEEE4] text-[#C2410C] border border-[#f5d9c4]"
                        }`}
                      >
                        {STATUS_LABEL[o.status]}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#6B6B6B] truncate">
                      {o.items.map((i) => i.name).join(", ")}
                    </p>
                    <div className="mt-3 pt-3 border-t border-[#E8E6E1] flex items-center justify-between">
                      <p className="price font-semibold">{formatIDR(o.total)}</p>
                      <div className="flex gap-4 text-sm font-medium">
                        <Link
                          href={`/order/${o.id.replace("#", "")}`}
                          className="underline underline-offset-4 hover:text-[#C2410C] transition-colors"
                        >
                          Detail
                        </Link>
                        <Link
                          href={`/tracking/${o.id.replace("#", "")}`}
                          className="text-[#C2410C] underline underline-offset-4"
                        >
                          Lacak
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 pt-4 border-t border-[#E8E6E1]">
              <Link
                href="/#showroom"
                className="flex items-center gap-2 text-[15px] text-[#6B6B6B] hover:text-[#C2410C] transition-colors"
              >
                <MapPin size={17} /> Butuh bantuan? Mampir ke showroom terdekat
                <ArrowRight size={15} />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
