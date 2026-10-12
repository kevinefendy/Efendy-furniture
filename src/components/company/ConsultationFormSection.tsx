"use client";

import React, { useState } from "react";
import { useCompany } from "@/context/CompanyContext";
import { Send, PhoneCall, MapPin, Clock } from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";
import MagneticButton from "@/components/common/MagneticButton";

const WHATSAPP_NUMBER = "6281288997700";

export default function ConsultationFormSection() {
  const { lang } = useCompany();
  const isId = lang === "id";

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    category: "Sofa Minimalist",
    timberPreference: "European White Oak Solid",
    budgetRange: "Rp 10 Juta - Rp 25 Juta",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const text = isId
      ? `Halo Tim Efendy Furniture, saya ingin konsultasi furniture:
• Nama: ${form.fullName || "-"}
• WhatsApp: ${form.phone || "-"}
• Kategori: ${form.category}
• Material: ${form.timberPreference}
• Catatan: ${form.notes || "Mohon info katalog & estimasi harga"}

Terima kasih.`
      : `Hello Efendy Furniture Team, I would like to consult regarding furniture:
• Name: ${form.fullName || "-"}
• WhatsApp: ${form.phone || "-"}
• Category: ${form.category}
• Material: ${form.timberPreference}
• Notes: ${form.notes || "Please provide catalog and price estimation"}

Thank you.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
  };

  return (
    <section
      id="kontak"
      className="py-20 sm:py-28 bg-[#FAFAFA] dark:bg-[#121211] border-b border-[#EEEEEC] dark:border-[#2A2A26] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Brief Contact & Showroom */}
          <div className="lg:col-span-5 space-y-8">
            <ScrollReveal direction="left">
              <span className="text-xs uppercase tracking-[0.25em] text-[#817A71] dark:text-[#A19A8F] font-semibold block mb-2">
                {isId ? "Hubungi Kami" : "Get In Touch"}
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#20201E] dark:text-[#F7F5F0] leading-tight">
                {isId ? "Konsultasi & Estimasi Harga" : "Consultation & Estimation"}
              </h2>
              <p className="text-sm text-[#817A71] dark:text-[#A19A8F] leading-relaxed pt-2">
                {isId
                  ? "Diskusikan furnitur impian Anda dengan konsultan kami. Respon cepat via WhatsApp setiap hari."
                  : "Discuss your dream furniture with our dedicated consultants. Fast response via WhatsApp daily."}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="left" delayMs={50}>
              <div className="space-y-5 text-sm">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-[#817A71] dark:text-[#A19A8F]">
                    {isId ? "Hotline Langsung & WA" : "Direct Hotline & WA"}
                  </span>
                  <a
                    href="tel:081288997700"
                    className="block font-serif text-2xl font-normal text-[#20201E] dark:text-[#F7F5F0] hover:text-[#A88968] transition-colors"
                  >
                    0812-8899-7700
                  </a>
                </div>

                <div className="space-y-2 pt-4 border-t border-[#EEEEEC] dark:border-[#2A2A26] text-xs text-[#817A71] dark:text-[#A19A8F]">
                  <p className="flex items-start gap-2">
                    <MapPin size={15} className="text-[#A88968] shrink-0 mt-0.5" />
                    <span>{isId ? "Galeri Jakarta: Jl. Kemang Raya No. 42B, Jakarta Selatan" : "Jakarta Gallery: Jl. Kemang Raya No. 42B, South Jakarta"}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin size={15} className="text-[#A88968] shrink-0 mt-0.5" />
                    <span>{isId ? "Workshop Jepara: Jl. Pemuda Raya No. 108, Tahunan, Jepara" : "Jepara Atelier: Jl. Pemuda Raya No. 108, Tahunan, Jepara"}</span>
                  </p>
                  <p className="flex items-center gap-2 pt-1 text-emerald-600 dark:text-emerald-400">
                    <Clock size={14} />
                    <span>{isId ? "Buka Setiap Hari: 08.00 - 21.00 WIB" : "Open Daily: 08:00 - 21:00 WIB"}</span>
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Clean Form */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right" delayMs={100}>
              <form
                onSubmit={handleSubmit}
                className="p-8 sm:p-10 rounded-sm bg-white dark:bg-[#1A1A18] border border-[#EEEEEC] dark:border-[#2A2A26] shadow-sm space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#817A71] dark:text-[#A19A8F] mb-2">
                      {isId ? "Nama Lengkap" : "Full Name"}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      placeholder={isId ? "Bpk / Ibu..." : "Mr / Ms..."}
                      className="w-full px-4 py-3 rounded-sm bg-white dark:bg-[#20201D] border border-[#E5E5E5] dark:border-[#333] text-sm focus:outline-none focus:border-[#20201E] dark:focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#817A71] dark:text-[#A19A8F] mb-2">
                      {isId ? "Nomor WhatsApp" : "WhatsApp Number"}
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="0812..."
                      className="w-full px-4 py-3 rounded-sm bg-white dark:bg-[#20201D] border border-[#E5E5E5] dark:border-[#333] text-sm focus:outline-none focus:border-[#20201E] dark:focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#817A71] dark:text-[#A19A8F] mb-2">
                      {isId ? "Kategori Furnitur" : "Furniture Category"}
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm bg-white dark:bg-[#20201D] border border-[#E5E5E5] dark:border-[#333] text-sm focus:outline-none focus:border-[#20201E] dark:focus:border-white transition-colors"
                    >
                      <option value="Sofa Minimalist">{isId ? "Sofa Mewah & Modular" : "Luxury & Modular Sofas"}</option>
                      <option value="Meja Makan & Kerja">{isId ? "Meja Makan & Kerja" : "Dining & Office Tables"}</option>
                      <option value="Kursi Santai">{isId ? "Kursi Santai & Dining" : "Lounge & Dining Chairs"}</option>
                      <option value="Lemari & Credenza">{isId ? "Lemari & Credenza" : "Wardrobes & Credenzas"}</option>
                      <option value="Custom 1 Ruangan">{isId ? "Custom Bespoke 1 Ruangan" : "Custom Bespoke Room Atelier"}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#817A71] dark:text-[#A19A8F] mb-2">
                      {isId ? "Preferensi Bahan" : "Material Preference"}
                    </label>
                    <select
                      value={form.timberPreference}
                      onChange={(e) => setForm({ ...form, timberPreference: e.target.value })}
                      className="w-full px-4 py-3 rounded-sm bg-white dark:bg-[#20201D] border border-[#E5E5E5] dark:border-[#333] text-sm focus:outline-none focus:border-[#20201E] dark:focus:border-white transition-colors"
                    >
                      <option value="European White Oak Solid">European White Oak</option>
                      <option value="Solid Indonesian Teak">Solid Teak Hardwood</option>
                      <option value="American Black Walnut">American Walnut</option>
                      <option value="Belgian Linen & Boucle">Belgian Linen / Boucle</option>
                      <option value="Full-Grain Italian Leather">Italian Leather</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#817A71] dark:text-[#A19A8F] mb-2">
                    {isId ? "Catatan / Ukuran Ruangan" : "Notes / Room Dimensions"}
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder={isId ? "Tuliskan ukuran atau model yang diinginkan..." : "Describe dimensions, requirements or preferred design..."}
                    className="w-full px-4 py-3 rounded-sm bg-white dark:bg-[#20201D] border border-[#E5E5E5] dark:border-[#333] text-sm focus:outline-none focus:border-[#20201E] dark:focus:border-white transition-colors resize-none"
                  />
                </div>

                <MagneticButton
                  type="submit"
                  className="w-full py-4 rounded-sm bg-[#20201E] hover:bg-[#A88968] dark:bg-white dark:text-[#121211] dark:hover:bg-[#A88968] text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <Send size={15} />
                  <span>{isId ? "Kirim ke WhatsApp Sales Executive" : "Send to WhatsApp Sales Consultant"}</span>
                </MagneticButton>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
