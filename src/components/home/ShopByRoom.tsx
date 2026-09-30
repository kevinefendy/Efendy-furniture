import Link from "next/link";
import Image from "next/image";
import { ROOMS_DATA } from "@/data/products";
import { ArrowUpRight } from "lucide-react";

export default function ShopByRoom() {
  return (
    <section className="py-20 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#A88968] font-semibold block mb-2">
              Curated Spaces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#20201E] tracking-tight">
              Shop By Room
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-[#817A71] max-w-md">
            Discover tailored furniture configurations designed to bring harmony, warmth, and function
            to every corner of your home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROOMS_DATA.map((room) => (
            <Link
              key={room.id}
              href={`/rooms/${room.id}`}
              className="group relative block aspect-[3/4] overflow-hidden bg-stone-200 rounded-sm"
            >
              <Image
                src={room.image}
                alt={room.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />

              <div className="absolute inset-x-0 bottom-0 p-6 text-white flex items-end justify-between">
                <div>
                  <h3 className="font-serif text-2xl group-hover:text-[#F7F5F0] transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1 line-clamp-1">{room.description}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-[#A88968] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
