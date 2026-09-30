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
  const dealSale = searchParams.get("deal") === "sale";

  const [filters, setFilters] = useState<FilterState>({
    categories: initialCategory ? [initialCategory] : [],
    priceRange: [],
    colors: [],
    styles: [],
  });

  const [sortOption, setSortOption] = useState<SortOption>(() => {
    const s = searchParams.get("sort");
    return isSortOption(s) ? s : "featured";
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { ids: wishlistIds, toggle: toggleWishlist } = useWishlistIds();

  // Re-sync when navigating between URLs like /shop?sort=rating or /shop?deal=sale
  useEffect(() => {
    const cat = searchParams.get("category") as ProductCategory | null;
    setFilters({
      categories: cat ? [cat] : [],
      priceRange: [],
      colors: [],
      styles: [],
    });
    const s = searchParams.get("sort");
    setSortOption(isSortOption(s) ? s : "featured");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const resetFilters = () => {
    setFilters({
      categories: [],
      priceRange: [],
      colors: [],
      styles: [],
    });
  };

  // Filter and Sort Pipeline
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 0. Sale deals
    if (dealSale) {
      result = result.filter((p) => p.originalPrice && p.originalPrice > p.price);
    }

    // 1. Categories
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // 2. Price Range
    if (filters.priceRange.length > 0) {
      result = result.filter((p) => {
        return filters.priceRange.some((range) => {
          if (range === "under-1m") return p.price < 1000000;
          if (range === "1m-5m") return p.price >= 1000000 && p.price <= 5000000;
          if (range === "5m-10m") return p.price > 5000000 && p.price <= 10000000;
          if (range === "above-10m") return p.price > 10000000;
          return true;
        });
      });
    }

    // 3. Colors
    if (filters.colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((col) =>
          filters.colors.some((filterCol) =>
            col.name.toLowerCase().includes(filterCol.toLowerCase())
          )
        )
      );
    }

    // 4. Styles
    if (filters.styles.length > 0) {
      result = result.filter((p) => filters.styles.includes(p.style));
    }

    // 5. Sorting
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
      ? [
          {
            key: "deal-sale",
            label: "On Sale",
            remove: () => router.push("/shop"),
          },
        ]
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
          ? "< 1 Juta"
          : r === "1m-5m"
          ? "1 - 5 Juta"
          : r === "5m-10m"
          ? "5 - 10 Juta"
          : "> 10 Juta",
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="border-b border-[#E5E1DB] pb-8 mb-8">
        <span className="text-xs uppercase tracking-widest text-[#A88968] font-semibold block mb-2">
          {dealSale ? "Discounted pieces" : "Curated Furniture"}
        </span>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <h1 className="font-serif text-3xl sm:text-5xl text-[#20201E] tracking-tight">
            {dealSale ? "Sale" : "Shop All Furniture"}
          </h1>
          <p className="text-xs sm:text-sm text-[#817A71] tracking-wider uppercase font-medium">
            Showing {filteredAndSortedProducts.length}{" "}
            {filteredAndSortedProducts.length === 1 ? "Piece" : "Pieces"}
          </p>
        </div>
      </div>

      {/* Filter & Sort Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pb-6 mb-6 gap-4 border-b border-[#E5E1DB]/60">
        {/* Mobile filter button */}
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-[#E5E1DB] rounded-xs text-xs font-semibold uppercase tracking-wider text-[#20201E]"
        >
          <SlidersHorizontal size={15} />
          <span>Filters ({activePills.length})</span>
        </button>

        {/* Active Filter Pills */}
        <div className="flex-1 flex flex-wrap items-center gap-2">
          {activePills.map((pill) => (
            <span
              key={pill.key}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E5E1DB] text-xs text-[#20201E] rounded-full"
            >
              <span>{pill.label}</span>
              <button
                onClick={pill.remove}
                className="text-stone-400 hover:text-stone-800"
                aria-label={`Remove filter ${pill.label}`}
              >
                <X size={12} />
              </button>
            </span>
          ))}
          {activePills.length > 0 && (
            <button
              onClick={resetFilters}
              className="text-xs text-[#A88968] hover:underline font-medium ml-2"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center self-end sm:self-auto gap-2">
          <label htmlFor="sortSelect" className="text-xs text-[#817A71] uppercase tracking-wider font-semibold">
            Sort by:
          </label>
          <div className="relative">
            <select
              id="sortSelect"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="appearance-none bg-white border border-[#E5E1DB] text-xs font-medium py-2 pl-3 pr-8 rounded-xs text-[#20201E] focus:outline-none focus:border-[#A88968] cursor-pointer"
            >
              <option value="featured">Featured Pieces</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
            <ChevronDown
              size={14}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500"
            />
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="flex gap-10">
        {/* Filter Sidebar */}
        <ProductFilter
          filters={filters}
          onChangeFilters={setFilters}
          onResetFilters={resetFilters}
          isOpenMobile={mobileFilterOpen}
          onCloseMobile={() => setMobileFilterOpen(false)}
        />

        {/* Products Grid */}
        <div className="flex-1">
          <ProductGrid
            products={filteredAndSortedProducts}
            onQuickView={setQuickViewProduct}
            wishlistIds={wishlistIds}
            onToggleWishlist={(p) => toggleWishlist(p.id)}
          />
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
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
