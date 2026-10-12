import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, KOLEKSI_TEMA } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { ArrowLeft } from "lucide-react";

// Halaman koleksi: 4 tema kurasi (Rumah Minimalis, Scandinavian Warm, Japandi Calm, Industrial Loft).
export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[45vh] min-h-[340px] w-full overflow-hidden bg-[#F7F7F5]">
        <Image
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=85"
          alt="Koleksi furniture Efendy Furniture"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-10 text-white">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white mb-3"
          >
            <ArrowLeft size={15} /> Kembali belanja
          </Link>
          <h1 className="font-serif font-medium text-[36px] sm:text-[54px] tracking-tight">
            Koleksi gaya rumah
          </h1>
          <p className="text-[16px] text-white/85 max-w-xl mt-2">
            Empat tema yang paling sering dipilih pelanggan. Pilih yang paling kamu banget,
            langsung isi seisi rumah.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        {KOLEKSI_TEMA.map((koleksi) => {
          const styleName =
            koleksi.nama === "Rumah Minimalis"
              ? "Minimalis"
              : koleksi.nama === "Industrial Loft"
                ? "Industrial"
                : koleksi.nama === "Japandi Calm"
                  ? "Japandi"
                  : "Scandinavian Warm";
          const items = PRODUCTS.filter((p) => p.style === styleName).slice(0, 4);
          return (
            <section key={koleksi.id} aria-label={`Koleksi ${koleksi.nama}`}>
              <div className="flex items-end justify-between gap-4 mb-6 pb-4 border-b border-[#E8E6E1]">
                <div>
                  <h2 className="font-serif font-medium text-[28px] tracking-tight">{koleksi.nama}</h2>
                  <p className="text-[15px] text-[#6B6B6B] mt-1">{koleksi.deskripsi}</p>
                </div>
                <Link
                  href={`/shop?style=${encodeURIComponent(styleName)}`}
                  className="shrink-0 text-[15px] font-medium underline underline-offset-4 decoration-[#C2410C] decoration-2"
                >
                  Lihat semua
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
