import Link from "next/link";
import Image from "next/image";
import { INSPIRATION_ARTICLES } from "@/data/products";
import { ArrowRight } from "lucide-react";

export default function InspirationSection() {
  return (
    <section className="py-24 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#A88968] font-semibold block mb-2">
              The Design Journal
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#20201E] tracking-tight">
              Interior Inspiration
            </h2>
          </div>
          <Link
            href="/inspiration"
            className="mt-4 sm:mt-0 text-xs font-semibold uppercase tracking-widest text-[#20201E] hover:text-[#A88968] transition-colors flex items-center gap-1 group"
          >
            Read All Stories
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INSPIRATION_ARTICLES.map((article) => (
            <Link
              key={article.id}
              href={`/inspiration#${article.slug}`}
              className="group flex flex-col bg-white border border-[#E5E1DB] overflow-hidden rounded-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-[#817A71] mb-2">
                    <span className="uppercase tracking-widest font-medium text-[#A88968]">
                      {article.category}
                    </span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl text-[#20201E] group-hover:text-[#A88968] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#817A71] line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5E1DB] flex items-center text-xs font-semibold uppercase tracking-widest text-[#20201E] group-hover:text-[#A88968] transition-colors">
                  <span>Read Story</span>
                  <ArrowRight size={13} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
