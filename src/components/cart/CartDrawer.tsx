"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag, Heart } from "lucide-react";
import { formatIDR } from "@/lib/utils";
import {
  CART_OPEN_EVENT,
  getCart,
  getWishlistIds,
  toggleWishlistId,
  updateCartQuantity,
  removeFromCart,
  CART_EVENT,
} from "@/lib/store";
import { PRODUCTS } from "@/data/products";
import type { CartItem } from "@/types";

interface CartDrawerProps {
  forceOpenSignal?: number;
}

export default function CartDrawer({ forceOpenSignal }: CartDrawerProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const sync = () => setItems(getCart());
    sync();
    window.addEventListener(CART_EVENT, sync);
    window.addEventListener("storage", sync);
    const openDrawer = () => {
      sync();
      setOpen(true);
    };
    window.addEventListener(CART_OPEN_EVENT, openDrawer);
    return () => {
      window.removeEventListener(CART_EVENT, sync);
      window.removeEventListener("storage", sync);
      window.removeEventListener(CART_OPEN_EVENT, openDrawer);
    };
  }, []);

  useEffect(() => {
    if (forceOpenSignal) setOpen(true);
  }, [forceOpenSignal]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open ]);

  if (!open) return null;

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const moveToWishlist = (item: CartItem) => {
    const ids = getWishlistIds();
    if (!ids.includes(item.productId)) toggleWishlistId(item.productId);
  };

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        onClick={() => setOpen(false)}
      />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-[#F7F5F0] border-l border-[#E5E1DB] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E1DB]">
          <h2 className="font-serif text-2xl text-[#20201E]">
            Your Cart{" "}
            <span className="text-sm font-sans text-[#817A71]">
              ({items.reduce((s, i) => s + i.quantity, 0)})
            </span>
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-white rounded-full transition"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-14 h-14 bg-white border border-[#E5E1DB] rounded-full flex items-center justify-center text-[#817A71] mb-4">
                <ShoppingBag size={24} />
              </div>
              <p className="font-serif text-xl text-[#20201E]">Your bag is empty</p>
              <p className="text-sm text-[#817A71] mt-1 mb-6">
                Discover pieces designed for slow living.
              </p>
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="px-6 py-3 bg-[#20201E] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#A88968] transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            items.map((item) => {
              const product = PRODUCTS.find((p) => p.id === item.productId);
              const maxQty = product?.stock ?? item.stock;
              return (
                <div key={item.id} className="flex gap-4 bg-white border border-[#E5E1DB]/70 rounded-sm p-3">
                  <Link
                    href={`/product/${item.slug}`}
                    onClick={() => setOpen(false)}
                    className="relative w-20 h-24 shrink-0 rounded-sm overflow-hidden bg-[#EAE6DF]"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-widest text-[#817A71]">
                          {item.category}
                        </p>
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={() => setOpen(false)}
                          className="font-serif text-base text-[#20201E] leading-tight line-clamp-1 hover:text-[#A88968]"
                        >
                          {item.name}
                        </Link>
                        <p className="text-[11px] text-[#817A71] mt-0.5">
                          {item.selectedColor}
                          {item.selectedSize ? ` • ${item.selectedSize}` : ""}
                        </p>
                      </div>
                      <button
                        onClick={() => setItems(removeFromCart(item.id))}
                        className="p-1.5 text-stone-400 hover:text-rose-600 transition"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="inline-flex items-center border border-[#E5E1DB] rounded-sm bg-[#F7F5F0]">
                        <button
                          onClick={() => setItems(updateCartQuantity(item.id, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                          className="px-2.5 py-1 text-stone-600 hover:text-black disabled:opacity-40"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="px-2 text-xs font-semibold min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => setItems(updateCartQuantity(item.id, item.quantity + 1))}
                          disabled={item.quantity >= maxQty}
                          className="px-2.5 py-1 text-stone-600 hover:text-black disabled:opacity-40"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-[#20201E]">
                        {formatIDR(item.price * item.quantity)}
                      </span>
                    </div>
                    <button
                      onClick={() => moveToWishlist(item)}
                      className="mt-1.5 text-[11px] text-[#817A71] hover:text-[#A88968] inline-flex items-center gap-1"
                    >
                      <Heart size={12} /> Move to wishlist
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#E5E1DB] px-6 py-5 space-y-4 bg-white/60">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#817A71] uppercase tracking-wider text-xs font-semibold">
                Subtotal
              </span>
              <span className="font-semibold text-[#20201E]">{formatIDR(subtotal)}</span>
            </div>
            <p className="text-[11px] text-[#817A71]">
              Shipping & taxes calculated at checkout.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="py-3 text-center border border-[#20201E] text-[#20201E] text-xs font-semibold uppercase tracking-widest hover:bg-[#20201E] hover:text-white transition-colors"
              >
                View Cart
              </Link>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="py-3 text-center bg-[#20201E] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#A88968] transition-colors"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
