"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, TrendingUp, History, ArrowUpLeft } from "lucide-react";
import { PRODUCTS, ROOMS_DATA } from "@/data/products";
import { formatIDR } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = ["Sofa", "Meja makan", "Kursi kerja", "Lemari", "Tempat tidur", "Rak"];
const TRENDING_SEARCHES = ["Sofa scandinavian", "Meja makan jati", "Lemari minimalis", "Kursi kerja", "Lampu rotan"];
const RECENT_KEY = "efendy-recent-search";

// Cari nama produk, kategori, koleksi, gaya, material, dan ruangan.
function cariProduk(q: string, limit: number) {
  const query = q.trim().toLowerCase();
  if (!query) return [];
  return PRODUCTS.filter((p) => {
    const ruang = ROOMS_DATA.find((r) => r.id === p.room)?.name.toLowerCase() ?? "";
    return (
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      (p.collectionName && p.collectionName.toLowerCase().includes(query)) ||
      p.style.toLowerCase().includes(query) ||
      p.material.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      ruang.includes(query)
    );
  }).slice(0, limit);
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      try {
        const raw = localStorage.getItem(RECENT_KEY);
        if (raw) setRecent(JSON.parse(raw));
      } catch {
        setRecent([]);
      }
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      document.body.style.overflow = "hidden";
      const esc = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", esc);
      return () => {
        clearTimeout(t);
        document.removeEventListener("keydown", esc);
      };
    }
    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const liveResults = useMemo(() => cariProduk(query, 5), [query]);

  const simpanRecent = (kata: string) => {
    const q = kata.trim();
    if (!q) return;
    setRecent((prev) => {
      const next = [q, ...prev.filter((r) => r.toLowerCase() !== q.toLowerCase())].slice(0, 5);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {
        /* abaikan */
      }
      return next;
    });
  };

  const hapusRecent = (kata: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecent((prev) => {
      const next = prev.filter((r) => r !== kata);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch {
        /* abaikan */
      }
      return next;
    });
  };

  const keHalamanSearch = (kata: string) => {
    const q = kata.trim();
    if (!q) return;
    simpanRecent(q);
    onClose();
    setQuery("");
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    keHalamanSearch(query);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-[#1A1214]/70 px-4 pt-[6vh] backdrop-blur-sm sm:pt-[10vh]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Pencarian"
    >
      {/* Popup kaya address bar Chrome: kartu mengambang di tengah */}
      <div className="w-full max-w-2xl overflow-hidden rounded-[20px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        {/* Bar input */}
        <form onSubmit={handleSubmit} role="search" className="flex items-center gap-3 px-5 pb-4 pt-5">
          <Search size={22} className="shrink-0 text-[#6B6B6B]" />
          <label htmlFor="search-modal-input" className="sr-only">
            Cari furniture
          </label>
          <input
            id="search-modal-input"
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama, kategori, atau bahan… (mis. sofa, jati, rotan)"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-[17px] text-[#1A1A1A] placeholder:text-[#6B6B6B]/80 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="shrink-0 rounded-full p-1.5 text-[#6B6B6B] hover:bg-[#F7F7F5] hover:text-[#1A1A1A]"
              aria-label="Hapus kata kunci"
            >
              <X size={18} />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-full border border-[#E8E6E1] px-2.5 py-1 text-[11px] font-medium text-[#6B6B6B]"
              aria-label="Tutup pencarian"
            >
              ESC
            </button>
          )}
        </form>

        <div className="max-h-[62vh] overflow-y-auto pb-3">
          {/* === MODE KOSONG: riwayat + trending ala Chrome === */}
          {!query.trim() && (
            <>
              {recent.length > 0 && (
                <div className="pb-1">
                  {recent.map((item) => (
                    <div
                      key={item}
                      className="group flex w-full items-center gap-4 px-5 py-3 text-left transition-colors hover:bg-[#F7F7F5]"
                    >
                      <History size={18} className="shrink-0 text-[#6B6B6B]" />
                      <button
                        type="button"
                        onClick={() => keHalamanSearch(item)}
                        className="min-w-0 flex-1 truncate text-[15px] text-[#1A1A1A]"
                      >
                        {item}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => hapusRecent(item, e)}
                        aria-label={`Hapus ${item} dari riwayat`}
                        className="shrink-0 rounded-full p-1 text-[#6B6B6B] opacity-0 transition-opacity hover:bg-[#E8E6E1] group-hover:opacity-100"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <p className="px-5 pb-1 pt-2 text-[13px] font-semibold text-[#6B6B6B]">
                Trending searches
              </p>
              <div className="pb-1">
                {TRENDING_SEARCHES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => keHalamanSearch(item)}
                    className="flex w-full items-center gap-4 px-5 py-3 text-left transition-colors hover:bg-[#F7F7F5]"
                  >
                    <TrendingUp size={18} className="shrink-0 text-[#6B6B6B]" />
                    <span className="min-w-0 flex-1 truncate text-[15px] text-[#1A1A1A]">{item}</span>
                  </button>
                ))}
              </div>

              <p className="px-5 pb-2 pt-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-[#6B6B6B]">
                Sering dicari
              </p>
              <div className="flex flex-wrap gap-2 px-5 pb-4">
                {POPULAR_SEARCHES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => keHalamanSearch(item)}
                    className="rounded-full border border-[#E8E6E1] px-4 py-1.5 text-sm text-[#1A1A1A] transition-colors hover:border-[#C2410C] hover:text-[#C2410C]"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* === MODE MENGETIK: saran + produk === */}
          {query.trim() && (
            <>
              {/* Saran isi query */}
              <button
                type="button"
                onClick={() => keHalamanSearch(query)}
                className="flex w-full items-center gap-4 px-5 py-3 text-left transition-colors hover:bg-[#F7F7F5]"
              >
                <Search size={18} className="shrink-0 text-[#6B6B6B]" />
                <span className="min-w-0 flex-1 truncate text-[15px]">
                  <strong className="font-semibold text-[#1A1A1A]">{query.trim()}</strong>
                  <span className="text-[#6B6B6B]"> — cari di Efendy Furniture</span>
                </span>
                <ArrowUpLeft size={16} className="shrink-0 text-[#6B6B6B]" />
              </button>

              {liveResults.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <p className="text-[15px] text-[#6B6B6B]">
                    Nggak ketemu yang cocok dengan “{query.trim()}”.
                  </p>
                  <button
                    type="button"
                    onClick={() => keHalamanSearch(query)}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#C2410C] underline underline-offset-4"
                  >
                    Tetap tampilkan di halaman pencarian <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="mx-5 my-2 border-t border-[#E8E6E1]" />
                  <ul className="pb-1">
                    {liveResults.map((product) => (
                      <li key={product.id}>
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={() => {
                            simpanRecent(query);
                            onClose();
                          }}
                          className="flex items-center gap-4 px-5 py-2.5 transition-colors hover:bg-[#F7F7F5]"
                        >
                          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[10px] bg-[#F7F7F5]">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              sizes="44px"
                              className="object-cover"
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[15px] font-medium text-[#1A1A1A]">
                              {product.name}
                            </span>
                            <span className="block text-[13px] text-[#6B6B6B]">
                              {product.category} ·{" "}
                              <span className="price font-semibold text-[#1A1A1A]">
                                {formatIDR(product.price)}
                              </span>
                            </span>
                          </span>
                          <ArrowUpLeft size={16} className="shrink-0 text-[#6B6B6B]" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => keHalamanSearch(query)}
                    className="mt-1 flex w-full items-center justify-center gap-1.5 bg-[#F7F7F5] py-3 text-sm font-medium text-[#1A1A1A] transition-colors hover:text-[#C2410C]"
                  >
                    Lihat semua hasil untuk “{query.trim()}” <ArrowRight size={15} />
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
