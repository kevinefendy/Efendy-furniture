import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CollectionSpotlight() {
  return (
    <section className="py-24 bg-[#F7F5F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Showcase */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-lg bg-stone-300">
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=85"
                alt="The Nara Collection by Efendy Furniture"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
            </div>
            {/* Small floating detail card */}
            <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:right-6 bg-white p-4 sm:p-6 shadow-xl border border-[#E5E1DB] max-w-xs hidden sm:block">
              <span className="text-[10px] uppercase tracking-widest text-[#A88968] font-bold block mb-1">
                Signature Material
              </span>
              <p className="font-serif text-base text-[#20201E]">
                FSC Solid Teak & Belgian Textured Boucle
              </p>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-5 space-y-6 lg:pl-6">
            <div className="inline-block border-b border-[#A88968] pb-1">
              <span className="text-xs uppercase tracking-[0.25em] text-[#A88968] font-semibold">
                Featured Capsule
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#20201E] tracking-tight leading-[1.15]">
              The Nara Collection
            </h2>
            <div className="space-y-2 text-stone-600 font-light text-base leading-relaxed">
              <p className="text-lg font-serif italic text-stone-800">
                Warm wood. Soft curves. Designed for slow living.
              </p>
              <p className="text-sm text-[#817A71] pt-2">
                Conceived as a tribute to organic Japanese joinery and contemporary Nordic calm. Each piece
                in the Nara collection is hand-finished to preserve the authentic tactile grain of natural timber.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/collections"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-[#20201E] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#A88968] transition-colors group"
              >
                Explore Collection
                <ArrowRight size={15} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
