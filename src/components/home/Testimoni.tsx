import Image from "next/image";
import { TESTIMONI } from "@/data/products";
import ScrollReveal from "@/components/common/ScrollReveal";

// Testimoni: grid 3 kolom, card putih border tipis. Foto asli, nama, kota, bintang.
export default function Testimoni() {
  return (
    <section className="bg-white" aria-labelledby="testimoni-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[60px] lg:py-[100px]">
        <ScrollReveal>
          <h2
            id="testimoni-heading"
            className="font-serif font-medium text-[28px] lg:text-[44px] tracking-tight text-[#1A1A1A] text-center"
          >
            Kata mereka yang sudah isi rumah di sini
          </h2>
          <p className="mt-3 text-[17px] text-[#6B6B6B] text-center">
            Rating 4.9 dari 3.200+ ulasan terverifikasi.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {TESTIMONI.map((t, i) => (
            <ScrollReveal key={t.nama} delay={Math.min(i * 80, 240)}>
              <figure className="h-full bg-white border border-[#E8E6E1] rounded-[8px] p-6 flex flex-col">
                <div className="flex text-[#C2410C] tracking-widest" aria-label={`Rating ${t.rating} dari 5`}>
                  {"★".repeat(t.rating)}
                </div>
                <blockquote className="mt-3 text-[16px] leading-relaxed text-[#1A1A1A] flex-1">
                  “{t.kutipan}”
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-[#E8E6E1] flex items-center gap-3">
                  <span className="relative w-11 h-11 rounded-full overflow-hidden bg-[#F7F7F5] shrink-0">
                    <Image src={t.foto} alt={`Foto ${t.nama}`} fill sizes="44px" className="object-cover" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold">{t.nama}</span>
                    <span className="block text-sm text-[#6B6B6B]">{t.kota}</span>
                  </span>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
