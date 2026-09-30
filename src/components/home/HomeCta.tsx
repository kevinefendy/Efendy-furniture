import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomeCta() {
  return (
    <section className="py-24 bg-[#20201E] text-white text-center relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#A88968_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <span className="text-xs uppercase tracking-[0.3em] text-[#A88968] font-semibold block">
          Curate Your Atmosphere
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
          Find something <br />
          <span className="italic font-normal">for your space.</span>
        </h2>
        <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
          From sculptural living room anchors to understated dining sets. Explore modern furniture
          made with purpose and longevity.
        </p>
        <div className="pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#F7F5F0] text-[#20201E] text-xs font-semibold uppercase tracking-widest hover:bg-[#A88968] hover:text-white transition-all shadow-xl group"
          >
            Shop All Furniture
            <ArrowRight size={15} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
