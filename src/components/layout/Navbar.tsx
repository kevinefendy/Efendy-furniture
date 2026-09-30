"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import SearchModal from "@/components/search/SearchModal";
import { useCartCount, useWishlistIds, openCartDrawer } from "@/lib/store";

interface NavbarProps {
  onOpenSearch?: () => void;
  onOpenCart?: () => void;
  wishlistCount?: number;
  cartCount?: number;
}

export default function Navbar({
  onOpenSearch,
  onOpenCart,
  wishlistCount = 0,
  cartCount = 0,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const pathname = usePathname();
  const liveCartCount = useCartCount();
  const { ids: liveWishlistIds } = useWishlistIds();
  const effectiveCartCount = cartCount > 0 ? cartCount : liveCartCount;
  const effectiveWishlistCount =
    wishlistCount > 0 ? wishlistCount : liveWishlistIds.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShopMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Shop", href: "/shop", hasMega: true },
    { name: "Collections", href: "/collections" },
    { name: "Rooms", href: "/rooms/living-room" },
    { name: "Inspiration", href: "/inspiration" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#F7F5F0]/95 backdrop-blur-md shadow-sm border-b border-[#E5E1DB]"
          : "bg-[#F7F5F0] border-b border-[#E5E1DB]/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#20201E] hover:text-[#A88968] transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Left Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.hasMega && setShopMenuOpen(true)}
                onMouseLeave={() => link.hasMega && setShopMenuOpen(false)}
              >
                <Link
                  href={link.href}
                  className={`text-sm tracking-widest uppercase transition-colors flex items-center gap-1 py-2 font-medium ${
                    pathname.startsWith(link.href)
                      ? "text-[#A88968] border-b border-[#A88968]"
                      : "text-[#20201E] hover:text-[#A88968]"
                  }`}
                >
                  {link.name}
                  {link.hasMega && <ChevronDown size={14} className="opacity-70" />}
                </Link>

                {/* Shop Mega Menu */}
                {link.hasMega && shopMenuOpen && (
                  <div className="absolute top-full left-0 w-80 bg-white border border-[#E5E1DB] shadow-lg rounded-sm py-4 px-6 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#817A71] mb-2">
                        Categories
                      </h4>
                      <ul className="space-y-1.5 text-sm">
                        <li>
                          <Link href="/shop?category=Sofa" className="hover:text-[#A88968]">
                            Sofas
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Chair" className="hover:text-[#A88968]">
                            Chairs
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Table" className="hover:text-[#A88968]">
                            Tables
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Bed" className="hover:text-[#A88968]">
                            Beds
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Storage" className="hover:text-[#A88968]">
                            Storage
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Lighting" className="hover:text-[#A88968]">
                            Lighting
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#817A71] mb-2">
                        Shop By Room
                      </h4>
                      <ul className="space-y-1.5 text-sm">
                        <li>
                          <Link href="/rooms/living-room" className="hover:text-[#A88968]">
                            Living Room
                          </Link>
                        </li>
                        <li>
                          <Link href="/rooms/bedroom" className="hover:text-[#A88968]">
                            Bedroom
                          </Link>
                        </li>
                        <li>
                          <Link href="/rooms/dining-room" className="hover:text-[#A88968]">
                            Dining Room
                          </Link>
                        </li>
                        <li>
                          <Link href="/rooms/workspace" className="hover:text-[#A88968]">
                            Workspace
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Brand Logo - Centered */}
          <div className="flex-1 lg:flex-initial text-center lg:text-center">
            <Link href="/" className="inline-block group">
              <span className="font-serif text-2xl sm:text-3xl tracking-wider uppercase text-[#20201E] group-hover:text-[#A88968] transition-colors">
                Efendy Furniture
              </span>
              <span className="block text-[9px] tracking-[0.3em] uppercase text-[#817A71] -mt-1">
                Modern Living • Jakarta
              </span>
            </Link>
          </div>

          {/* Action Icons Right */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search */}
            <button
              onClick={onOpenSearch || (() => setSearchModalOpen(true))}
              className="p-2 text-[#20201E] hover:text-[#A88968] transition relative"
              aria-label="Search furniture catalog"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="p-2 text-[#20201E] hover:text-[#A88968] transition relative"
              aria-label="View Wishlist"
            >
              <Heart size={20} />
              {effectiveWishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#A88968] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                  {effectiveWishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => onOpenCart?.() ?? openCartDrawer()}
              className="p-2 text-[#20201E] hover:text-[#A88968] transition relative flex items-center"
              aria-label="Open Cart"
            >
              <ShoppingBag size={20} />
              {effectiveCartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#20201E] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {effectiveCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[113px] bottom-0 bg-[#F7F5F0] z-50 overflow-y-auto border-t border-[#E5E1DB] p-6 space-y-6 animate-in slide-in-from-left duration-200">
          <div className="space-y-4">
            <Link
              href="/shop"
              className="block text-xl font-serif text-[#20201E] hover:text-[#A88968]"
            >
              Shop All Products
            </Link>
            <div className="pl-4 space-y-2 border-l border-[#E5E1DB]">
              <Link href="/shop?category=Sofa" className="block text-sm text-[#817A71]">
                Sofas & Couches
              </Link>
              <Link href="/shop?category=Chair" className="block text-sm text-[#817A71]">
                Lounge Chairs & Dining
              </Link>
              <Link href="/shop?category=Table" className="block text-sm text-[#817A71]">
                Tables & Desks
              </Link>
              <Link href="/shop?category=Bed" className="block text-sm text-[#817A71]">
                Beds & Nightstands
              </Link>
              <Link href="/shop?category=Storage" className="block text-sm text-[#817A71]">
                Storage & Credenzas
              </Link>
              <Link href="/shop?category=Lighting" className="block text-sm text-[#817A71]">
                Pendants & Lamps
              </Link>
            </div>

            <Link
              href="/collections"
              className="block text-xl font-serif text-[#20201E] hover:text-[#A88968]"
            >
              Collections (The Nara)
            </Link>

            <Link
              href="/rooms/living-room"
              className="block text-xl font-serif text-[#20201E] hover:text-[#A88968]"
            >
              Shop By Room
            </Link>

            <Link
              href="/inspiration"
              className="block text-xl font-serif text-[#20201E] hover:text-[#A88968]"
            >
              Interior Inspiration
            </Link>

            <Link
              href="/wishlist"
              className="block text-xl font-serif text-[#20201E] hover:text-[#A88968] flex items-center justify-between"
            >
              <span>My Wishlist</span>
              {effectiveWishlistCount > 0 && (
                <span className="text-xs bg-[#A88968] text-white px-2 py-0.5 rounded-full">
                  {effectiveWishlistCount}
                </span>
              )}
            </Link>
          </div>

          <div className="pt-6 border-t border-[#E5E1DB] text-xs text-[#817A71] space-y-2">
            <p>Customer Care: hello@efendy-furniture.com</p>
            <p>Showroom: Senopati, South Jakarta</p>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </header>
  );
}
