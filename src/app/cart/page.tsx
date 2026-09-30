"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, Heart, ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { formatIDR } from "@/lib/utils";
import { useCart, getWishlistIds, toggleWishlistId } from "@/lib/store";
import { PRODUCTS } from "@/data/products";
import { SHIPPING_METHODS, getEstimatedDeliveryDate } from "@/data/checkout";
import { useState } from "react";

const FREE_SHIPPING_THRESHOLD = 10000000;

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clear } = useCart();
  const [cleared, setCleared] = useState(false);

  const progress = Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD);

  const handleMoveToWishlist = (productId: string) => {
    if (!getWishlistIds().includes(productId)) toggleWishlistId(productId);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-16 h-16 bg-white border border-[#E5E1DB] rounded-full flex items-center justify-center text-[#817A71] mx-auto mb-5">
          <ShoppingBag size={28} />
        </div>
        <p className="text-xs uppercase tracking-widest text-[#6B6B6B] font-semibold mb-2">
          {cleared ? "Cart cleared" : "Empty bag"}
        </p>
        <h1 className="font-serif text-4xl text-[#20201E]">Your Cart</h1>
        <p className="text-sm text-[#817A71] mt-3 mb-8">
          Your bag is currently empty. Explore our curated furniture collection.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shop"
            className="px-8 py-3.5 bg-[#20201E] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#6B6B6B] transition-colors inline-flex items-center justify-center gap-2"
          >
            <ArrowLeft size={14} /> Continue Shopping
          </Link>
          <Link
            href="/wishlist"
            className="px-8 py-3.5 border border-[#20201E] text-[#20201E] text-xs font-semibold uppercase tracking-widest hover:bg-[#20201E] hover:text-white transition-colors"
          >
            View Wishlist
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <span className="text-xs uppercase tracking-widest text-[#6B6B6B] font-semibold block mb-2">
        Review your pieces
      </span>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
        <h1 className="font-serif text-3xl sm:text-5xl text-[#20201E] tracking-tight">
          Your Cart ({items.reduce((s, i) => s + i.quantity, 0)})
        </h1>
        <button
          onClick={() => {
            clear();
            setCleared(true);
          }}
          className="text-xs text-[#817A71] hover:text-rose-600 underline underline-offset-4 self-start sm:self-auto"
        >
          Clear cart
        </button>
      </div>

      {/* Free shipping progress */}
      <div className="bg-white border border-[#E5E1DB] rounded-sm px-5 py-4 mb-8">
        {subtotal >= FREE_SHIPPING_THRESHOLD ? (
          <p className="text-xs sm:text-sm text-emerald-700 font-medium">
            You&apos;ve unlocked <strong>free white-glove delivery</strong> for this order.
          </p>
        ) : (
          <p className="text-xs sm:text-sm text-[#817A71]">
            Add <strong className="text-[#20201E]">{formatIDR(FREE_SHIPPING_THRESHOLD - subtotal)}</strong> more
            to unlock free white-glove delivery.
          </p>
        )}
        <div
          className="mt-2.5 h-1.5 bg-[#EAE6DF] rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progress to free shipping"
        >
          <div
            className="h-full bg-[#6B6B6B] transition-all duration-500"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Items list */}
        <ul className="lg:col-span-8 space-y-4">
          {items.map((item) => {
            const product = PRODUCTS.find((p) => p.id === item.productId);
            const maxQty = product?.stock ?? item.stock;
            return (
              <li
                key={item.id}
                className="bg-white border border-[#E5E1DB]/70 rounded-sm p-4 sm:p-5 flex gap-4 sm:gap-5"
              >
                <Link
                  href={`/product/${item.slug}`}
                  className="relative w-24 h-28 sm:w-32 sm:h-36 shrink-0 rounded-sm overflow-hidden bg-[#EAE6DF]"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 96px, 128px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-[#817A71]">
                        {item.category}
                      </p>
                      <Link
                        href={`/product/${item.slug}`}
                        className="font-serif text-lg sm:text-xl text-[#20201E] hover:text-[#6B6B6B] leading-snug line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-[#817A71] mt-1">
                        Color: <span className="text-[#20201E] font-medium">{item.selectedColor}</span>
                        {item.selectedSize && (
                          <>
                            {" "}• Size:{" "}
                            <span className="text-[#20201E] font-medium">{item.selectedSize}</span>
                          </>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition shrink-0"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 mt-auto pt-4">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center border border-[#E5E1DB] rounded-sm bg-[#F7F5F0] h-10">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-3.5 h-full hover:bg-white transition disabled:opacity-40"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm font-semibold min-w-8 text-center" aria-live="polite">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= maxQty}
                          className="px-3.5 h-full hover:bg-white transition disabled:opacity-40"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => handleMoveToWishlist(item.productId)}
                        className="text-xs text-[#817A71] hover:text-[#6B6B6B] inline-flex items-center gap-1.5 underline underline-offset-4"
                      >
                        <Heart size={13} /> Wishlist
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-base sm:text-lg font-semibold text-[#20201E]">
                        {formatIDR(item.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-[11px] text-[#817A71]">
                          {formatIDR(item.price)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white border border-[#E5E1DB] rounded-sm p-6 lg:sticky lg:top-28 space-y-5">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#20201E]">
              Order Summary
            </h2>
            <dl className="space-y-2.5 text-sm">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between gap-3 text-[#817A71]">
                  <dt className="truncate">
                    {i.name} <span className="text-stone-400">× {i.quantity}</span>
                  </dt>
                  <dd className="text-[#20201E] shrink-0">{formatIDR(i.price * i.quantity)}</dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-[#E5E1DB] pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-[#817A71]">
                <span>Subtotal</span>
                <span className="text-[#20201E] font-medium">{formatIDR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#817A71]">
                <span>Shipping</span>
                <span className="text-right">
                  from {formatIDR(SHIPPING_METHODS[0].price)}
                  <span className="block text-[11px]">
                    Regular • arrives {getEstimatedDeliveryDate("regular")}
                  </span>
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2">
                <span className="text-xs font-semibold uppercase tracking-widest">Total</span>
                <span className="text-xl font-semibold text-[#20201E]">{formatIDR(subtotal)}</span>
              </div>
            </div>
            <div className="space-y-3 pt-1">
              <Link
                href="/checkout"
                className="w-full py-3.5 bg-[#20201E] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#6B6B6B] transition-colors flex items-center justify-center gap-2"
              >
                Checkout <ArrowRight size={14} />
              </Link>
              <Link
                href="/shop"
                className="w-full py-3.5 border border-[#20201E] text-[#20201E] text-xs font-semibold uppercase tracking-widest hover:bg-[#20201E] hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={14} /> Continue Shopping
              </Link>
            </div>
            <p className="text-[11px] text-[#817A71] text-center">
              Secure checkout • 30-day returns • 5-year warranty
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
