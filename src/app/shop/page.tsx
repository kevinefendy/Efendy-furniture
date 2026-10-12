"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import ProductGrid from "@/components/product/ProductGrid";
import QuickViewModal from "@/components/product/QuickViewModal";
import { addToCart as addToCartStore, useWishlistIds, openCartDrawer } from "@/lib/store";
import type { Product } from "@/types";
import ProductFilter, {
  FilterState,
  SortOption,
} from "@/components/product/ProductFilter";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { ProductCategory, ProductStyle } from "@/types";

function isSortOption(value: string | null): value is SortOption {
  return (
    value === "featured" ||
    value === "newest" ||
    value === "price-asc" ||
    value === "price-desc" ||
    value === "rating"
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCategory = searchParams.get("category") as ProductCategory | null;
  const initialStyle = searchParams.get("style") as ProductStyle | null;
  const dealSale = searchParams.get("deal") === "sale";

  const [filters, setFilters] = useState<FilterState>({
    categories: initialCategory ? [initialCategory] : [],
    priceRange: [],
    colors: [],
    styles: initialStyle ? [initialStyle] : [],
  });

  const [sortOption, setSortOption] = useState<SortOption>(() => {
    const s = searchParams.get("sort");
    return isSortOption(s) ? s : "featured";
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { ids: wishlistIds, toggle: toggleWishlist } = useWishlistIds();

  useEffect(() => {
    const cat = searchParams.get("category") as ProductCategory | null;
    const sty = searchParams.get("style") as ProductStyle | null;
    setFilters({
      categories: cat ? [cat] : [],
      priceRange: [],
      colors: [],
      styles: sty ? [sty] : [],
    });
    const s = searchParams.get("sort");
    setSortOption(isSortOption(s) ? s : "featured");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const resetFilters = () => {
    setFilters({ categories: [], priceRange: [], colors: [], styles: [] });
    router.push("/shop");
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];
    if (dealSale) {
      result = result.filter((p) => p.originalPrice && p.originalPrice > p.price);
    }
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.priceRange.length > 0) {
      result = result.filter((p) =>
        filters.priceRange.some((range) => {
          if (range === "under-1m") return p.price < 1000000;
          if (range === "1m-5m") return p.price >= 1000000 && p.price <= 5000000;
          if (range === "5m-10m") return p.price > 5000000 && p.price <= 10000000;
          if (range === "above-10m") return p.price > 10000000;
          return true;
        })
      );
    }
    if (filters.colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((col) =>
          filters.colors.some((filterCol) =>
            col.name.toLowerCase().includes(filterCol.toLowerCase())
          )
        )
      );
    }
    if (filters.styles.length > 0) {
      result = result.filter((p) => filters.styles.includes(p.style));
    }
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    return result;
  }, [filters, sortOption, dealSale]);

  const activePills = [
    ...(dealSale
      ? [{ key: "deal-sale", label: "Sale", remove: () => router.push("/shop") }]
      : []),
    ...filters.categories.map((c) => ({
      key: `cat-${c}`,
      label: c,
      remove: () =>
        setFilters((prev) => ({
          ...prev,
          categories: prev.categories.filter((item) => item !== c),
        })),
    })),
    ...filters.priceRange.map((r) => ({
      key: `price-${r}`,
      label:
        r === "under-1m"
          ? "< 1 Jt"
          : r === "1m-5m"
            ? "1 - 5 Jt"
            : r === "5m-10m"
              ? "5 - 10 Jt"
              : "> 10 Jt",
      remove: () =>
        setFilters((prev) => ({
          ...prev,
          priceRange: prev.priceRange.filter((item) => item !== r),
        })),
    })),
    ...filters.colors.map((col) => ({
      key: `color-${col}`,
      label: col,
      remove: () =>
        setFilters((prev) => ({
          ...prev,
          colors: prev.colors.filter((item) => item !== col),
        })),
    })),
    ...filters.styles.map((st) => ({
      key: `style-${st}`,
      label: st,
      remove: () =>
        setFilters((prev) => ({
          ...prev,
          styles: prev.styles.filter((item) => item !== st),
        })),
    })),
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="border-b border-[#E8E6E1] pb-8 mb-8">
          <span className="text-[13px] uppercase tracking-widest text-[#C2410C] font-semibold block mb-2">
            {dealSale ? "Diskon spesial" : "Kurasi Efendy Furniture"}
          </span>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <h1 className="font-serif font-medium text-[32px] sm:text-[44px] tracking-tight text-[#1A1A1A]">
              {dealSale ? "Lagi Sale" : "Belanja Semua Furniture"}
            </h1>
            <p className="text-sm text-[#6B6B6B]">
              Menampilkan {filteredAndSortedProducts.length} produk
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pb-6 mb-6 gap-4 border-b border-[#E8E6E1]">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-[#E8E6E1] rounded-[8px] text-sm font-medium"
          >
            <SlidersHorizontal size={15} />
            <span>Filter ({activePills.length})</span>
          </button>

          <div className="flex-1 flex flex-wrap items-center gap-2">
            {activePills.map((pill) => (
              <span
                key={pill.key}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E8E6E1] text-sm rounded-full"
              >
                <span>{pill.label}</span>
                <button
                  onClick={pill.remove}
                  className="text-[#6B6B6B] hover:text-[#1A1A1A]"
                  aria-label={`Hapus filter ${pill.label}`}
                >
                  <X size={13} />
                </button>
              </span>
            ))}
            {activePills.length > 0 && (
              <button
                onClick={resetFilters}
                className="text-sm text-[#C2410C] underline underline-offset-4 font-medium ml-2"
              >
                Hapus semua
              </button>
            )}
          </div>

          <div className="flex items-center self-end sm:self-auto gap-2">
            <label htmlFor="sortSelect" className="text-[13px] text-[#6B6B6B] uppercase tracking-wider font-medium">
              Urutkan:
            </label>
            <div className="relative">
              <select
                id="sortSelect"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="appearance-none bg-white border border-[#E8E6E1] text-sm font-medium py-2 pl-3 pr-8 rounded-[8px] focus:outline-none focus:border-[#C2410C] cursor-pointer"
              >
                <option value="featured">Unggulan</option>
                <option value="newest">Terbaru</option>
                <option value="price-asc">Harga: Rendah ke Tinggi</option>
                <option value="price-desc">Harga: Tinggi ke Rendah</option>
                <option value="rating">Paling Disukai</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B6B6B]"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-10">
          <ProductFilter
            filters={filters}
            onChangeFilters={setFilters}
            onResetFilters={resetFilters}
            isOpenMobile={mobileFilterOpen}
            onCloseMobile={() => setMobileFilterOpen(false)}
          />
          <div className="flex-1">
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-20 border border-[#E8E6E1] rounded-[8px]">
                <p className="font-serif text-2xl">Yah, nggak ketemu.</p>
                <p className="mt-2 text-[15px] text-[#6B6B6B]">
                  Coba longgarkan filternya atau cari kata lain.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-5 px-6 py-2.5 rounded-[8px] bg-[#C2410C] text-white text-sm font-medium"
                >
                  Lihat semua produk
                </button>
              </div>
            ) : (
              <ProductGrid
                products={filteredAndSortedProducts}
                onQuickView={setQuickViewProduct}
                wishlistIds={wishlistIds}
                onToggleWishlist={(p) => toggleWishlist(p.id)}
              />
            )}
          </div>
        </div>

        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={(p, color, size, qty) => {
            addToCartStore(p, color, size, qty || 1);
            openCartDrawer();
          }}
        />
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center">Memuat katalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
