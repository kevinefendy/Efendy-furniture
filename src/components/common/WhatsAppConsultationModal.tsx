"use client";

import React, { useState } from "react";
import { useCompany } from "@/context/CompanyContext";
import { X, Send, MessageCircle, ShieldCheck, PhoneCall } from "lucide-react";
import MagneticButton from "./MagneticButton";

const WHATSAPP_NUMBER = "6281288997700";

export default function WhatsAppConsultationModal() {
  const { isConsultModalOpen, closeConsultModal, consultModalData, lang } = useCompany();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    category: consultModalData.category || "Sofa Minimalist",
    material: "European White Oak Solid",
    dimensions: "",
    budget: "Rp 10 Juta - Rp 25 Juta",
    notes: consultModalData.productName ? `Tertarik dengan produk: ${consultModalData.productName}` : "",
  });

  if (!isConsultModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const greeting = lang === "id"
      ? `Halo Efendy Furniture, saya ingin konsultasi pemesanan:`
      : `Hello Efendy Furniture, I would like to consult regarding an order:`;

    const text = `${greeting}
• *Nama*: ${formData.name || "-"}
• *Nomor WA*: ${formData.phone || "-"}
• *Kategori*: ${formData.category}
• *Material*: ${formData.material}
• *Estimasi Ukuran*: ${formData.dimensions || "Standar / Belum Diukur"}
• *Budget*: ${formData.budget}
• *Catatan*: ${formData.notes || "Mohon info katalog & estimasi harga"}

Terima kasih.`;

    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(waUrl, "_blank");
    closeConsultModal();
  };

  const isId = lang === "id";

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-sm bg-white dark:bg-[#1A1A18] border border-[#EEEEEC] dark:border-[#2A2A26] text-[#20201E] dark:text-[#F7F5F0] shadow-2xl p-6 sm:p-8 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeConsultModal}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          aria-label={isId ? "Tutup modal" : "Close modal"}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="mb-4">
          <span className="text-xs uppercase tracking-widest text-[#817A71] dark:text-[#A19A8F] block">
            {isId ? "Konsultasi Langsung" : "Direct Consultation"}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal mt-0.5">
            {isId ? "Diskusi Furniture via WhatsApp" : "Furniture Consultation via WhatsApp"}
          </h3>
          <p className="text-xs text-[#817A71] dark:text-[#A19A8F] mt-1">
            {isId
              ? "Respon cepat dari desainer & konsultan Efendy Furniture"
              : "Prompt response from our dedicated furniture design consultants"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          <div>
            <label className="block font-semibold uppercase tracking-wider mb-1.5 text-[#817A71] dark:text-[#A19A8F]">
              {isId ? "Nama Lengkap *" : "Full Name *"}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={isId ? "Bpk / Ibu..." : "Mr / Ms..."}
              className="w-full px-4 py-2.5 rounded-sm bg-white dark:bg-[#20201D] border border-[#E5E5E5] dark:border-[#333] focus:outline-none focus:border-[#20201E] dark:focus:border-white text-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1.5 text-[#817A71] dark:text-[#A19A8F]">
                {isId ? "No. WhatsApp *" : "WhatsApp Number *"}
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="0812..."
                className="w-full px-4 py-2.5 rounded-sm bg-white dark:bg-[#20201D] border border-[#E5E5E5] dark:border-[#333] focus:outline-none focus:border-[#20201E] dark:focus:border-white text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1.5 text-[#817A71] dark:text-[#A19A8F]">
                {isId ? "Kategori Furnitur" : "Furniture Category"}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-sm bg-white dark:bg-[#20201D] border border-[#E5E5E5] dark:border-[#333] focus:outline-none focus:border-[#20201E] dark:focus:border-white text-xs"
              >
                <option value="Sofa Minimalist">{isId ? "Sofa Mewah & Modular" : "Luxury & Modular Sofas"}</option>
                <option value="Meja Makan & Kerja">{isId ? "Meja Makan & Kerja" : "Dining & Office Tables"}</option>
                <option value="Kursi Santai">{isId ? "Kursi Santai & Dining" : "Lounge & Dining Chairs"}</option>
                <option value="Lemari & Credenza">{isId ? "Lemari & Credenza" : "Wardrobes & Credenzas"}</option>
                <option value="Custom Bespoke">{isId ? "Custom 1 Ruangan" : "Custom Bespoke Room"}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1.5 text-[#817A71] dark:text-[#A19A8F]">
                {isId ? "Preferensi Material" : "Material Preference"}
              </label>
              <select
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                className="w-full px-4 py-2.5 rounded-sm bg-white dark:bg-[#20201D] border border-[#E5E5E5] dark:border-[#333] focus:outline-none focus:border-[#20201E] dark:focus:border-white text-xs"
              >
                <option value="European White Oak Solid">European White Oak</option>
                <option value="Solid Indonesian Teak">Solid Teak Hardwood</option>
                <option value="American Black Walnut">American Walnut</option>
                <option value="Belgian Linen & Boucle">Belgian Linen / Boucle</option>
                <option value="Full-Grain Italian Leather">Italian Leather</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold uppercase tracking-wider mb-1.5 text-[#817A71] dark:text-[#A19A8F]">
                {isId ? "Estimasi Anggaran" : "Budget Estimation"}
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-2.5 rounded-sm bg-white dark:bg-[#20201D] border border-[#E5E5E5] dark:border-[#333] focus:outline-none focus:border-[#20201E] dark:focus:border-white text-xs"
              >
                <option value="Rp 5 Juta - Rp 10 Juta">Rp 5 Juta - Rp 10 Juta</option>
                <option value="Rp 10 Juta - Rp 25 Juta">Rp 10 Juta - Rp 25 Juta</option>
                <option value="Rp 25 Juta - Rp 50 Juta">Rp 25 Juta - Rp 50 Juta</option>
                <option value="Di atas Rp 50 Juta">{isId ? "Di atas Rp 50 Juta" : "> Rp 50 Million"}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider mb-1.5 text-[#817A71] dark:text-[#A19A8F]">
              {isId ? "Catatan / Ukuran" : "Notes / Dimensions"}
            </label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder={isId ? "Contoh: panjang 220 cm warna beige..." : "E.g.: 220 cm length, beige boucle upholstery..."}
              className="w-full px-4 py-2.5 rounded-sm bg-white dark:bg-[#20201D] border border-[#E5E5E5] dark:border-[#333] focus:outline-none focus:border-[#20201E] dark:focus:border-white text-xs resize-none"
            />
          </div>

          <div className="pt-2">
            <MagneticButton
              type="submit"
              className="w-full py-3.5 bg-[#20201E] hover:bg-[#A88968] dark:bg-white dark:text-[#121211] dark:hover:bg-[#A88968] text-white font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm transition-colors"
            >
              <Send size={14} />
              <span>{isId ? "Kirim ke WhatsApp Sales Kami" : "Send to WhatsApp Sales Consultant"}</span>
            </MagneticButton>
          </div>
        </form>

        <div className="mt-4 pt-3 border-t border-[#EEEEEC] dark:border-[#2A2A26] flex items-center justify-between text-[11px] text-[#817A71] dark:text-[#A19A8F]">
          <span className="flex items-center gap-1.5">
            <PhoneCall size={12} className="text-[#A88968]" />
            <span>Hotline: 0812-8899-7700</span>
          </span>
          <span>{isId ? "Buka Setiap Hari: 08.00 - 21.00 WIB" : "Open Daily: 08:00 - 21:00 WIB"}</span>
        </div>
      </div>
    </div>
  );
}
