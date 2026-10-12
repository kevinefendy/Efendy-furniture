"use client";

import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 15;
      });
    }, 120);

    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <aside
      aria-label="Loading Screen"
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#121211] text-[#F7F5F0] transition-opacity duration-500 ease-out select-none ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center max-w-sm px-6 text-center space-y-5">
        <div className="w-16 h-16 rounded-sm border border-white/20 bg-[#1A1A18] flex items-center justify-center text-white">
          <span className="font-serif text-3xl font-light">
            EF
          </span>
        </div>

        <div className="space-y-1">
          <h2 className="font-serif text-2xl tracking-[0.2em] font-light uppercase text-white">
            EFENDY
          </h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#A88968] font-medium font-sans">
            MODERN FURNITURE & ATELIER
          </p>
        </div>

        {/* Minimal progress bar */}
        <div className="w-36 h-[2px] bg-white/10 rounded-full overflow-hidden mt-2">
          <div
            className="h-full bg-[#A88968] transition-all duration-200 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </aside>
  );
}
