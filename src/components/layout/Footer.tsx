"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#20201E] text-[#F7F5F0] pt-16 pb-12 border-t border-[#333330]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-stone-800">
          {/* Brand Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-2xl tracking-wider uppercase block">
              Efendy Furniture
            </span>
            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              Modern furniture designed for the way you live. We unite calm Japanese minimalism,
              tactile Nordic craftsmanship, and honest Indonesian hardwoods.
            </p>
            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest text-[#A88968]">
                Jakarta • Surabaya • Bali
              </span>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#A88968]">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link href="/shop" className="hover:text-white transition">
                  All Furniture
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Sofa" className="hover:text-white transition">
                  Sofas & Sectionals
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Table" className="hover:text-white transition">
                  Dining & Desks
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Chair" className="hover:text-white transition">
                  Chairs & Benches
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-white transition">
                  The Nara Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Rooms */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#A88968]">
              Spaces
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link href="/rooms/living-room" className="hover:text-white transition">
                  Living Room
                </Link>
              </li>
              <li>
                <Link href="/rooms/bedroom" className="hover:text-white transition">
                  Bedroom
                </Link>
              </li>
              <li>
                <Link href="/rooms/dining-room" className="hover:text-white transition">
                  Dining Room
                </Link>
              </li>
              <li>
                <Link href="/rooms/workspace" className="hover:text-white transition">
                  Workspace
                </Link>
              </li>
              <li>
                <Link href="/inspiration" className="hover:text-white transition">
                  Editorial Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#A88968]">
              Stay Connected
            </h4>
            <p className="text-xs text-stone-400">
              Receive private previews, interior styling guides, and exclusive releases.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-stone-900 border border-stone-800 text-sm px-3 py-2.5 text-white placeholder-stone-500 focus:outline-none focus:border-[#A88968]"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-1 text-stone-400 hover:text-white"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Efendy Furniture. Built for Build Challenge #02.</p>
          <div className="flex space-x-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Delivery & Returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
