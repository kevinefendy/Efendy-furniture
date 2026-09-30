"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Youtube, Check } from "lucide-react";

const SHOP_LINKS = [
  { name: "All Furniture", href: "/shop" },
  { name: "Sofas", href: "/shop?category=Sofa" },
  { name: "Chairs", href: "/shop?category=Chair" },
  { name: "Tables", href: "/shop?category=Table" },
  { name: "Beds", href: "/shop?category=Bed" },
  { name: "Storage", href: "/shop?category=Storage" },
  { name: "Lighting", href: "/shop?category=Lighting" },
  { name: "Sale", href: "/shop?deal=sale" },
];

const EXPLORE_LINKS = [
  { name: "Ideas & Inspiration", href: "/inspiration" },
  { name: "Furniture Collections", href: "/collections" },
  { name: "Shop by Room", href: "/rooms" },
  { name: "New Arrivals", href: "/shop?sort=newest" },
  { name: "Best Sellers", href: "/shop?sort=rating" },
  { name: "Search", href: "/search" },
];

const SUPPORT_LINKS = [
  { name: "My Wishlist", href: "/wishlist" },
  { name: "Shopping Bag", href: "/cart" },
  { name: "Checkout", href: "/checkout" },
  { name: "Contact Us", href: "mailto:hello@efendy-furniture.com" },
];

const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com", Icon: Instagram },
  { name: "Facebook", href: "https://facebook.com", Icon: Facebook },
  { name: "Twitter", href: "https://twitter.com", Icon: Twitter },
  { name: "Youtube", href: "https://youtube.com", Icon: Youtube },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubscribed(true);
  };

  return (
    <footer className="bg-white text-stone-500 border-t border-[#E5E1DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        {/* Logo + socials */}
        <div className="mb-10">
          <Link href="/" aria-label="Efendy Furniture home">
            <span className="font-logo text-[32px] font-medium tracking-[0.18em] text-[#6B6B6B] leading-none">
              EFENDY<span className="text-[#6B6B6B]">.</span>
            </span>
          </Link>
          <div className="flex items-center gap-3 mt-5">
            {SOCIALS.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Efendy Furniture on ${name}`}
                className="w-9 h-9 rounded-full border border-stone-300 flex items-center justify-center text-stone-500 hover:text-[#6B6B6B] hover:border-[#6B6B6B] transition-colors"
              >
                <Icon size={17} strokeWidth={1.6} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns + newsletter */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
          <nav aria-label="Shop links">
            <h3 className="text-sm font-semibold text-[#20201E] mb-4">Shop</h3>
            <ul className="space-y-2.5 text-[13.5px]">
              {SHOP_LINKS.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="hover:text-[#6B6B6B] transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explore links">
            <h3 className="text-sm font-semibold text-[#20201E] mb-4">Explore</h3>
            <ul className="space-y-2.5 text-[13.5px]">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="hover:text-[#6B6B6B] transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Support links">
            <h3 className="text-sm font-semibold text-[#20201E] mb-4">Support</h3>
            <ul className="space-y-2.5 text-[13.5px]">
              {SUPPORT_LINKS.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="hover:text-[#6B6B6B] transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-10">
            <h3 className="text-[15px] font-normal text-[#20201E] leading-snug mb-4">
              Get new products and promotions in your inbox.
            </h3>
            {subscribed ? (
              <p role="status" className="flex items-center gap-2 text-sm text-emerald-600">
                <Check size={16} /> You&apos;re subscribed. Welcome in!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} noValidate>
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  aria-invalid={!!error}
                  aria-describedby={error ? "footer-email-error" : undefined}
                  className="w-full max-w-sm bg-[#F7F5F0] border border-stone-300 text-[#20201E] placeholder:text-stone-400 text-sm rounded-sm px-4 py-2.5 focus:outline-none focus:border-[#6B6B6B] transition-colors"
                />
                {error && (
                  <p id="footer-email-error" role="alert" className="mt-2 text-xs text-rose-500">
                    {error}
                  </p>
                )}
                <div className="mt-3">
                  <button
                    type="submit"
                    className="px-7 py-2.5 bg-[#6B6B6B] hover:bg-[#4A4A4A] text-white text-xs font-bold tracking-[0.15em] rounded-full transition-colors"
                  >
                    SUBSCRIBE
                  </button>
                </div>
              </form>
            )}
            <p className="mt-5 text-xs text-stone-400">
              Showroom: Senopati, South Jakarta
              <br />
              hello@efendy-furniture.com
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#E5E1DB] text-[13px] space-y-2">
          <p className="flex items-center gap-2 text-stone-500">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white text-[9px] font-bold">
              ID
            </span>
            ID | EN
          </p>
          <p className="text-stone-400">
            Terms of Use - Privacy Policy - Cookies - Accessibility - Shop
          </p>
          <p className="text-stone-400">Copyright © 2026 Efendy Furniture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
