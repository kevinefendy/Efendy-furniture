"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { PRODUCTS, ROOMS_DATA } from "@/data/products";
import ProductGrid from "@/components/product/ProductGrid";
import QuickViewModal from "@/components/product/QuickViewModal";
import ProductFilter, {
  FilterState,
  SortOption,
} from "@/components/product/ProductFilter";
import {
  addToCart as addToCartStore,
  useWishlistIds,
  openCartDrawer,
} from "@/lib/store";
import type { Product } from "@/types";

export default function AllRoomsPage() {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [],
    colors: [],
    styles: [],
  });
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { ids: wishlistIds, toggle: toggleWishlist } = useWishlistIds();

  const resetFilters = () => {
    setFilters({ categories: [], priceRange: [], colors: [], styles: [] });
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];
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
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    return result;
  }, [filters, sortOption]);

  const activeFilterCount =
    filters.categories.length +
    filters.priceRange.length +
    filters.colors.length +
    filters.styles.length;

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-stone-500 mb-6"
        >
          <Link href="/" className="hover:text-[#20201E] hover:underline">
            Home
          </Link>
          <ChevronRight size={12} aria-hidden />
          <span aria-current="page" className="text-[#20201E]">
            All Rooms
          </span>
        </nav>

        {/* Room cards strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 mb-10">
          {ROOMS_DATA.map((room) => (
            <Link key={room.id} href={`/rooms/${room.id}`} className="group">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-2 text-[13.5px] text-[#333330] group-hover:text-[#6B6B6B] group-hover:underline">
                {room.name}
              </p>
            </Link>
          ))}
        </div>

        <h1 className="text-[28px] sm:text-[32px] font-bold text-[#20201E] tracking-tight mb-8">
          All Rooms
        </h1>

        {/* Mobile filter button */}
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden flex items-center justify-center gap-2 w-full px-4 py-2.5 mb-6 bg-white border border-stone-300 rounded-sm text-[13px] font-semibold text-[#20201E]"
        >
          <SlidersHorizontal size={15} />
          <span>Filters ({activeFilterCount})</span>
        </button>

        <div className="flex gap-10">
          <ProductFilter
            filters={filters}
            onChangeFilters={setFilters}
            onResetFilters={resetFilters}
            isOpenMobile={mobileFilterOpen}
            onCloseMobile={() => setMobileFilterOpen(false)}
            sortControl={
              <div>
                <h2 className="text-[15px] font-bold text-[#20201E]">Sort & Filter</h2>
                <p className="text-xs text-stone-500 mt-0.5 mb-4">
                  {filteredAndSortedProducts.length}{" "}
                  {filteredAndSortedProducts.length === 1 ? "item" : "items"}
                </p>
                <h3 className="text-[13.5px] font-bold text-[#20201E] mb-2.5">Sort by</h3>
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    aria-label="Sort products"
                    className="w-full appearance-none bg-white border border-stone-300 text-[13px] py-2 pl-3 pr-8 rounded-sm text-[#20201E] focus:outline-none focus:border-[#6B6B6B] cursor-pointer"
                  >
                    <option value="featured">Popularity</option>
                    <option value="price-desc">High - Low Price</option>
                    <option value="price-asc">Low - High Price</option>
                    <option value="newest">Newest</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500"
                  />
                </div>
              </div>
            }
          />

          {/* Mobile sort row */}
          <div className="lg:hidden flex items-center gap-2 mb-4">
            <label htmlFor="roomsSort" className="text-xs text-stone-500 font-semibold">
              Sort by:
            </label>
            <div className="relative flex-1">
              <select
                id="roomsSort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full appearance-none bg-white border border-stone-300 text-xs font-medium py-2 pl-3 pr-8 rounded-sm text-[#20201E] focus:outline-none focus:border-[#6B6B6B]"
              >
                <option value="featured">Popularity</option>
                <option value="price-desc">High - Low Price</option>
                <option value="price-asc">Low - High Price</option>
                <option value="newest">Newest</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {activeFilterCount > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-stone-500">
                  {filteredAndSortedProducts.length} items
                </span>
                <button
                  onClick={resetFilters}
                  className="text-xs text-stone-500 hover:text-[#20201E] inline-flex items-center gap-1 underline underline-offset-2"
                >
                  <X size={12} /> Clear all
                </button>
              </div>
            )}
            <ProductGrid
              products={filteredAndSortedProducts}
              onQuickView={setQuickViewProduct}
              wishlistIds={wishlistIds}
              onToggleWishlist={(p) => toggleWishlist(p.id)}
            />
          </div>
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
