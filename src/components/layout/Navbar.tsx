"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  User,
  MessageCircle,
} from "lucide-react";
import { ROOMS_DATA } from "@/data/products";
import SearchModal from "@/components/search/SearchModal";
import { useCartCount, useWishlistIds, openCartDrawer } from "@/lib/store";

// Navbar retail: logo kiri, menu tengah, ikon + tombol WA kanan.
// Sticky + blur backdrop saat scroll. Border bawah muncul saat scroll.
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [kategoriOpen, setKategoriOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const cartCount = useCartCount();
  const { ids: wishlistIds } = useWishlistIds();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setKategoriOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? "border-b border-[#E8E6E1]" : "border-b border-transparent"
      }`}
    >
      {/* Bar atas: info singkat */}
      <div className="bg-[#1A1A1A] text-white text-center text-[13px] py-2 px-4">
        Gratis ongkir + instalasi se-Jabodetabek min. belanja Rp 3 juta
        <Link href="/shop?deal=sale" className="underline underline-offset-2 ml-2 font-medium">
          Lihat Sale
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 h-16 lg:h-[72px]">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 -ml-2 text-[#1A1A1A]"
            aria-label="Buka menu navigasi"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="shrink-0" aria-label="Efendy Furniture - beranda">
            <span className="font-sans text-[22px] lg:text-2xl font-bold tracking-tight text-[#1A1A1A]">
              Efendy<span className="text-[#C2410C]">.</span>
            </span>
            <span className="hidden sm:block text-[11px] tracking-[0.18em] uppercase text-[#6B6B6B] -mt-1">
              Furniture
            </span>
          </Link>

          {/* Menu desktop */}
          <nav className="hidden lg:flex items-center gap-7 ml-10 text-[15px]" aria-label="Navigasi utama">
            <div
              className="relative"
              onMouseEnter={() => setKategoriOpen(true)}
              onMouseLeave={() => setKategoriOpen(false)}
            >
              <button
                onClick={() => setKategoriOpen(!kategoriOpen)}
                className="flex items-center gap-1 py-3 text-[#1A1A1A] hover:text-[#C2410C] transition-colors"
                aria-expanded={kategoriOpen}
                aria-haspopup="true"
              >
                Kategori <ChevronDown size={15} className="opacity-60" />
              </button>
              {kategoriOpen && (
                <div className="absolute top-full left-0 w-60 bg-white border border-[#E8E6E1] rounded-[8px] py-2 shadow-[0_8px_30px_rgba(26,26,26,0.08)]">
                  {ROOMS_DATA.map((r) => (
                    <Link
                      key={r.id}
                      href={`/rooms/${r.id}`}
                      className="block px-5 py-2.5 text-[15px] text-[#1A1A1A] hover:bg-[#F7F7F5] hover:text-[#C2410C] transition-colors"
                    >
                      {r.name}
                    </Link>
                  ))}
                  <div className="my-1.5 border-t border-[#E8E6E1]" />
                  <Link
                    href="/shop"
                    className="block px-5 py-2.5 text-[15px] font-medium text-[#C2410C] hover:bg-[#F7F7F5]"
                  >
                    Semua Produk
                  </Link>
                </div>
              )}
            </div>
            <Link href="/shop?sort=newest" className="text-[#1A1A1A] hover:text-[#C2410C] transition-colors">
              Koleksi Baru
            </Link>
            <Link
              href="/shop?deal=sale"
              className="font-medium text-[#C2410C] hover:underline underline-offset-4 transition"
            >
              Sale
            </Link>
            <Link href="/#showroom" className="text-[#1A1A1A] hover:text-[#C2410C] transition-colors">
              Showroom
            </Link>
            <Link href="/contact" className="text-[#1A1A1A] hover:text-[#C2410C] transition-colors">
              Kontak
            </Link>
            <Link href="/#bantuan" className="text-[#1A1A1A] hover:text-[#C2410C] transition-colors">
              Bantuan
            </Link>
          </nav>

          {/* Ikon kanan */}
          <div className="flex items-center gap-0.5 sm:gap-1 ml-auto">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 text-[#1A1A1A] hover:text-[#C2410C] transition-colors"
              aria-label="Cari produk"
            >
              <Search size={21} strokeWidth={1.8} />
            </button>
            <Link
              href="/wishlist"
              className="relative p-2.5 text-[#1A1A1A] hover:text-[#C2410C] transition-colors"
              aria-label={`Wishlist, ${wishlistIds.length} produk`}
            >
              <Heart size={21} strokeWidth={1.8} />
              {wishlistIds.length > 0 && (
                <span className="absolute top-1 right-1 min-w-4 h-4 px-0.5 bg-[#1A1A1A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => openCartDrawer()}
              className="relative p-2.5 text-[#1A1A1A] hover:text-[#C2410C] transition-colors"
              aria-label={`Keranjang, ${cartCount} barang`}
            >
              <ShoppingBag size={21} strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 min-w-4 h-4 px-0.5 bg-[#C2410C] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <Link
              href="/akun"
              className="hidden sm:block p-2.5 text-[#1A1A1A] hover:text-[#C2410C] transition-colors"
              aria-label="Akun saya"
            >
              <User size={21} strokeWidth={1.8} />
            </Link>
            {/* 1 tombol CTA terracotta per halaman area: WA */}
            <a
              href="https://wa.me/6281210001001?text=Halo%20Efendy%20Furniture!"
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 ml-2 px-5 py-2.5 rounded-[8px] bg-[#C2410C] hover:bg-[#A8370A] text-white text-sm font-medium transition-colors"
            >
              <MessageCircle size={17} />
              Chat WA
            </a>
          </div>
        </div>
      </div>

      {/* Drawer mobile */}
      {mobileOpen && (
        <div className="lg:hidden absolute inset-x-0 top-full bg-white border-t border-[#E8E6E1] z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto p-6 space-y-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#6B6B6B] mb-2">
              Kategori
            </p>
            {ROOMS_DATA.map((r) => (
              <Link
                key={r.id}
                href={`/rooms/${r.id}`}
                className="block py-2 text-[17px] text-[#1A1A1A]"
              >
                {r.name}
              </Link>
            ))}
          </div>
          <div className="border-t border-[#E8E6E1] pt-4 space-y-1">
            <Link href="/shop?sort=newest" className="block py-2 text-[17px]">
              Koleksi Baru
            </Link>
            <Link href="/shop?deal=sale" className="block py-2 text-[17px] font-medium text-[#C2410C]">
              Sale
            </Link>
            <Link href="/#showroom" className="block py-2 text-[17px]">
              Showroom
            </Link>
            <Link href="/contact" className="block py-2 text-[17px]">
              Kontak
            </Link>
            <Link href="/#bantuan" className="block py-2 text-[17px]">
              Bantuan
            </Link>
          </div>
          <a
            href="https://wa.me/6281210001001"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-[8px] bg-[#C2410C] text-white font-medium"
          >
            <MessageCircle size={18} /> Chat WA
          </a>
        </div>
      )}

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
