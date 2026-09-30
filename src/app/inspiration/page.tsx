import Image from "next/image";
import Link from "next/link";
import { INSPIRATION_ARTICLES, PRODUCTS } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { ArrowLeft } from "lucide-react";

export default function InspirationPage() {
  const featuredLivingPieces = PRODUCTS.filter((p) => p.room === "living-room").slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#817A71] hover:text-[#20201E] mb-6"
        >
          <ArrowLeft size={14} /> Back to Shop
        </Link>

        {/* Editorial Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#6B6B6B] font-bold block mb-2">
            The Journal
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#20201E] tracking-tight">
            Interior Inspiration
          </h1>
          <p className="mt-4 text-base text-[#817A71] font-light leading-relaxed">
            Thoughtful essays, interior styling advice, and practical guides to creating quiet,
            harmonious spaces that endure.
          </p>
        </div>

        {/* Articles List */}
        <div className="space-y-20">
          {INSPIRATION_ARTICLES.map((article, idx) => (
            <article
              key={article.id}
              id={article.slug}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#E5E1DB] pb-16 ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden rounded-sm bg-stone-300">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="lg:col-span-5 space-y-4 lg:px-4">
                <div className="flex items-center gap-3 text-xs text-[#817A71]">
                  <span className="uppercase tracking-widest font-semibold text-[#6B6B6B]">
                    {article.category}
                  </span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#20201E] leading-snug">
                  {article.title}
                </h2>
                <p className="text-sm text-[#817A71] leading-relaxed font-light">
                  {article.excerpt} When planning your space, prioritize pieces that communicate
                  serenity. Natural timber textures combined with quiet upholstery create an anchor
                  for the whole room.
                </p>
                <div className="pt-2">
                  <Link
                    href="/shop"
                    className="inline-block text-xs font-semibold uppercase tracking-widest text-[#20201E] hover:text-[#6B6B6B] border-b border-[#20201E] pb-1"
                  >
                    Shop Related Furniture →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Highlighted Pieces Section */}
        <div className="mt-20 pt-12 border-t border-[#E5E1DB]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-2xl text-[#20201E]">Featured in This Issue</h3>
            <Link href="/shop" className="text-xs uppercase tracking-widest text-[#6B6B6B] font-bold">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featuredLivingPieces.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
