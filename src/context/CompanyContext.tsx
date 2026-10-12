"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "id" | "en";
export type Theme = "dark" | "light";
export type FontSize = "normal" | "large";

interface ConsultationInitialData {
  category?: string;
  productName?: string;
}

interface CompanyContextType {
  theme: Theme;
  toggleTheme: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  fontSize: FontSize;
  toggleFontSize: () => void;
  isConsultModalOpen: boolean;
  openConsultModal: (data?: ConsultationInitialData) => void;
  closeConsultModal: () => void;
  consultModalData: ConsultationInitialData;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  id: {
    // Navigation
    "nav.home": "Beranda",
    "nav.about": "Tentang Kami",
    "nav.collection": "Koleksi",
    "nav.custom": "Custom Furniture",
    "nav.craftsmanship": "Material & Kualitas",
    "nav.warranty": "Garansi 10 Tahun",
    "nav.testimonials": "Testimoni",
    "nav.contact": "Konsultasi WA",
    "nav.callDirect": "Hubungi Kami",
    "nav.showroom": "Showroom",

    // Hero
    "hero.badge": "Masterpiece Woodcraft & Interior • Sejak 1998",
    "hero.title1": "Keindahan Abadi",
    "hero.title2": "Sentuhan Tangan Ahli.",
    "hero.subtitle":
      "Efendy Furniture merancang furnitur mewah berskala arsitektural. Perpaduan solid hardwood kayu jati Perhutani, Belgian linen, dan siluet modern yang dirawat turun-temurun.",
    "hero.ctaWhatsapp": "Konsultasi WhatsApp (Respon Cepat)",
    "hero.ctaCatalog": "Lihat Koleksi Lengkap",
    "hero.customBadge": "Kustom Ukuran & Bahan Tersedia",
    "hero.trust1": "100% Solid Wood FSC",
    "hero.trust2": "Gratis Pengiriman & Perakitan",
    "hero.trust3": "Garansi Rangka 10 Tahun",

    // Marquee
    "marquee.text": "PREMIUM • HANDCRAFTED • CUSTOM FURNITURE • SOLID WOOD • 10-YEAR WARRANTY • JEPARA ARTISAN • WHITE-GLOVE SERVICE • LUXURY LIVING •",

    // About
    "about.tag": "WARISAN & FILOSOFI",
    "about.heading": "Dua Generasi Menempa Mahakarya Kayu Nusantara",
    "about.subheading": "Dari jantung seni ukir dan perkayuan Jepara hingga hunian prestisius modern di seluruh Indonesia.",
    "about.desc1":
      "Didirikan pada tahun 1998, Efendy Furniture lahir dari kecintaan mendalam terhadap serat kayu alami dan teknik sambungan tradisional purba (mortise & tenon) yang terbukti bertahan hingga ratusan tahun tanpa paku rapuh.",
    "about.desc2":
      "Kami menjembatani estetika modern minimalis kontemporer yang dicintai generasi masa kini, dengan standar kekuatan struktural kokoh dan rasa aman yang dicari para penikmat kenyamanan sejati.",
    "about.certTitle": "Sertifikasi Legal Wood & SVLK",
    "about.certDesc": "Kayu jati & oak kami berasal dari hutan budidaya berkelanjutan Perhutani legal.",

    // Counters
    "stats.delivered": "Furnitur Mewah Terkirim",
    "stats.experience": "Tahun Dedikasi Pengrajin",
    "stats.satisfaction": "Tingkat Kepuasan Klien",
    "stats.warranty": "Tahun Garansi Struktur Resmi",
    "stats.artisans": "Master Pengrajin Kayu Jepara",

    // Categories
    "categories.tag": "KATALOG PILIHAN",
    "categories.title": "Koleksi Furnitur Signature",
    "categories.subtitle": "Dibuat dengan kayu solid pilihan dan kain pelapis premium berstandar internasional.",
    "categories.all": "Semua",
    "categories.sofa": "Sofa Mewah",
    "categories.table": "Meja Makan & Kerja",
    "categories.chair": "Kursi Santai",
    "categories.storage": "Lemari & Credenza",
    "categories.custom": "Custom Bespoke",
    "categories.orderViaWa": "Tanya Via WhatsApp",
    "categories.spec": "Spesifikasi",
    "categories.inStock": "Tersedia / Siap Kirim",
    "categories.madeToOrder": "Pre-Order 14 Hari",

    // Custom Atelier
    "custom.tag": "LAYANAN EKSKLUSIF",
    "custom.title": "Atelier Custom Furniture Bebas Ukuran & Bentuk",
    "custom.subtitle": "Punya denah ruangan khusus atau gambar inspirasi sendiri? Tim arsitek interior Efendy siap mewujudkannya dari 0.",
    "custom.step1.title": "1. Diskusi & Sketsa Ide",
    "custom.step1.desc": "Kirimkan foto ruangan, ukuran dinding, atau referensi Pinterest Anda melalui WhatsApp.",
    "custom.step2.title": "2. Desain 3D CAD & Skala",
    "custom.step2.desc": "Kami visualisasikan desain dalam bentuk 3D realistis sesuai proporsi ruangan aktual Anda.",
    "custom.step3.title": "3. Pemilihan Material & Sample",
    "custom.step3.desc": "Pilih jenis kayu (Jati, Oak, Walnut), kain (Boucle, Velvet, Italian Leather), dan tone warna.",
    "custom.step4.title": "4. Pengerjaan Pengrajin Jepara",
    "custom.step4.desc": "Dibuat secara presisi oleh pengrajin senior dengan sambungan kayu tradisional.",
    "custom.step5.title": "5. White-Glove In-Home Setup",
    "custom.step5.desc": "Tim kami mengantar, merakit langsung di ruangan Anda, dan membersihkan seluruh area.",
    "custom.cta": "Mulai Konsultasi Desain Custom",

    // Craftsmanship & Materials
    "craft.tag": "KUALITAS TANPA KOMPROMI",
    "craft.title": "Material Terbaik untuk Investasi Hunian",
    "craft.subtitle": "Setiap sentimeter dipilih cermat agar tahan puluhan tahun dan semakin menawan seiring waktu.",
    "craft.mat1.title": "Kayu Jati Perhutani Grade A (Teak)",
    "craft.mat1.desc": "Kadar minyak alami tinggi tahan rayap, jamur, serta cuaca tropis lembap Indonesia.",
    "craft.mat2.title": "European White Oak & American Walnut",
    "craft.mat2.desc": "Karakter serat kayu lurus tegas dengan finishing natural oil ramah lingkungan.",
    "craft.mat3.title": "Full-Grain Italian Leather & Belgian Linen",
    "craft.mat3.desc": "Kulit asli lembut bernapas dan kain tenun bertekstur nyaman dengan ketahanan gesek tinggi.",
    "craft.mat4.title": "Konstruksi Purba Mortise & Tenon",
    "craft.mat4.desc": "Sistem pasak kayu tanpa paku terbuka, meminimalisir bunyi derit dan goyangan.",

    // Trust & Boomer signals
    "trust.tag": "JAMINAN KETENANGAN ANDA",
    "trust.title": "Garansi 10 Tahun & Layanan Purnajual Terbaik",
    "trust.subtitle": "Kami mengutamakan kepercayaan pelanggan dengan komitmen tertulis dan transparansi penuh.",
    "trust.badge1.title": "Kartu Sertifikat Garansi 10 Tahun",
    "trust.badge1.desc": "Jaminan rangka kayu tidak retak, tidak rayapan, dan tidak patah selama 10 tahun pemakaian normal.",
    "trust.badge2.title": "Gratis Pengiriman & Instalasi Jabodetabek & Jawa",
    "trust.badge2.desc": "Tidak perlu repot merakit sendiri. Tim kami memastikan furnitur tertata sempurna di ruangan Anda.",
    "trust.badge3.title": "Bisa Kunjungi Showroom & Workshop Langsung",
    "trust.badge3.desc": "Sentuh langsung kehalusan kayu dan coba kenyamanan sofa kami di Galeri Jakarta & Workshop Jepara.",
    "trust.badge4.title": "Layanan Konsultasi WhatsApp Personal",
    "trust.badge4.desc": "Ditemani konsultan berpengalaman tanpa bot, menjawab setiap detail ukuran dan estimasi biaya.",

    // Testimonials
    "testi.tag": "TESTIMONI KLIEN",
    "testi.title": "Dipercaya Pemilik Rumah Mewah, Desainer & Villa",
    "testi.subtitle": "Ulasan asli dari para pemilik hunian dan arsitek yang telah merasakan kehangatan Efendy Furniture.",

    // Form
    "form.tag": "TERHUBUNG LANGSUNG",
    "form.title": "Konsultasi & Estimasi Biaya via WhatsApp",
    "form.subtitle": "Isi form ringkas di bawah ini atau langsung chat WhatsApp untuk diskusi cepat.",
    "form.name": "Nama Lengkap Anda",
    "form.phone": "Nomor WhatsApp (Aktif)",
    "form.category": "Jenis Furnitur yang Diinginkan",
    "form.material": "Pilihan Material Kayu / Bahan",
    "form.budget": "Estimasi Anggaran (Opsional)",
    "form.message": "Catatan / Ukuran Ruangan / Keinginan Khusus",
    "form.submit": "Kirim Rincian ke WhatsApp Kami",
    "form.submitNote": "Pesan akan otomatis terformat rapi dan membuka aplikasi WhatsApp Anda.",
    "form.directCall": "Atau Telepon Langsung Hotline Bebas Pulsa / WhatsApp:",

    // Footer
    "footer.desc":
      "Efendy Furniture adalah produsen furnitur premium berdedikasi tinggi asal Jepara dengan standar estetika internasional. Menghadirkan kehangatan kayu asli dan keanggunan abadi ke setiap sudut rumah Anda.",
    "footer.addressTitle": "Showroom & Workshop",
    "footer.addressJkt": "Galeri Jakarta: Jl. Kemang Raya No. 42B, Jakarta Selatan",
    "footer.addressJpr": "Workshop & Atelier: Jl. Pemuda Raya No. 108, Tahunan, Jepara, Jawa Tengah",
    "footer.hours": "Buka Setiap Hari: 08.00 - 21.00 WIB",
    "footer.rights": "Hak Cipta Dilindungi Undang-Undang.",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.collection": "Collection",
    "nav.custom": "Custom Furniture",
    "nav.craftsmanship": "Materials & Craft",
    "nav.warranty": "10-Year Warranty",
    "nav.testimonials": "Reviews",
    "nav.contact": "WhatsApp Consult",
    "nav.callDirect": "Call Hotline",
    "nav.showroom": "Showrooms",

    // Hero
    "hero.badge": "Masterpiece Woodcraft & Interior • Established 1998",
    "hero.title1": "Timeless Living",
    "hero.title2": "Artisanal Grace.",
    "hero.subtitle":
      "Efendy Furniture designs luxury architectural furniture. Harmonizing solid FSC Indonesian teak, Belgian linen, and serene proportions built to endure generations.",
    "hero.ctaWhatsapp": "WhatsApp Consultation (Fast Response)",
    "hero.ctaCatalog": "Explore Collection",
    "hero.customBadge": "Custom Dimensions & Timber Available",
    "hero.trust1": "100% Solid Hardwood FSC",
    "hero.trust2": "White-Glove Delivery & Setup",
    "hero.trust3": "10-Year Structural Guarantee",

    // Marquee
    "marquee.text": "PREMIUM • HANDCRAFTED • CUSTOM FURNITURE • SOLID WOOD • 10-YEAR WARRANTY • JEPARA ARTISAN • WHITE-GLOVE SERVICE • LUXURY LIVING •",

    // About
    "about.tag": "HERITAGE & CRAFT",
    "about.heading": "Two Generations of Indonesian Master Woodworking",
    "about.subheading": "From the historic artisan workshops of Jepara to prestigious modern residences across the globe.",
    "about.desc1":
      "Founded in 1998, Efendy Furniture was born from an enduring passion for organic wood grains and time-tested mortise & tenon joinery that outlasts decades without fragile metal fasteners.",
    "about.desc2":
      "We bridge the minimalist contemporary aesthetics loved by modern tastemakers with the steadfast structural integrity and absolute peace of mind demanded by discerning collectors.",
    "about.certTitle": "Legal Wood SVLK Certified",
    "about.certDesc": "All our hardwoods are sustainably harvested from legal managed plantations.",

    // Counters
    "stats.delivered": "Luxury Furniture Delivered",
    "stats.experience": "Years of Master Heritage",
    "stats.satisfaction": "Client Satisfaction Rate",
    "stats.warranty": "Years Structural Warranty",
    "stats.artisans": "Master Jepara Woodcrafters",

    // Categories
    "categories.tag": "CURATED CATALOG",
    "categories.title": "Signature Furniture Lineup",
    "categories.subtitle": "Meticulously built with certified solid woods and world-class upholstery fabrics.",
    "categories.all": "All Pieces",
    "categories.sofa": "Luxury Sofas",
    "categories.table": "Dining & Work Tables",
    "categories.chair": "Lounge Chairs",
    "categories.storage": "Cabinets & Credenzas",
    "categories.custom": "Custom Bespoke",
    "categories.orderViaWa": "Inquire via WhatsApp",
    "categories.spec": "Specifications",
    "categories.inStock": "In Stock / Ready",
    "categories.madeToOrder": "Made to Order (14 Days)",

    // Custom Atelier
    "custom.tag": "BESPOKE SERVICE",
    "custom.title": "Bespoke Atelier: Custom Sizes, Fabrics & Woods",
    "custom.subtitle": "Have a custom floor plan, unique ceiling height, or Pinterest moodboard? Our interior architects bring your vision to life.",
    "custom.step1.title": "1. Idea & Room Sketch",
    "custom.step1.desc": "Send your room photos, wall dimensions, or design inspiration directly via WhatsApp.",
    "custom.step2.title": "2. 3D CAD & Scale Rendering",
    "custom.step2.desc": "We render your piece in realistic 3D matching your room's exact architectural scale.",
    "custom.step3.title": "3. Material & Sample Curation",
    "custom.step3.desc": "Select woods (Teak, White Oak, Walnut), fabrics (Boucle, Velvet, Full-Grain Leather), and finishes.",
    "custom.step4.title": "4. Master Artisan Joinery",
    "custom.step4.desc": "Hand-built in Jepara with ancient woodworking joinery techniques for supreme longevity.",
    "custom.step5.title": "5. White-Glove Installation",
    "custom.step5.desc": "Our crew delivers, places in your room of choice, unboxes, and cleans up completely.",
    "custom.cta": "Start Bespoke Consultation",

    // Craftsmanship & Materials
    "craft.tag": "UNCOMPROMISING PURSUIT",
    "craft.title": "World-Class Materials For Generational Heirlooms",
    "craft.subtitle": "Every millimeter is chosen to age gracefully with an organic natural patina.",
    "craft.mat1.title": "Perhutani Solid Teak Grade A",
    "craft.mat1.desc": "Naturally rich in organic oils, impervious to termites and humid tropical weather.",
    "craft.mat2.title": "European White Oak & American Walnut",
    "craft.mat2.desc": "Subtle linear architectural grain finished with eco-friendly organic hard-wax oils.",
    "craft.mat3.title": "Full-Grain Italian Leather & Belgian Boucle",
    "craft.mat3.desc": "Breathable buttery soft leather and durable textured tactile woven upholstery.",
    "craft.mat4.title": "Mortise & Tenon Structural Joinery",
    "craft.mat4.desc": "Ancient interlocking wooden joinery eliminating creaks and unstable wobbles.",

    // Trust & Boomer signals
    "trust.tag": "PEACE OF MIND",
    "trust.title": "10-Year Warranty & Comprehensive White-Glove Care",
    "trust.subtitle": "We believe in long-lasting customer relationships anchored by written integrity.",
    "trust.badge1.title": "Official 10-Year Warranty Certificate",
    "trust.badge1.desc": "Formal structural guarantee against warping, splitting, or termite attack under regular usage.",
    "trust.badge2.title": "Free White-Glove Delivery & In-Home Assembly",
    "trust.badge2.desc": "No stressful manual assembly. Our specialists position and polish every piece in place.",
    "trust.badge3.title": "Visit Our Flagship Showroom & Workshop",
    "trust.badge3.desc": "Experience wood grain textures and sofa comfort firsthand at our Jakarta & Jepara venues.",
    "trust.badge4.title": "Dedicated Human WhatsApp Specialist",
    "trust.badge4.desc": "Consult with a real interior expert with zero bot frustration for tailored pricing advice.",

    // Testimonials
    "testi.tag": "CLIENT VOICES",
    "testi.title": "Trusted by Luxury Homeowners, Architects & Estates",
    "testi.subtitle": "Real testimonials from homeowners and designers who treasure the soul of Efendy Furniture.",

    // Form
    "form.tag": "DIRECT CONNECTION",
    "form.title": "WhatsApp Consultation & Custom Quotation",
    "form.subtitle": "Complete this brief form or chat directly on WhatsApp for an immediate response.",
    "form.name": "Your Full Name",
    "form.phone": "WhatsApp Number (Active)",
    "form.category": "Desired Furniture Type",
    "form.material": "Preferred Wood / Upholstery",
    "form.budget": "Estimated Budget (Optional)",
    "form.message": "Notes / Room Dimensions / Specific Requests",
    "form.submit": "Send Details to WhatsApp",
    "form.submitNote": "This message is neatly formatted and launches your WhatsApp app instantly.",
    "form.directCall": "Or Call Our Direct Hotline / WhatsApp:",

    // Footer
    "footer.desc":
      "Efendy Furniture is a premier handcrafted furniture house hailing from Jepara with global design sensibility. Imbuing homes with warm natural hardwoods and timeless poise.",
    "footer.addressTitle": "Showrooms & Workshops",
    "footer.addressJkt": "Jakarta Gallery: Jl. Kemang Raya No. 42B, South Jakarta",
    "footer.addressJpr": "Jepara Atelier: Jl. Pemuda Raya No. 108, Tahunan, Jepara, Central Java",
    "footer.hours": "Open Daily: 08:00 AM - 09:00 PM WIB",
    "footer.rights": "All Rights Reserved.",
  },
};

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Gen Z requirement: default dark mode
  const [theme, setTheme] = useState<Theme>("light");
  const [lang, setLang] = useState<Language>("id");
  const [fontSize, setFontSize] = useState<FontSize>("normal");
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [consultModalData, setConsultModalData] = useState<ConsultationInitialData>({});

  useEffect(() => {
    // Check saved theme or default to clean white light mode
    const savedTheme = localStorage.getItem("efendy_theme") as Theme | null;
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Check saved lang
    const savedLang = localStorage.getItem("efendy_lang") as Language | null;
    if (savedLang) setLang(savedLang);

    // Check saved font size
    const savedFontSize = localStorage.getItem("efendy_fontsize") as FontSize | null;
    if (savedFontSize) {
      setFontSize(savedFontSize);
      if (savedFontSize === "large") {
        document.documentElement.classList.add("font-large");
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("efendy_theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleLang = () => {
    const nextLang: Language = lang === "id" ? "en" : "id";
    setLang(nextLang);
    localStorage.setItem("efendy_lang", nextLang);
  };

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("efendy_lang", newLang);
  };

  const toggleFontSize = () => {
    const nextSize: FontSize = fontSize === "normal" ? "large" : "normal";
    setFontSize(nextSize);
    localStorage.setItem("efendy_fontsize", nextSize);
    if (nextSize === "large") {
      document.documentElement.classList.add("font-large");
    } else {
      document.documentElement.classList.remove("font-large");
    }
  };

  const openConsultModal = (data?: ConsultationInitialData) => {
    if (data) setConsultModalData(data);
    else setConsultModalData({});
    setIsConsultModalOpen(true);
  };

  const closeConsultModal = () => {
    setIsConsultModalOpen(false);
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations["id"]?.[key] || key;
  };

  return (
    <CompanyContext.Provider
      value={{
        theme,
        toggleTheme,
        lang,
        setLang: handleSetLang,
        toggleLang,
        fontSize,
        toggleFontSize,
        isConsultModalOpen,
        openConsultModal,
        closeConsultModal,
        consultModalData,
        t,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = (): CompanyContextType => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
};
