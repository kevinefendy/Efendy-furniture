"use client";

import React, { useEffect, useState } from "react";

/**
 * EditorialLoader
 * 
 * ALASAN DESAIN:
 * Menghindari spinner berputar atau logo 3D melayang yang sering terasa generic.
 * Mengikuti arahan: cukup teks "Efendy" yang muncul dan memudar pelan selama maksimal 1.5 detik,
 * seperti pembuka halaman depan majalah cetak sebelum masuk ke isi editorial.
 */
export default function EditorialLoader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 900);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 1500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <aside
      aria-label="Loading Screen"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#2B2118] text-[#F5F1EA] transition-opacity duration-600 ease-out select-none ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="text-center space-y-2">
        <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-[#F5F1EA] font-normal italic">
          Efendy
        </h2>
        <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-[#8B6F47]">
          Workshop Kayu Jepara · Sejak 1994
        </p>
      </div>
    </aside>
  );
}
