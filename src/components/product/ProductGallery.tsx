"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Expand, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [fullscreen, setFullscreen] = useState(false);

  const activeImage = images[selectedIndex] || images[0];
  const isLifestyle = selectedIndex === images.length - 1 && images.length > 1;

  const goPrev = useCallback(() => {
    setSelectedIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const goNext = useCallback(() => {
    setSelectedIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [fullscreen, goPrev, goNext]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row gap-4">
        {/* Thumbnails list */}
        <div
          className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[580px] shrink-0"
          role="tablist"
          aria-label={`${productName} thumbnails`}
        >
          {images.map((img, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={selectedIndex === idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-sm overflow-hidden border-2 transition-all shrink-0 focus-visible:outline-2 focus-visible:outline-[#6B6B6B] ${
                selectedIndex === idx
                  ? "border-[#20201E] opacity-100 ring-1 ring-[#20201E]"
                  : "border-[#E5E1DB] opacity-65 hover:opacity-100 hover:border-stone-400"
              }`}
              aria-label={`View photo ${idx + 1} of ${productName}${
                idx === images.length - 1 && images.length > 1 ? " (lifestyle)" : ""
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>

        {/* Main Image with Zoom on hover */}
        <div
          className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] w-full flex-1 rounded-sm overflow-hidden bg-[#EAE6DF] cursor-crosshair group"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setFullscreen(true)}
          role="button"
          tabIndex={0}
          aria-label={`Open fullscreen view of ${productName}`}
          onKeyDown={(e) => {
            if (e.key === "Enter") setFullscreen(true);
          }}
        >
          <Image
            src={activeImage}
            alt={productName}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className={`object-cover object-center transition-opacity duration-200 ${
              isZoomed ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* High-res zoomed preview layer */}
          {isZoomed && (
            <div
              className="absolute inset-0 bg-no-repeat pointer-events-none"
              style={{
                backgroundImage: `url(${activeImage})`,
                backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                backgroundSize: "220%",
              }}
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-black/55 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm">
              {selectedIndex + 1} / {images.length}
            </span>
            {isLifestyle && (
              <span className="bg-[#6B6B6B] text-white text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm">
                Lifestyle
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setFullscreen(true);
            }}
            className="absolute top-3 right-3 p-2 bg-white/85 backdrop-blur-sm rounded-full text-[#20201E] hover:bg-white transition opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
            aria-label="Open fullscreen gallery"
          >
            <Expand size={16} />
          </button>

          {/* Prev / Next on main */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/85 rounded-full hover:bg-white transition opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/85 rounded-full hover:bg-white transition opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm pointer-events-none">
            Hover to zoom • Click for fullscreen
          </div>
        </div>
      </div>

      {/* Fullscreen lightbox */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-[60] bg-black/90 flex flex-col items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} fullscreen gallery`}
          onClick={() => setFullscreen(false)}
        >
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-4 right-4 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition"
            aria-label="Close fullscreen"
          >
            <X size={20} />
          </button>
          <p className="text-white/70 text-xs uppercase tracking-widest mb-4">
            {productName} — {selectedIndex + 1} / {images.length}
            {isLifestyle ? " • Lifestyle" : ""}
          </p>
          <div
            className="relative w-full max-w-4xl aspect-[4/3] sm:aspect-[16/10] rounded-sm overflow-hidden bg-stone-900"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activeImage}
              alt={productName}
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>
          {images.length > 1 && (
            <div className="flex items-center gap-4 mt-5" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={goPrev}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedIndex(idx)}
                    className={`relative w-12 h-14 rounded-sm overflow-hidden border-2 transition ${
                      idx === selectedIndex ? "border-white" : "border-transparent opacity-50 hover:opacity-100"
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  >
                    <Image src={img} alt="" fill sizes="48px" className="object-cover" />
                  </button>
                ))}
              </div>
              <button
                onClick={goNext}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
