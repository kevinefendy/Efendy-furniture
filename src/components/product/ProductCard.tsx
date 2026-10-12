"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { formatIDR } from "@/lib/utils";
import { addToCart as addToCartStore, openCartDrawer } from "@/lib/store";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

// Card produk retail: foto bg putih/cream, badge kiri atas, wishlist kanan atas,
// nama Indonesia + material singkat + harga (diskon strikethrough).
// Hover: foto zoom 1.03, tombol "Tambah ke Keranjang" muncul. Tanpa shadow.
export default function ProductCard({
  product,
  onQuickView,
  isWishlisted = false,
  onToggleWishlist,
}: ProductCardProps) {
  const [bouncing, setBouncing] = useState(false);
  const diskon = product.originalPrice && product.originalPrice > product.price;
  const persen = diskon
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0;

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCartStore(product, product.colors[0]?.name ?? "Default", product.sizes?.[0], 1);
    setBouncing(true);
    setTimeout(() => setBouncing(false), 500);
    openCartDrawer();
  };

  return (
    <div className="group relative flex flex-col bg-white border border-[#E8E6E1] rounded-[8px] overflow-hidden hover:border-[#C2410C] transition-colors">
      {/* Foto: square biar card pendek dan ringan di-scroll */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F7F7F5]">
        <Link
          href={`/product/${product.slug}`}
          className="block w-full h-full"
          aria-label={`Lihat ${product.name}`}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-[400ms] group-hover:scale-[1.03]"
          />
        </Link>

        {/* Badge kiri atas: hanya Sale / New / Best Seller, aksen terracotta */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {diskon && (
            <span className="bg-[#C2410C] text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
              -{persen}%
            </span>
          )}
          {!diskon && product.isNewArrival && (
            <span className="bg-[#1A1A1A] text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
              New
            </span>
          )}
          {product.bestSeller && (
            <span className="bg-white border border-[#E8E6E1] text-[#1A1A1A] text-[11px] font-medium px-2 py-0.5 rounded-full">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist kanan atas */}
        <button
          onClick={() => onToggleWishlist?.(product)}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isWishlisted
              ? "bg-[#C2410C] text-white"
              : "bg-white/90 text-[#1A1A1A] hover:text-[#C2410C]"
          }`}
          aria-label={isWishlisted ? "Hapus dari wishlist" : "Simpan ke wishlist"}
          aria-pressed={isWishlisted}
        >
          <Heart size={15} className={isWishlisted ? "fill-current" : ""} />
        </button>

        {/* Tombol tambah muncul saat hover (desktop) */}
        <div className="absolute inset-x-2 bottom-2 hidden sm:block opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[400ms]">
          <button
            onClick={quickAdd}
            className={`w-full py-2 rounded-[8px] bg-[#1A1A1A] hover:bg-[#C2410C] text-white text-[13px] font-medium flex items-center justify-center gap-1.5 transition-colors ${
              bouncing ? "scale-95" : ""
            }`}
          >
            <ShoppingBag size={14} /> Tambah ke Keranjang
          </button>
        </div>
      </div>

      {/* Info: ringkas biar card pendek */}
      <div className="p-3 flex flex-col gap-0.5 flex-1">
        <p className="text-xs uppercase tracking-widest text-[#6B6B6B]">{product.category}</p>
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-[15px] font-medium leading-snug text-[#1A1A1A] hover:text-[#C2410C] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-[13px] text-[#6B6B6B] truncate">{product.material}</p>
        <div className="mt-auto pt-1.5 flex items-baseline gap-1.5 flex-wrap">
          <span className={`price text-[15px] font-semibold ${diskon ? "text-[#C2410C]" : "text-[#1A1A1A]"}`}>
            {formatIDR(product.price)}
          </span>
          {diskon && (
            <span className="price text-[13px] text-[#6B6B6B] line-through">
              {formatIDR(product.originalPrice!)}
            </span>
          )}
        </div>
        {/* Tombol mobile (selalu terlihat) */}
        <button
          onClick={quickAdd}
          className="sm:hidden mt-2 w-full py-2 rounded-[8px] border border-[#E8E6E1] text-[13px] font-medium hover:border-[#C2410C] hover:text-[#C2410C] transition-colors"
        >
          + Keranjang
        </button>
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="mt-1 text-[13px] text-[#6B6B6B] underline underline-offset-4 hover:text-[#C2410C] text-left transition-colors"
          >
            Lihat cepat
          </button>
        )}
      </div>
    </div>
  );
}
