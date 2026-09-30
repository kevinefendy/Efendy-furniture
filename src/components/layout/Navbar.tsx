"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  CircleHelp,
} from "lucide-react";
import SearchModal from "@/components/search/SearchModal";
import { useCartCount, useWishlistIds, openCartDrawer } from "@/lib/store";

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenCart?: () => void;
  wishlistCount?: number;
  cartCount?: number;
}

const ROOM_LINKS = [
  { name: "Living Room", href: "/rooms/living-room" },
  { name: "Bedroom", href: "/rooms/bedroom" },
  { name: "Dining Room", href: "/rooms/dining-room" },
  { name: "Workspace", href: "/rooms/workspace" },
];

const PRODUCT_LINKS = [
  { name: "Sofas", href: "/shop?category=Sofa" },
  { name: "Chairs", href: "/shop?category=Chair" },
  { name: "Tables", href: "/shop?category=Table" },
  { name: "Beds", href: "/shop?category=Bed" },
  { name: "Storage", href: "/shop?category=Storage" },
  { name: "Lighting", href: "/shop?category=Lighting" },
  { name: "Decor", href: "/shop?category=Decor" },
];

export default function Navbar({
  onOpenSearch,
  onOpenCart,
  wishlistCount = 0,
  cartCount = 0,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"rooms" | "products" | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const liveCartCount = useCartCount();
  const { ids: liveWishlistIds } = useWishlistIds();
  const effectiveCartCount = cartCount > 0 ? cartCount : liveCartCount;
  const effectiveWishlistCount =
    wishlistCount > 0 ? wishlistCount : liveWishlistIds.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  const secondaryLinks = [
    { name: "Decor", href: "/shop?category=Decor" },
    { name: "Furniture Collections", href: "/collections" },
    { name: "Best Sellers", href: "/shop?sort=rating" },
    { name: "New Arrivals", href: "/shop?sort=newest" },
    { name: "Ideas & Inspiration", href: "/inspiration" },
    { name: "Sale", href: "/shop?deal=sale", highlight: true },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white transition-shadow duration-300 ${
        isScrolled ? "shadow-[0_1px_12px_rgba(0,0,0,0.08)]" : "border-b border-[#E5E1DB]/70"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Row 1: logo / search / icons ─────────────────────────── */}
        <div className="flex items-center gap-3 sm:gap-6 h-16 lg:h-[76px]">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 text-[#20201E] hover:text-[#A88968] transition"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="shrink-0 select-none" aria-label="Efendy Furniture home">
            <span className="font-logo text-[26px] lg:text-[32px] font-medium tracking-[0.18em] text-[#6B6B6B] leading-none">
              EFENDY<span className="text-[#A88968]">.</span>
            </span>
          </Link>

          {/* Search bar (desktop) */}
          <form
            onSubmit={submitSearch}
            role="search"
            className="hidden md:flex flex-1 max-w-3xl"
          >
            <div className="relative w-full">
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products & help ..."
                aria-label="Search products"
                className="w-full border border-stone-300 rounded-sm py-2.5 pl-4 pr-11 text-sm text-[#20201E] placeholder:text-stone-400 focus:outline-none focus:border-[#A88968] transition-colors"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-stone-500 hover:text-[#20201E] transition"
                aria-label="Submit search"
              >
                <Search size={19} strokeWidth={1.8} />
              </button>
            </div>
          </form>

          {/* Icons */}
          <div className="flex items-center gap-0.5 sm:gap-2 ml-auto">
            <span
              className="hidden xl:inline-flex items-center text-[11px] font-semibold tracking-wider text-stone-500 border border-stone-300 rounded-sm px-2 py-1 mr-1"
              title="Region: Indonesia"
            >
              ID
            </span>
            <Link
              href="/inspiration"
              className="hidden sm:block p-2 text-stone-600 hover:text-[#A88968] transition"
              aria-label="Help and inspiration"
            >
              <CircleHelp size={22} strokeWidth={1.5} />
            </Link>
            <button
              onClick={onOpenSearch || (() => setSearchModalOpen(true))}
              className="md:hidden p-2 text-stone-600 hover:text-[#A88968] transition"
              aria-label="Search furniture catalog"
            >
              <Search size={22} strokeWidth={1.5} />
            </button>
            <Link
              href="/wishlist"
              className="p-2 text-stone-600 hover:text-[#A88968] transition relative"
              aria-label="View Wishlist"
            >
              <Heart size={22} strokeWidth={1.5} />
              {effectiveWishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-4 h-4 px-0.5 bg-[#A88968] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {effectiveWishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => onOpenCart?.() ?? openCartDrawer()}
              className="p-2 text-stone-600 hover:text-[#A88968] transition relative"
              aria-label="Open Cart"
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {effectiveCartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-4 h-4 px-0.5 bg-[#20201E] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {effectiveCartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile search row */}
        <form onSubmit={submitSearch} role="search" className="md:hidden pb-3">
          <div className="relative w-full">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products & help ..."
              aria-label="Search products"
              className="w-full border border-stone-300 rounded-sm py-2 pl-4 pr-11 text-sm text-[#20201E] placeholder:text-stone-400 focus:outline-none focus:border-[#A88968] transition-colors"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-stone-500 hover:text-[#20201E] transition"
              aria-label="Submit search"
            >
              <Search size={18} strokeWidth={1.8} />
            </button>
          </div>
        </form>

        {/* ── Row 2: category nav (desktop) ────────────────────────── */}
        <nav className="hidden lg:block border-t border-[#E5E1DB]/60" aria-label="Categories">
          <ul className="flex items-center gap-7 h-12 text-[13.5px] text-[#333330]">
            {/* Rooms dropdown */}
            <li
              className="relative h-full flex items-center"
              onMouseEnter={() => setOpenDropdown("rooms")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href="/rooms/living-room"
                className="flex items-center gap-1 hover:text-[#A88968] transition-colors py-3"
              >
                Rooms <ChevronDown size={13} className="opacity-60" />
              </Link>
              {openDropdown === "rooms" && (
                <div className="absolute top-full left-0 w-52 bg-white border border-[#E5E1DB] shadow-lg rounded-sm py-2 animate-in fade-in slide-in-from-top-1 duration-150">
                  {ROOM_LINKS.map((l) => (
                    <Link
                      key={l.name}
                      href={l.href}
                      className="block px-5 py-2.5 text-sm hover:bg-[#F7F5F0] hover:text-[#A88968] transition-colors"
                    >
                      {l.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Products mega dropdown */}
            <li
              className="relative h-full flex items-center"
              onMouseEnter={() => setOpenDropdown("products")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href="/shop"
                className={`flex items-center gap-1 hover:text-[#A88968] transition-colors py-3 ${
                  pathname === "/shop" ? "text-[#A88968]" : ""
                }`}
              >
                Products <ChevronDown size={13} className="opacity-60" />
              </Link>
              {openDropdown === "products" && (
                <div className="absolute top-full left-0 w-56 bg-white border border-[#E5E1DB] shadow-lg rounded-sm py-2 animate-in fade-in slide-in-from-top-1 duration-150">
                  <Link
                    href="/shop"
                    className="block px-5 py-2.5 text-sm font-medium hover:bg-[#F7F5F0] hover:text-[#A88968] transition-colors"
                  >
                    Shop All Furniture
                  </Link>
                  <div className="my-1.5 border-t border-[#E5E1DB]/70" />
                  {PRODUCT_LINKS.map((l) => (
                    <Link
                      key={l.name}
                      href={l.href}
                      className="block px-5 py-2 text-sm hover:bg-[#F7F5F0] hover:text-[#A88968] transition-colors"
                    >
                      {l.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {secondaryLinks.map((link) => (
              <li key={link.name} className="h-full flex items-center">
                <Link
                  href={link.href}
                  className={`py-3 transition-colors whitespace-nowrap ${
                    link.highlight
                      ? "text-[#A88968] font-semibold hover:text-[#8E7253]"
                      : "hover:text-[#A88968]"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute inset-x-0 top-full bg-white z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-[#E5E1DB] shadow-xl p-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#817A71] mb-2">
              Shop by Room
            </p>
            {ROOM_LINKS.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                className="block py-2 font-logo text-lg tracking-wide text-[#20201E] hover:text-[#A88968]"
              >
                {l.name}
              </Link>
            ))}
          </div>
          <div className="space-y-1 border-t border-[#E5E1DB] pt-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#817A71] mb-2">
              Shop by Category
            </p>
            {PRODUCT_LINKS.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                className="block py-1.5 text-[15px] text-[#333330] hover:text-[#A88968]"
              >
                {l.name}
              </Link>
            ))}
          </div>
          <div className="space-y-1 border-t border-[#E5E1DB] pt-5">
            {secondaryLinks
              .filter((l) => l.name !== "Decor")
              .map((l) => (
                <Link
                  key={l.name}
                  href={l.href}
                  className={`block py-1.5 text-[15px] ${
                    l.highlight ? "text-[#A88968] font-semibold" : "text-[#333330]"
                  } hover:text-[#A88968]`}
                >
                  {l.name}
                </Link>
              ))}
            <Link
              href="/wishlist"
              className="flex items-center justify-between py-1.5 text-[15px] text-[#333330] hover:text-[#A88968]"
            >
              <span>My Wishlist</span>
              {effectiveWishlistCount > 0 && (
                <span className="text-xs bg-[#A88968] text-white px-2 py-0.5 rounded-full">
                  {effectiveWishlistCount}
                </span>
              )}
            </Link>
          </div>
          <div className="pt-4 border-t border-[#E5E1DB] text-xs text-[#817A71] space-y-1.5">
            <p>Customer Care: hello@efendy-furniture.com</p>
            <p>Showroom: Senopati, South Jakarta</p>
          </div>
        </div>
      )}

      {/* Search Modal (instant results) */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </header>
  );
}
