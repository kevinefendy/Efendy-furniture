"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import ProductGallery from "@/components/product/ProductGallery";
import ProductCard from "@/components/product/ProductCard";
import QuickViewModal from "@/components/product/QuickViewModal";
import { formatIDR } from "@/lib/utils";
import {
  addToCart as addToCartStore,
  getWishlistIds,
  toggleWishlistId,
  openCartDrawer,
  WISHLIST_EVENT,
} from "@/lib/store";
import type { Product } from "@/types";
import {
  Star,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  ShoppingBag,
  ChevronRight,
  Bell,
} from "lucide-react";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name);
  const [selectedSize, setSelectedSize] = useState(
    product.sizes ? product.sizes[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "dimensions" | "care">("details");
  const [addedToast, setAddedToast] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySent, setNotifySent] = useState(false);
  const [notifyError, setNotifyError] = useState("");

  useEffect(() => {
    const sync = () => setWishlistIds(getWishlistIds());
    sync();
    window.addEventListener(WISHLIST_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(WISHLIST_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  // Reset variant selection when navigating between products
  useEffect(() => {
    setSelectedColor(product.colors[0]?.name);
    setSelectedSize(product.sizes ? product.sizes[0] : undefined);
    setQuantity(1);
    setNotifySent(false);
    setNotifyEmail("");
    setNotifyError("");
  }, [product]);

  const isWishlisted = wishlistIds.includes(product.id);
  const outOfStock = product.stock === 0;

  // Related products from same category or room
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.room === product.room)
  ).slice(0, 4);

  const handleAddToCart = () => {
    if (outOfStock) return;
    addToCartStore(product, selectedColor || product.colors[0]?.name, selectedSize, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
    openCartDrawer();
  };

  const handleQuickAdd = (p: Product, color: string, size?: string, qty = 1) => {
    addToCartStore(p, color, size, qty);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
    openCartDrawer();
  };

  const toggleWishlist = (id: string) => {
    setWishlistIds(toggleWishlistId(id));
  };

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(notifyEmail.trim())) {
      setNotifyError("Please enter a valid email address.");
      return;
    }
    setNotifyError("");
    setNotifySent(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Toast Notification */}
      {addedToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#20201E] text-white px-5 py-3 rounded-sm shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Check size={14} />
          </div>
          <div className="text-xs">
            <p className="font-semibold">✓ {product.name} added to cart</p>
            <p className="text-stone-300">
              {selectedColor} {selectedSize ? `• ${selectedSize}` : ""} (Qty: {quantity})
            </p>
          </div>
          <Link
            href="/cart"
            className="ml-2 text-xs text-[#6B6B6B] font-bold uppercase tracking-wider hover:underline"
          >
            View Bag
          </Link>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-[#817A71] uppercase tracking-wider font-medium"
        >
          <Link href="/" className="hover:text-[#20201E]">
            Home
          </Link>
          <ChevronRight size={12} aria-hidden />
          <Link href="/shop" className="hover:text-[#20201E]">
            Shop
          </Link>
          <ChevronRight size={12} aria-hidden />
          <Link href={`/shop?category=${product.category}`} className="hover:text-[#20201E]">
            {product.category}
          </Link>
          <ChevronRight size={12} aria-hidden />
          <span aria-current="page" className="text-[#20201E] truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right: Product Info & Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-[#817A71] mb-1.5 uppercase tracking-widest font-semibold">
                <span>{product.category}</span>
                <span className="text-[#6B6B6B]">{product.style} Design</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#20201E] tracking-tight font-medium">
                {product.name}
              </h1>

              {/* Price & Rating */}
              <div className="flex items-center justify-between mt-3 pb-5 border-b border-[#E5E1DB]">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-semibold text-[#20201E]">
                    {formatIDR(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      {formatIDR(product.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex items-center text-amber-500">
                    <Star size={14} className="fill-amber-500" aria-hidden />
                  </div>
                  <span className="font-semibold text-[#20201E]">{product.rating}</span>
                  <span className="text-[#817A71]">({product.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[#817A71] leading-relaxed font-light">
              {product.description}
            </p>

            {/* Color Variant */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2.5">
                <span
                  id="pdp-color-label"
                  className="text-xs uppercase tracking-wider font-semibold text-[#20201E]"
                >
                  Color: <span className="font-normal text-stone-600">{selectedColor}</span>
                </span>
              </div>
              <div className="flex items-center gap-3" role="radiogroup" aria-labelledby="pdp-color-label">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    role="radio"
                    aria-checked={selectedColor === c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`group relative flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all p-0.5 focus-visible:outline-2 focus-visible:outline-[#6B6B6B] ${
                      selectedColor === c.name
                        ? "border-[#20201E] scale-110"
                        : "border-transparent hover:border-stone-300"
                    }`}
                    aria-label={`Select color ${c.name}`}
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

            {/* Size Variant (if any) */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2.5">
                  <span
                    id="pdp-size-label"
                    className="text-xs uppercase tracking-wider font-semibold text-[#20201E]"
                  >
                    Size Dimension: <span className="font-normal text-stone-600">{selectedSize}</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-labelledby="pdp-size-label">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      role="radio"
                      aria-checked={selectedSize === s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 text-xs uppercase tracking-wider font-medium border rounded-sm transition-all focus-visible:outline-2 focus-visible:outline-[#6B6B6B] ${
                        selectedSize === s
                          ? "bg-[#20201E] text-white border-[#20201E] shadow-sm"
                          : "bg-white text-stone-700 border-[#E5E1DB] hover:border-stone-400"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Availability / Notify Me */}
            <div className="pt-2">
              {outOfStock ? (
                <div className="bg-white border border-[#E5E1DB] rounded-sm p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-rose-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" aria-hidden />
                    <span className="font-semibold uppercase tracking-wider">
                      Out of Stock — Notify Me
                    </span>
                  </div>
                  {notifySent ? (
                    <p role="status" className="text-xs text-emerald-700 flex items-center gap-1.5">
                      <Check size={14} /> You&apos;re on the list. We&apos;ll email you when it&apos;s back.
                    </p>
                  ) : (
                    <form onSubmit={handleNotify} className="space-y-2" noValidate>
                      <label htmlFor="notify-email" className="text-xs text-[#817A71]">
                        Get notified when {product.name} is back in stock.
                      </label>
                      <div className="flex gap-2">
                        <input
                          id="notify-email"
                          type="email"
                          value={notifyEmail}
                          onChange={(e) => setNotifyEmail(e.target.value)}
                          placeholder="you@email.com"
                          aria-invalid={!!notifyError}
                          aria-describedby={notifyError ? "notify-error" : undefined}
                          className="flex-1 bg-[#F7F5F0] border border-[#E5E1DB] rounded-sm px-3 py-2.5 text-sm focus:outline-none focus:border-[#6B6B6B]"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2.5 bg-[#20201E] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#6B6B6B] transition-colors flex items-center gap-1.5"
                        >
                          <Bell size={14} /> Notify Me
                        </button>
                      </div>
                      {notifyError && (
                        <p id="notify-error" role="alert" className="text-xs text-rose-600">
                          {notifyError}
                        </p>
                      )}
                    </form>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
                  <span className="font-medium text-emerald-800">
                    In Stock ({product.stock} available for immediate delivery)
                  </span>
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart Section */}
            <div className="pt-4 border-t border-[#E5E1DB] space-y-4">
              <div className="flex items-center gap-4">
                {/* Quantity input */}
                <div className="inline-flex items-center border border-[#E5E1DB] bg-white rounded-sm h-12">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 h-full text-stone-600 hover:text-black hover:bg-stone-100 transition-colors disabled:opacity-40"
                    disabled={quantity <= 1 || outOfStock}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 text-sm font-semibold select-none" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 h-full text-stone-600 hover:text-black hover:bg-stone-100 transition-colors disabled:opacity-40"
                    disabled={quantity >= product.stock || outOfStock}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAddToCart}
                  disabled={outOfStock}
                  className="flex-1 min-w-0 h-12 bg-[#20201E] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#6B6B6B] transition-all flex items-center justify-center gap-2 shadow-md disabled:bg-stone-400 disabled:cursor-not-allowed px-2"
                >
                  <ShoppingBag size={16} className="shrink-0" aria-hidden />
                  {outOfStock ? (
                    "Out of Stock"
                  ) : (
                    <span className="truncate">
                      Add To Cart
                      <span className="hidden min-[420px]:inline">
                        {" "}• {formatIDR(product.price * quantity)}
                      </span>
                    </span>
                  )}
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-pressed={isWishlisted}
                  className={`w-12 h-12 border border-[#E5E1DB] rounded-sm flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#6B6B6B] ${
                    isWishlisted
                      ? "bg-[#6B6B6B] text-white border-[#6B6B6B]"
                      : "bg-white text-[#20201E] hover:border-stone-400"
                  }`}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart size={18} className={isWishlisted ? "fill-current" : ""} />
                </button>
              </div>
              {product.stock <= 5 && !outOfStock && (
                <p className="text-xs text-[#6B6B6B] font-medium">
                  Only {product.stock} left — order soon.
                </p>
              )}
            </div>

            {/* Value Highlights */}
            <div className="pt-4 grid grid-cols-3 gap-3 text-center border-t border-[#E5E1DB]">
              <div className="p-3 bg-white/70 rounded-sm border border-[#E5E1DB]/60">
                <Truck size={18} className="mx-auto text-[#6B6B6B] mb-1" aria-hidden />
                <span className="block text-[11px] font-semibold text-[#20201E]">White Glove</span>
                <span className="block text-[10px] text-stone-500">Scheduled arrival</span>
              </div>
              <div className="p-3 bg-white/70 rounded-sm border border-[#E5E1DB]/60">
                <ShieldCheck size={18} className="mx-auto text-[#6B6B6B] mb-1" aria-hidden />
                <span className="block text-[11px] font-semibold text-[#20201E]">5-Year Warranty</span>
                <span className="block text-[10px] text-stone-500">Solid timber frame</span>
              </div>
              <div className="p-3 bg-white/70 rounded-sm border border-[#E5E1DB]/60">
                <RotateCcw size={18} className="mx-auto text-[#6B6B6B] mb-1" aria-hidden />
                <span className="block text-[11px] font-semibold text-[#20201E]">30-Day Trial</span>
                <span className="block text-[10px] text-stone-500">Hassle-free returns</span>
              </div>
            </div>

            {/* Tabs for specs */}
            <div className="pt-6 border-t border-[#E5E1DB]">
              <div
                className="flex border-b border-[#E5E1DB] text-xs uppercase tracking-wider font-semibold"
                role="tablist"
                aria-label="Product information"
              >
                {(
                  [
                    { id: "details", label: "Material & Craft" },
                    { id: "dimensions", label: "Dimensions" },
                    { id: "care", label: "Care Guide" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-2.5 mr-6 transition-colors focus-visible:outline-2 focus-visible:outline-[#6B6B6B] ${
                      activeTab === tab.id
                        ? "border-b-2 border-[#20201E] text-[#20201E]"
                        : "text-stone-400 hover:text-stone-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="py-4 text-xs sm:text-sm text-[#817A71] leading-relaxed" role="tabpanel">
                {activeTab === "details" && (
                  <div className="space-y-2">
                    <p>
                      <strong>Primary Materials:</strong> {product.material}
                    </p>
                    <p>
                      <strong>Origin:</strong> Handcrafted in Jepara, Central Java & West Java.
                    </p>
                    <p>
                      <strong>Certifications:</strong> 100% SVLK / FSC Certified Indonesian Timber.
                    </p>
                  </div>
                )}
                {activeTab === "dimensions" && (
                  <div className="space-y-1.5">
                    <p>
                      <strong>Width:</strong> {product.dimensions.width} {product.dimensions.unit}
                    </p>
                    <p>
                      <strong>Depth:</strong> {product.dimensions.depth} {product.dimensions.unit}
                    </p>
                    <p>
                      <strong>Height:</strong> {product.dimensions.height} {product.dimensions.unit}
                    </p>
                    <p className="text-xs text-stone-400 pt-1">
                      *Please measure hallway clearances and doorways prior to delivery.
                    </p>
                  </div>
                )}
                {activeTab === "care" && (
                  <div className="space-y-1.5">
                    <p>• Vacuum regularly using a soft brush upholstery attachment.</p>
                    <p>• Blot spills immediately with a clean, dry, lint-free cloth.</p>
                    <p>• Keep away from direct sustained sunlight to prevent natural fading.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-28 pt-16 border-t border-[#E5E1DB]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#6B6B6B] font-bold block mb-1">
                  Complete The Look
                </span>
                <h2 className="font-serif text-3xl text-[#20201E]">Pairs Well With</h2>
              </div>
              <Link
                href="/shop"
                className="text-xs uppercase tracking-wider font-semibold text-[#6B6B6B] hover:underline"
              >
                View Catalog →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={setQuickViewProduct}
                  isWishlisted={wishlistIds.includes(p.id)}
                  onToggleWishlist={(prod) => toggleWishlist(prod.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick view from related */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleQuickAdd}
      />
    </div>
  );
}
