import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { ArrowLeft } from "lucide-react";

export default function CollectionsPage() {
  const naraProducts = PRODUCTS.filter((p) => p.collectionName === "Nara");

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Hero Banner */}
      <div className="relative h-[55vh] min-h-[400px] w-full bg-stone-900 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=2000&q=85"
          alt="The Nara Collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
        <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 text-white">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-300 hover:text-white mb-4"
          >
            <ArrowLeft size={14} /> Back to Catalog
          </Link>
          <span className="text-xs uppercase tracking-[0.3em] text-[#A88968] font-bold">
            Capsule Series
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-light tracking-tight mt-1">
            The Nara Collection
          </h1>
          <p className="text-sm sm:text-base text-stone-300 max-w-lg mt-2 font-light">
            Warm wood. Soft curves. Designed for slow living. Each piece is an exploration of Japanese
            quietude and honest Indonesian craftsmanship.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E1DB]">
          <h2 className="font-serif text-2xl text-[#20201E]">Collection Pieces</h2>
          <span className="text-xs text-[#817A71] uppercase tracking-wider">
            {naraProducts.length} Items Available
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {naraProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
