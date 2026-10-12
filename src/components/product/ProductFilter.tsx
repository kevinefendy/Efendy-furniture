"use client";

import { ProductCategory, ProductStyle } from "@/types";
import { X, RotateCcw } from "lucide-react";

export interface FilterState {
  categories: ProductCategory[];
  priceRange: string[];
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
  sortControl?: React.ReactNode;
}

// Filter retail: kategori, harga, material (pakai warna sbg proksi), warna, ukuran tersedia via produk.
const CATEGORIES: ProductCategory[] = [
  "Sofa",
  "Meja",
  "Kursi",
  "Lemari",
  "Tempat Tidur",
  "Rak",
  "Outdoor",
  "Dekorasi",
];

const PRICE_RANGES = [
  { id: "under-1m", label: "Di bawah Rp 1 juta" },
  { id: "1m-5m", label: "Rp 1 – 5 juta" },
  { id: "5m-10m", label: "Rp 5 – 10 juta" },
  { id: "above-10m", label: "Di atas Rp 10 juta" },
];

const COLORS = [
  { name: "Putih", hex: "#F5F3ED" },
  { name: "Krem", hex: "#E8E2D5" },
  { name: "Coklat", hex: "#8A6D53" },
  { name: "Hitam", hex: "#1F1F1F" },
  { name: "Abu", hex: "#A6A6A4" },
  { name: "Rotan", hex: "#C8A165" },
];

const STYLES: ProductStyle[] = ["Minimalis", "Scandinavian Warm", "Japandi", "Industrial"];

export default function ProductFilter({
  filters,
  onChangeFilters,
  onResetFilters,
  isOpenMobile = false,
  onCloseMobile,
  sortControl,
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
    <div className="space-y-8 text-[15px]">
      {sortControl}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8E6E1]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-[#1A1A1A]">Filter</span>
          {activeCount > 0 && (
            <span className="bg-[#C2410C] text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={onResetFilters}
            className="text-sm text-[#6B6B6B] hover:text-[#1A1A1A] flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={13} /> Hapus semua
          </button>
        )}
      </div>

      <div>
        <h4 className="text-[13px] uppercase tracking-widest font-semibold text-[#6B6B6B] mb-3">
          Kategori
        </h4>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer hover:text-[#C2410C]">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="w-4 h-4 rounded border-[#E8E6E1] accent-[#C2410C]"
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[13px] uppercase tracking-widest font-semibold text-[#6B6B6B] mb-3">
          Harga
        </h4>
        <div className="space-y-2">
          {PRICE_RANGES.map((pr) => (
            <label key={pr.id} className="flex items-center gap-2.5 cursor-pointer hover:text-[#C2410C]">
              <input
                type="checkbox"
                checked={filters.priceRange.includes(pr.id)}
                onChange={() => togglePriceRange(pr.id)}
                className="w-4 h-4 rounded border-[#E8E6E1] accent-[#C2410C]"
              />
              <span>{pr.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-[13px] uppercase tracking-widest font-semibold text-[#6B6B6B] mb-3">
          Warna
        </h4>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((col) => {
            const selected = filters.colors.includes(col.name);
            return (
              <button
                key={col.name}
                type="button"
                onClick={() => toggleColor(col.name)}
                aria-pressed={selected}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-colors ${
                  selected
                    ? "border-[#C2410C] bg-[#FDEEE4] text-[#1A1A1A] font-medium"
                    : "border-[#E8E6E1] bg-white hover:border-[#6B6B6B]"
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

      <div>
        <h4 className="text-[13px] uppercase tracking-widest font-semibold text-[#6B6B6B] mb-3">
          Gaya
        </h4>
        <div className="space-y-2">
          {STYLES.map((st) => (
            <label key={st} className="flex items-center gap-2.5 cursor-pointer hover:text-[#C2410C]">
              <input
                type="checkbox"
                checked={filters.styles.includes(st)}
                onChange={() => toggleStyle(st)}
                className="w-4 h-4 rounded border-[#E8E6E1] accent-[#C2410C]"
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
      <aside className="hidden lg:block w-64 shrink-0">{content}</aside>
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 lg:hidden">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E6E1] mb-6">
                <span className="font-serif text-xl">Filter</span>
                <button onClick={onCloseMobile} className="p-1" aria-label="Tutup filter">
                  <X size={20} />
                </button>
              </div>
              {content}
            </div>
            <div className="pt-6 border-t border-[#E8E6E1] mt-6">
              <button
                onClick={onCloseMobile}
                className="w-full py-3 bg-[#C2410C] hover:bg-[#A8370A] text-white text-sm font-medium rounded-[8px] transition-colors"
              >
                Tampilkan ({activeCount} filter)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
