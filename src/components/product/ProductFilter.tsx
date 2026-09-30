"use client";

import { ProductCategory, ProductStyle } from "@/types";
import { X, RotateCcw } from "lucide-react";

export interface FilterState {
  categories: ProductCategory[];
  priceRange: string[]; // "under-1m" | "1m-5m" | "5m-10m" | "above-10m"
  colors: string[];
  styles: ProductStyle[];
}

export type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "newest";

interface ProductFilterProps {
  filters: FilterState;
  onChangeFilters: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

const CATEGORIES: ProductCategory[] = [
  "Sofa",
  "Chair",
  "Table",
  "Bed",
  "Storage",
  "Lighting",
  "Decor",
];

const PRICE_RANGES = [
  { id: "under-1m", label: "Under Rp 1.000.000" },
  { id: "1m-5m", label: "Rp 1.000.000 – Rp 5.000.000" },
  { id: "5m-10m", label: "Rp 5.000.000 – Rp 10.000.000" },
  { id: "above-10m", label: "Above Rp 10.000.000" },
];

const COLORS = [
  { name: "Beige", hex: "#E8E2D5" },
  { name: "Brown", hex: "#8A6D53" },
  { name: "Black", hex: "#2B2B2B" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Gray", hex: "#A6A6A4" },
];

const STYLES: ProductStyle[] = [
  "Modern",
  "Scandinavian",
  "Japandi",
  "Mid-Century",
  "Minimal",
];

export default function ProductFilter({
  filters,
  onChangeFilters,
  onResetFilters,
  isOpenMobile = false,
  onCloseMobile,
}: ProductFilterProps) {
  const toggleCategory = (cat: ProductCategory) => {
    const next = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChangeFilters({ ...filters, categories: next });
  };

  const togglePriceRange = (rangeId: string) => {
    const next = filters.priceRange.includes(rangeId)
      ? filters.priceRange.filter((r) => r !== rangeId)
      : [...filters.priceRange, rangeId];
    onChangeFilters({ ...filters, priceRange: next });
  };

  const toggleColor = (colorName: string) => {
    const next = filters.colors.includes(colorName)
      ? filters.colors.filter((c) => c !== colorName)
      : [...filters.colors, colorName];
    onChangeFilters({ ...filters, colors: next });
  };

  const toggleStyle = (style: ProductStyle) => {
    const next = filters.styles.includes(style)
      ? filters.styles.filter((s) => s !== style)
      : [...filters.styles, style];
    onChangeFilters({ ...filters, styles: next });
  };

  const activeCount =
    filters.categories.length +
    filters.priceRange.length +
    filters.colors.length +
    filters.styles.length;

  const content = (
    <div className="space-y-8 text-sm">
      {/* Reset Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E1DB]">
        <div className="flex items-center gap-2">
          <span className="font-serif text-lg text-[#20201E] font-medium">Filter By</span>
          {activeCount > 0 && (
            <span className="bg-[#6B6B6B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={onResetFilters}
            className="text-xs text-[#817A71] hover:text-[#20201E] flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={12} /> Clear all
          </button>
        )}
      </div>

      {/* 1. Category */}
      <div>
        <h4 className="text-xs uppercase tracking-widest font-semibold text-[#817A71] mb-3">
          Category
        </h4>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2.5 cursor-pointer text-stone-700 hover:text-[#20201E] select-none"
            >
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="w-4 h-4 rounded-xs border-stone-300 text-[#6B6B6B] focus:ring-[#6B6B6B]"
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. Price Range */}
      <div>
        <h4 className="text-xs uppercase tracking-widest font-semibold text-[#817A71] mb-3">
          Price Range
        </h4>
        <div className="space-y-2">
          {PRICE_RANGES.map((pr) => (
            <label
              key={pr.id}
              className="flex items-center gap-2.5 cursor-pointer text-stone-700 hover:text-[#20201E] select-none text-xs sm:text-sm"
            >
              <input
                type="checkbox"
                checked={filters.priceRange.includes(pr.id)}
                onChange={() => togglePriceRange(pr.id)}
                className="w-4 h-4 rounded-xs border-stone-300 text-[#6B6B6B] focus:ring-[#6B6B6B]"
              />
              <span>{pr.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Color Swatches */}
      <div>
        <h4 className="text-xs uppercase tracking-widest font-semibold text-[#817A71] mb-3">
          Color
        </h4>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((col) => {
            const isSelected = filters.colors.includes(col.name);
            return (
              <button
                key={col.name}
                type="button"
                onClick={() => toggleColor(col.name)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-all ${
                  isSelected
                    ? "border-[#20201E] bg-[#20201E] text-white font-medium shadow-xs"
                    : "border-[#E5E1DB] bg-white text-stone-700 hover:border-stone-400"
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: col.hex }}
                />
                <span>{col.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Style */}
      <div>
        <h4 className="text-xs uppercase tracking-widest font-semibold text-[#817A71] mb-3">
          Style & Aesthetic
        </h4>
        <div className="space-y-2">
          {STYLES.map((st) => (
            <label
              key={st}
              className="flex items-center gap-2.5 cursor-pointer text-stone-700 hover:text-[#20201E] select-none"
            >
              <input
                type="checkbox"
                checked={filters.styles.includes(st)}
                onChange={() => toggleStyle(st)}
                className="w-4 h-4 rounded-xs border-stone-300 text-[#6B6B6B] focus:ring-[#6B6B6B]"
              />
              <span>{st}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">{content}</aside>

      {/* Mobile Drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs lg:hidden animate-in fade-in">
          <div className="w-full max-w-xs bg-[#F7F5F0] h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between animate-in slide-in-from-right">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E1DB] mb-6">
                <span className="font-serif text-xl text-[#20201E]">Filters</span>
                <button
                  onClick={onCloseMobile}
                  className="p-1 text-stone-500 hover:text-[#20201E]"
                  aria-label="Close filters"
                >
                  <X size={20} />
                </button>
              </div>
              {content}
            </div>
            <div className="pt-6 border-t border-[#E5E1DB] mt-6">
              <button
                onClick={onCloseMobile}
                className="w-full py-3 bg-[#20201E] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#6B6B6B] transition"
              >
                Apply Filters ({activeCount})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
