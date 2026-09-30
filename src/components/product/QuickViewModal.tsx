"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatIDR } from "@/lib/utils";
import { addToCart as addToCartStore, openCartDrawer } from "@/lib/store";
import { X, Star, Check, ShoppingBag, ArrowRight } from "lucide-react";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart?: (product: Product, color: string, size?: string, quantity?: number) => void;
}

export default function QuickViewModal({
  product,
  onClose,
  onAddToCart,
}: QuickViewModalProps) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  // Reset selection every time a different product is opened
  useEffect(() => {
    setSelectedColor(product?.colors[0]?.name || "");
    setSelectedSize(product?.sizes ? product.sizes[0] : undefined);
    setQuantity(1);
    setAddedNotice(false);
  }, [product]);

  // ESC to close + lock scroll
  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  const handleAddToCart = () => {
    const color = selectedColor || product.colors[0]?.name;
    if (onAddToCart) {
      onAddToCart(product, color, selectedSize, quantity);
    } else {
      addToCartStore(product, color, selectedSize, quantity);
      openCartDrawer();
    }
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view of ${product.name}`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#F7F5F0] border border-[#E5E1DB] rounded-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 rounded-full text-stone-500 hover:text-[#20201E] hover:bg-white transition"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/5] md:aspect-auto w-full bg-stone-200">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[80vh]">
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#A88968] font-bold">
                  {product.category} • {product.style}
                </span>
                <h3 className="font-serif text-2xl text-[#20201E] font-medium leading-tight mt-1">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-semibold text-[#20201E]">
                    {formatIDR(product.price)}
                  </span>
                  <div className="flex items-center text-xs text-amber-600 gap-1 pl-2 border-l border-stone-300">
                    <Star size={13} className="fill-amber-500 text-amber-500" />
                    <span className="font-medium text-stone-800">{product.rating}</span>
                    <span className="text-stone-400">({product.reviewCount})</span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#817A71] line-clamp-3 leading-relaxed">
                {product.description}
              </p>

              {/* Color Swatches */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#20201E] block mb-2">
                  Color: <span className="font-normal text-stone-500">{selectedColor}</span>
                </span>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 ${
                        selectedColor === c.name
                          ? "border-[#20201E] scale-110"
                          : "border-transparent hover:border-stone-300"
                      }`}
                      title={c.name}
                    >
                      <span
                        className="block w-full h-full rounded-full border border-black/10"
                        style={{ backgroundColor: c.code }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector if available */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#20201E] block mb-2">
                    Size: <span className="font-normal text-stone-500">{selectedSize}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1 text-xs uppercase tracking-wider border rounded-xs transition-colors ${
                          selectedSize === s
                            ? "bg-[#20201E] text-white border-[#20201E]"
                            : "bg-white text-stone-700 border-[#E5E1DB] hover:border-stone-400"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#20201E] block mb-2">
                  Quantity
                </span>
                <div className="inline-flex items-center border border-[#E5E1DB] bg-white rounded-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-stone-600 hover:text-black hover:bg-stone-100"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-1.5 text-stone-600 hover:text-black hover:bg-stone-100"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-[#E5E1DB] mt-6 space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-[#20201E] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#A88968] transition-colors flex items-center justify-center gap-2"
              >
                {addedNotice ? (
                  <>
                    <Check size={16} className="text-emerald-400" />
                    Added to Bag!
                  </>
                ) : (
                  <>
                    <ShoppingBag size={15} />
                    Add To Cart • {formatIDR(product.price * quantity)}
                  </>
                )}
              </button>

              <div className="text-center">
                <Link
                  href={`/product/${product.slug}`}
                  onClick={onClose}
                  className="text-xs text-[#817A71] hover:text-[#20201E] hover:underline inline-flex items-center gap-1 font-medium"
                >
                  View Full Details <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
