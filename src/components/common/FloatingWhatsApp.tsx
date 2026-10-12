"use client";

import React, { useState } from "react";
import { MessageCircle, Phone, X, ShieldCheck, Sparkles } from "lucide-react";
import { useCompany } from "@/context/CompanyContext";

const WHATSAPP_NUMBER = "6281288997700";

export default function FloatingWhatsApp() {
  const { lang, openConsultModal } = useCompany();
  const [showTooltip, setShowTooltip] = useState(true);

  const directWaClick = () => {
    const text = encodeURIComponent(
      lang === "id"
        ? "Halo Efendy Furniture, saya ingin bertanya mengenai furnitur & konsultasi pesanan."
        : "Hello Efendy Furniture, I would like to inquire about furniture and custom consultations."
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[900] flex flex-col items-end gap-3 select-none">
      {/* Reassuring Tooltip for Boomers & quick inquiries */}
      {showTooltip && (
        <div className="relative max-w-xs p-3.5 rounded-2xl bg-white dark:bg-[#181614] border border-[#E5DFD5] dark:border-[#2C2722] text-[#1E1B18] dark:text-[#F5F2EB] shadow-2xl animate-in slide-in-from-bottom-3 duration-300">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-[#7A7267] hover:text-[#1E1B18] dark:hover:text-white p-1"
            aria-label="Tutup info"
          >
            <X size={14} />
          </button>
          <div className="flex items-start gap-2.5 pr-4">
            <span className="relative flex h-3 w-3 mt-1 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <div className="space-y-1">
              <p className="text-xs font-semibold leading-snug">
                {lang === "id" ? "Butuh Bantuan Cepat?" : "Need Direct Assistance?"}
              </p>
              <p className="text-[11px] text-[#7A7267] dark:text-[#9A9184] leading-relaxed">
                {lang === "id"
                  ? "Chat WA langsung dengan konsultan Efendy Furniture untuk cek stok & custom ukuran."
                  : "Chat directly with our furniture consultant to check stock or custom sizes."}
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck size={13} />
                <span>Hotline: 0812-8899-7700</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => openConsultModal()}
          className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-full bg-stone-900/90 dark:bg-stone-800/90 backdrop-blur-md text-amber-300 text-xs font-semibold uppercase tracking-wider border border-amber-500/30 shadow-lg hover:border-amber-400 hover:scale-105 transition-all duration-200"
        >
          <Sparkles size={14} className="text-amber-400" />
          <span>{lang === "id" ? "Form Custom" : "Custom Form"}</span>
        </button>

        <button
          onClick={directWaClick}
          aria-label="Hubungi WhatsApp"
          className="group relative w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-600/30 hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <MessageCircle size={28} className="group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 text-[9px] text-emerald-950 font-bold items-center justify-center">
              1
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
