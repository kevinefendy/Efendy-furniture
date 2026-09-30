import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] min-h-[580px] max-h-[820px] overflow-hidden bg-stone-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85"
          alt="Modern Warm Living Room Interior"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85 filter brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
      </div>

      {/* Content Overlay */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-24">
        <div className="max-w-2xl text-white space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#E8E2D5] font-sans font-medium block">
            New 2026 Collection
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light leading-[1.08] tracking-tight">
            Designed for <br />
            <span className="italic font-normal">everyday living.</span>
          </h1>
          <p className="text-base sm:text-lg text-stone-200 font-light max-w-lg leading-relaxed pt-2">
            Thoughtful furniture for spaces that feel like home. Crafted with honest hardwoods,
            tactile textiles, and serene proportions.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/collections"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#F7F5F0] text-[#20201E] text-xs font-semibold uppercase tracking-widest hover:bg-[#A88968] hover:text-white transition-all duration-200 group shadow-lg"
            >
              Shop Collection
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 border border-white/60 text-white text-xs font-semibold uppercase tracking-widest hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              Explore Catalog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
