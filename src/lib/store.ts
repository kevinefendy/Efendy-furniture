"use client";

import { useCallback, useEffect, useState } from "react";
import type { CartItem, Product } from "@/types";

export const CART_KEY = "efendy_cart";
export const WISHLIST_KEY = "efendy_wishlist";
export const CART_EVENT = "efendy:cart-updated";
export const WISHLIST_EVENT = "efendy:wishlist-updated";

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown, eventName: string) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(eventName));
  // Also fire storage for cross-tab sync listeners
  window.dispatchEvent(new Event("storage"));
}

// ---------- Cart ----------

export function getCart(): CartItem[] {
  return readJSON<CartItem[]>(CART_KEY, []);
}

export function addToCart(
  product: Product,
  color: string,
  size: string | undefined,
  quantity: number
): CartItem[] {
  const cart = getCart();
  const id = `${product.id}-${color}-${size || "default"}`;
  const idx = cart.findIndex((i) => i.id === id);
  if (idx > -1) {
    const next = [...cart];
    next[idx] = {
      ...next[idx],
      quantity: Math.min(next[idx].stock, next[idx].quantity + quantity),
    };
    writeJSON(CART_KEY, next, CART_EVENT);
    return next;
  }
  const next = [
    ...cart,
    {
      id,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      category: product.category,
      price: product.price,
      image: product.images[0],
      selectedColor: color,
      selectedSize: size,
      quantity,
      stock: product.stock,
    },
  ];
  writeJSON(CART_KEY, next, CART_EVENT);
  return next;
}

export function getCartCount(): number {
  return getCart().reduce((sum, i) => sum + i.quantity, 0);
}

export function useCartCount(): number {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const sync = () => setCount(getCartCount());
    sync();
    window.addEventListener(CART_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CART_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return count;
}

// ---------- Wishlist ----------

export function getWishlistIds(): string[] {
  return readJSON<string[]>(WISHLIST_KEY, []);
}

export function toggleWishlistId(productId: string): string[] {
  const ids = getWishlistIds();
  const next = ids.includes(productId)
    ? ids.filter((id) => id !== productId)
    : [...ids, productId];
  writeJSON(WISHLIST_KEY, next, WISHLIST_EVENT);
  return next;
}

export function isWishlisted(productId: string): boolean {
  return getWishlistIds().includes(productId);
}

export function useWishlistIds(): {
  ids: string[];
  toggle: (productId: string) => void;
} {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    const sync = () => setIds(getWishlistIds());
    sync();
    window.addEventListener(WISHLIST_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(WISHLIST_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  const toggle = useCallback((productId: string) => {
    setIds(toggleWishlistId(productId));
  }, []);
  return { ids, toggle };
}
