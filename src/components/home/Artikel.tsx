import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { INSPIRATION_ARTICLES } from "@/data/products";
import ScrollReveal from "@/components/common/ScrollReveal";

// Artikel: 3 terbaru tentang tips dekorasi. Card putih, foto, judul, read time.
export default function Artikel() {
  return (
    <section id="artikel" className="bg-white" aria-labelledby="artikel-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[60px] lg:py-[100px]">
        <ScrollReveal>
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <h2
                id="artikel-heading"
                className="font-serif font-medium text-[28px] lg:text-[44px] tracking-tight text-[#1A1A1A]"
              >
                Tips biar rumah makin nyaman
              </h2>
              <p className="mt-2 text-[17px] text-[#6B6B6B]">
                Ditulis tim interior kami, bahasa santai, langsung bisa dipraktekkan.
              </p>
            </div>
            <Link
              href="/inspiration"
              className="hidden sm:inline-flex items-center gap-1 shrink-0 text-[15px] font-medium underline underline-offset-4 decoration-[#C2410C] decoration-2"
            >
              Semua artikel <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {INSPIRATION_ARTICLES.map((a, i) => (
            <ScrollReveal key={a.id} delay={Math.min(i * 80, 240)}>
              <Link
                href="/inspiration"
                className="group block bg-white border border-[#E8E6E1] rounded-[8px] overflow-hidden hover:border-[#C2410C] transition-colors"
              >
                <span className="relative block aspect-[16/10] overflow-hidden bg-[#F7F7F5]">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.03]"
                  />
                </span>
                <span className="block p-5">
                  <span className="flex items-center gap-3 text-[13px]">
                    <span className="font-medium text-[#C2410C]">{a.category}</span>
                    <span className="flex items-center gap-1 text-[#6B6B6B]">
                      <Clock size={13} /> {a.readTime}
                    </span>
                  </span>
                  <span className="mt-2 block font-serif text-[20px] font-medium leading-snug">
                    {a.title}
                  </span>
                  <span className="mt-1.5 block text-[15px] text-[#6B6B6B] clamp-2">{a.excerpt}</span>
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
