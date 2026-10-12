import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { KOLEKSI_TEMA } from "@/data/products";
import ScrollReveal from "@/components/common/ScrollReveal";

// Koleksi kurasi tema: 4 kartu besar. Klik → halaman koleksi (shop dengan filter).
export default function KoleksiKurasi() {
  return (
    <section className="bg-[#F7F7F5]" aria-labelledby="koleksi-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[60px] lg:py-[100px]">
        <ScrollReveal>
          <h2
            id="koleksi-heading"
            className="font-serif font-medium text-[28px] lg:text-[44px] tracking-tight text-[#1A1A1A] text-center"
          >
            Cari gaya yang paling kamu
          </h2>
          <p className="mt-3 text-[17px] text-[#6B6B6B] text-center max-w-2xl mx-auto">
            Empat tema yang paling sering dipilih pelanggan kami. Tinggal klik, langsung isi rumah.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {KOLEKSI_TEMA.map((k, i) => (
            <ScrollReveal key={k.id} delay={Math.min(i * 80, 240)}>
              <Link
                href={`/shop?style=${encodeURIComponent(
                  k.nama === "Rumah Minimalis"
                    ? "Minimalis"
                    : k.nama === "Industrial Loft"
                      ? "Industrial"
                      : k.nama === "Japandi Calm"
                        ? "Japandi"
                        : "Scandinavian Warm"
                )}`}
                className="group block bg-white border border-[#E8E6E1] rounded-[8px] overflow-hidden hover:border-[#C2410C] transition-colors"
              >
                <span className="relative block aspect-[4/5] overflow-hidden bg-white">
                  <Image
                    src={k.gambar}
                    alt={`Koleksi ${k.nama}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.03]"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 rounded-full px-3 py-1 text-[13px] font-medium">
                    {k.jumlah} produk
                  </span>
                </span>
                <span className="block p-5">
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-serif text-[20px] font-medium">{k.nama}</span>
                    <ArrowRight size={18} className="shrink-0 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="mt-1 block text-[15px] text-[#6B6B6B]">{k.deskripsi}</span>
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
