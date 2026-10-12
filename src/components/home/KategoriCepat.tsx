import Link from "next/link";
import Image from "next/image";
import { KATEGORI_CEPAT } from "@/data/products";
import ScrollReveal from "@/components/common/ScrollReveal";

// Kategori cepat: grid 8 kotak. Card putih, border tipis, hover border terracotta.
export default function KategoriCepat() {
  return (
    <section className="bg-[#F7F7F5]" aria-labelledby="kategori-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[60px] lg:py-[100px]">
        <ScrollReveal>
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <h2
                id="kategori-heading"
                className="font-serif font-medium text-[28px] lg:text-[44px] tracking-tight text-[#1A1A1A]"
              >
                Belanja per kategori
              </h2>
              <p className="mt-2 text-[17px] text-[#6B6B6B]">
                Dari ruang tamu sampai teras — semua ada di satu tempat.
              </p>
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline-block shrink-0 text-[15px] font-medium text-[#1A1A1A] underline underline-offset-4 decoration-[#C2410C] decoration-2"
            >
              Lihat semua
            </Link>
          </div>
        </ScrollReveal>

        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-5 lg:gap-6">
          {KATEGORI_CEPAT.map((k, i) => (
            <ScrollReveal as="li" key={k.id} delay={Math.min(i * 60, 300)}>
              <Link
                href={`/shop?category=${encodeURIComponent(k.id)}`}
                className="group block bg-white border border-[#E8E6E1] rounded-[8px] overflow-hidden hover:border-[#C2410C] transition-colors"
              >
                <span className="relative block aspect-[4/3] bg-[#F7F7F5] overflow-hidden">
                  <Image
                    src={k.gambar}
                    alt={`Kategori ${k.nama}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.03]"
                  />
                </span>
                <span className="block p-4">
                  <span className="block text-[16px] font-medium text-[#1A1A1A]">{k.nama}</span>
                  <span className="block mt-0.5 text-sm text-[#6B6B6B]">{k.deskripsi}</span>
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
