import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, ROOMS_DATA } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import { ArrowLeft } from "lucide-react";

interface RoomPageProps {
  params: {
    room: string;
  };
}

export function generateStaticParams() {
  return ROOMS_DATA.map((room) => ({
    room: room.id,
  }));
}

export default function RoomDetailPage({ params }: RoomPageProps) {
  const room = ROOMS_DATA.find((r) => r.id === params.room);

  if (!room) {
    notFound();
  }

  const roomProducts = PRODUCTS.filter((p) => p.room === room.id);

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Room Hero */}
      <div className="relative h-[45vh] min-h-[350px] w-full bg-stone-900 overflow-hidden">
        <Image
          src={room.image}
          alt={room.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-10 text-white">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-stone-300 hover:text-white mb-3"
          >
            <ArrowLeft size={14} /> Shop All
          </Link>
          <span className="text-xs uppercase tracking-[0.3em] text-[#6B6B6B] font-bold">
            Curated Space
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light tracking-tight mt-1">
            {room.name}
          </h1>
          <p className="text-sm text-stone-300 max-w-lg mt-2">{room.description}</p>
        </div>
      </div>

      {/* Room navigation tabs */}
      <div className="border-b border-[#E5E1DB] bg-white sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6 overflow-x-auto py-3">
          {ROOMS_DATA.map((r) => (
            <Link
              key={r.id}
              href={`/rooms/${r.id}`}
              className={`text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-colors py-1 ${
                r.id === room.id
                  ? "text-[#6B6B6B] border-b-2 border-[#6B6B6B]"
                  : "text-stone-500 hover:text-[#20201E]"
              }`}
            >
              {r.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E1DB]">
          <h2 className="font-serif text-2xl text-[#20201E]">Furniture for {room.name}</h2>
          <span className="text-xs text-[#817A71] uppercase tracking-wider">
            {roomProducts.length} Items Found
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {roomProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
