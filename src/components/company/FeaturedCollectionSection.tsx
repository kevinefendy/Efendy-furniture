"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCompany } from "@/context/CompanyContext";
import { MessageCircle, Eye, Heart, X } from "lucide-react";
import TiltCard from "@/components/common/TiltCard";
import ScrollReveal from "@/components/common/ScrollReveal";

interface ProductItem {
  id: string;
  nameId: string;
  nameEn: string;
  category: "sofa" | "meja" | "kursi" | "lemari" | "custom";
  categoryLabelId: string;
  categoryLabelEn: string;
  style: string;
  price: string;
  materialId: string;
  materialEn: string;
  dimensionsId: string;
  dimensionsEn: string;
  images: string[];
  colors: string[];
  isNew?: boolean;
  descriptionId: string;
  descriptionEn: string;
}

const PRODUCTS_DATA: ProductItem[] = [
  // SOFA
  {
    id: "sofa-1",
    nameId: "Sofa Minimalis Sora 3-Dudukan",
    nameEn: "Sora 3-Seater Minimalist Sofa",
    category: "sofa",
    categoryLabelId: "Sofa",
    categoryLabelEn: "Sofa",
    style: "Japandi",
    price: "Rp 14.800.000",
    materialId: "Linen Belgia, Rangka Kayu Oak Solid, Busa Tahan Kempis",
    materialEn: "Belgian Linen, Solid White Oak, High-Resilience Foam",
    dimensionsId: "220 × 95 × 78 cm",
    dimensionsEn: "220 × 95 × 78 cm",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
    ],
    colors: ["#E8E2D5", "#C8B29B", "#2B2B2B"],
    isNew: true,
    descriptionId: "Sofa santai berprofil rendah dengan bantalan empuk linen Belgia dan rangka kayu jati tahan puluhan tahun.",
    descriptionEn: "Low-profile lounge sofa with duck-down feather blend and certified solid oak frame crafted for generations.",
  },
  {
    id: "sofa-2",
    nameId: "Sofa Melengkung Modular Elysian",
    nameEn: "Elysian Modular Curved Sofa",
    category: "sofa",
    categoryLabelId: "Sofa",
    categoryLabelEn: "Sofa",
    style: "Contemporary",
    price: "Rp 18.500.000",
    materialId: "Beludru Italia, Kayu Mahoni Oven, Pegas Saku Presisi",
    materialEn: "Italian Velvet, Kiln-Dried Solid Mahogany, Pocket Spring",
    dimensionsId: "300 × 110 × 75 cm",
    dimensionsEn: "300 × 110 × 75 cm",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
    ],
    colors: ["#D4C9BC", "#6E6B64", "#3A453C"],
    descriptionId: "Siluet kurva organik modern yang dapat disusun modular sesuai tata letak ruangan keluarga Anda.",
    descriptionEn: "Sculptural organic silhouette designed with modular flexibility to anchor modern open-concept spaces.",
  },

  // MEJA
  {
    id: "meja-1",
    nameId: "Meja Makan Solid Oak Luna",
    nameEn: "Luna Solid Oak Dining Table",
    category: "meja",
    categoryLabelId: "Meja",
    categoryLabelEn: "Table",
    style: "Scandinavian",
    price: "Rp 12.900.000",
    materialId: "Kayu Oak Putih Eropa FSC, Lapisan Matte Natural",
    materialEn: "FSC-Certified European White Oak, Natural Matte Lacquer",
    dimensionsId: "200 × 95 × 76 cm (6-8 Kursi)",
    dimensionsEn: "200 × 95 × 76 cm (Seats 6-8)",
    images: [
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=80",
    ],
    colors: ["#CDB38B", "#8C6E4E"],
    isNew: true,
    descriptionId: "Meja makan kayu solid tepi membulat organik. Sambungan mortise & tenon presisi tanpa goyangan.",
    descriptionEn: "Sculptural dining table with rounded organic edges and sturdy architectural cylindrical joinery.",
  },
  {
    id: "meja-2",
    nameId: "Meja Kerja Eksekutif Aethel Walnut",
    nameEn: "Aethel Walnut Executive Desk",
    category: "meja",
    categoryLabelId: "Meja",
    categoryLabelEn: "Table",
    style: "Modern Minimalist",
    price: "Rp 11.200.000",
    materialId: "Kayu Walnut Amerika, Aksen Kuningan, Jalur Kabel",
    materialEn: "American Walnut, Brushed Brass Accents, Cable Port",
    dimensionsId: "180 × 80 × 75 cm",
    dimensionsEn: "180 × 80 × 75 cm",
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    ],
    colors: ["#5A4434", "#2B2118"],
    descriptionId: "Meja kerja kayu walnut gelap dengan sistem laci redam halus dan penataan kabel tersembunyi.",
    descriptionEn: "Refined dark walnut desk with concealed wire channels and quiet soft-closing wooden drawers.",
  },

  // KURSI
  {
    id: "kursi-1",
    nameId: "Kursi Santai Minimalis Kanso",
    nameEn: "Kanso Minimal Lounge Chair",
    category: "kursi",
    categoryLabelId: "Kursi",
    categoryLabelEn: "Chair",
    style: "Japandi",
    price: "Rp 4.750.000",
    materialId: "Kain Wol Boucle Bertekstur, Rangka Jati Solid",
    materialEn: "Textured Wool Boucle, Solid Teak Base, Steel Core",
    dimensionsId: "82 × 85 × 76 cm",
    dimensionsEn: "82 × 85 × 76 cm",
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=80",
    ],
    colors: ["#EDE7DE", "#6B705C", "#2B2B2B"],
    isNew: true,
    descriptionId: "Kursi santai dengan kemiringan ergonomis 105 derajat yang menopang punggung secara sempurna.",
    descriptionEn: "Generous reclined ergonomic angle with tactile wool boucle upholstery creating a sanctuary for reading.",
  },
  {
    id: "kursi-2",
    nameId: "Kursi Makan Ukir Neva",
    nameEn: "Neva Sculpted Dining Chair",
    category: "kursi",
    categoryLabelId: "Kursi",
    categoryLabelEn: "Chair",
    style: "Modern Craft",
    price: "Rp 2.850.000",
    materialId: "Kayu Oak Putih Eropa, Bantalan Kulit Asli Italia",
    materialEn: "European White Oak, Italian Leather Seat Cushion",
    dimensionsId: "52 × 54 × 78 cm",
    dimensionsEn: "52 × 54 × 78 cm",
    images: [
      "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80",
    ],
    colors: ["#CDB38B", "#3D2B1F"],
    descriptionId: "Kursi makan dengan lekukan kayu halus dipahat tangan dan bantalan kulit asli yang nyaman.",
    descriptionEn: "Hand-sculpted curved solid oak frame paired with supple top-grain Italian leather cushion.",
  },

  // LEMARI
  {
    id: "lemari-1",
    nameId: "Lemari Buffet Kisi-Kisi Verona",
    nameEn: "Verona Slatted Credenza Buffet",
    category: "lemari",
    categoryLabelId: "Lemari",
    categoryLabelEn: "Cabinet",
    style: "Scandinavian",
    price: "Rp 13.500.000",
    materialId: "Kayu Jati Solid Penuh, Pintu Geser Kisi Akustik",
    materialEn: "Full FSC Solid Teak, Sliding Slatted Doors",
    dimensionsId: "190 × 45 × 80 cm",
    dimensionsEn: "190 × 45 × 80 cm",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80",
    ],
    colors: ["#B89A74", "#4A3B32"],
    descriptionId: "Buffet kisi-kisi kayu jati untuk sirkulasi udara audio dan estetika rapi ruang makan & keluarga.",
    descriptionEn: "Multi-functional credenza with precision slatted teak doors allowing airflow for devices and storage.",
  },
  {
    id: "lemari-2",
    nameId: "Sistem Lemari Pakaian Artemis",
    nameEn: "Artemis Luxury Wardrobe System",
    category: "lemari",
    categoryLabelId: "Lemari",
    categoryLabelEn: "Wardrobe",
    style: "Architectural",
    price: "Rp 24.000.000",
    materialId: "Inti Rangka Kayu Jati, Kaca Smoked, Lampu LED Hangat",
    materialEn: "Teak Core, Smoked Glass, Integrated Warm LED",
    dimensionsId: "Kustom Ukuran Dinding",
    dimensionsEn: "Custom Wall Dimensions",
    images: [
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    ],
    colors: ["#3A3835", "#1E1E1C"],
    isNew: true,
    descriptionId: "Sistem lemari pakaian mewah dengan pencahayaan LED interior hangat dan partisi fungsional.",
    descriptionEn: "Architectural walk-in wardrobe system with ambient sensor LED lighting and bespoke organizers.",
  },

  // CUSTOM FURNITURE
  {
    id: "custom-1",
    nameId: "Tempat Tidur Melayang Kamar Utama",
    nameEn: "Bespoke Master Suite Floating Bed",
    category: "custom",
    categoryLabelId: "Custom",
    categoryLabelEn: "Bespoke",
    style: "Bespoke",
    price: "Konsultasi Desain",
    materialId: "Kustom Kayu Jati / Oak / Kain Boucle",
    materialEn: "Custom Solid Teak / Oak / Boucle Upholstery",
    dimensionsId: "Disesuaikan Denah Ruangan",
    dimensionsEn: "Customized to Room Plan",
    images: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=80",
    ],
    colors: ["#E0D7CC", "#8C6E4E", "#2B2B2B"],
    descriptionId: "Layanan perabot kustom terintegrasi dari tempat tidur floating, kabinet dinding, hingga meja rias.",
    descriptionEn: "Complete custom suite service integrating acoustic headboard, integrated bedside tables, and vanity.",
  },
];

export default function FeaturedCollectionSection() {
  const { lang, openConsultModal } = useCompany();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = [
    { id: "all", label: lang === "id" ? "Semua Koleksi" : "All Pieces" },
    { id: "sofa", label: lang === "id" ? "Sofa" : "Sofas" },
    { id: "meja", label: lang === "id" ? "Meja" : "Tables" },
    { id: "kursi", label: lang === "id" ? "Kursi" : "Chairs" },
    { id: "lemari", label: lang === "id" ? "Lemari" : "Storage" },
    { id: "custom", label: lang === "id" ? "Custom Bespoke" : "Custom Bespoke" },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <section
      id="koleksi"
      className="py-20 sm:py-28 bg-white dark:bg-[#121211] border-b border-[#EEEEEC] dark:border-[#2A2A26] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Minimal Header */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-12 sm:mb-16 gap-6">
          <ScrollReveal direction="up">
            <span className="text-xs uppercase tracking-[0.25em] text-[#817A71] dark:text-[#A19A8F] font-semibold block mb-2 font-sans">
              {lang === "id" ? "Katalog Pilihan" : "Curated Collection"}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#20201E] dark:text-[#F7F5F0] tracking-tight">
              {lang === "id" ? "Sofa, Meja, Kursi & Lemari" : "Sofas, Tables, Chairs & Cabinets"}
            </h2>
          </ScrollReveal>

          {/* Minimal Clean Category Pills */}
          <ScrollReveal direction="up" delayMs={50}>
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 font-sans">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all duration-200 rounded-sm ${
                    activeCategory === cat.id
                      ? "bg-[#20201E] text-white dark:bg-white dark:text-[#121211]"
                      : "text-[#817A71] dark:text-[#A19A8F] hover:text-[#20201E] dark:hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>

        {/* Modern Crisp Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product, idx) => {
            const name = lang === "id" ? product.nameId : product.nameEn;
            const categoryLabel = lang === "id" ? product.categoryLabelId : product.categoryLabelEn;
            const material = lang === "id" ? product.materialId : product.materialEn;

            return (
              <ScrollReveal key={product.id} direction="up" delayMs={idx * 60}>
                <TiltCard
                  maxTilt={4}
                  scale={1.01}
                  glare={true}
                  className="group relative flex flex-col bg-white dark:bg-[#1A1A18] border border-[#EEEEEC] dark:border-[#2A2A26] rounded-sm overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  {/* Product Image Frame */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F5F5F5] dark:bg-[#20201D]">
                    <Image
                      src={product.images[0]}
                      alt={name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 font-sans">
                      {product.isNew && (
                        <span className="bg-[#20201E] text-white text-[10px] uppercase font-semibold px-2 py-0.5 tracking-widest rounded-sm">
                          {lang === "id" ? "Baru" : "New"}
                        </span>
                      )}
                      <span className="bg-white/90 dark:bg-black/60 backdrop-blur-sm text-[#20201E] dark:text-white text-[10px] uppercase font-semibold px-2 py-0.5 tracking-widest rounded-sm border border-black/5 dark:border-white/10">
                        {categoryLabel}
                      </span>
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 ${
                        wishlist.includes(product.id)
                          ? "bg-[#20201E] text-white"
                          : "bg-white/80 dark:bg-black/60 backdrop-blur-sm text-[#20201E] dark:text-white hover:bg-white"
                      }`}
                      aria-label="Wishlist"
                    >
                      <Heart
                        size={15}
                        className={wishlist.includes(product.id) ? "fill-current text-rose-500" : ""}
                      />
                    </button>

                    {/* Quick View Hover Action Bar */}
                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10 hidden sm:block font-sans">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="w-full py-2.5 bg-white/95 dark:bg-[#20201E]/95 backdrop-blur-sm text-[#20201E] dark:text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#20201E] hover:text-white dark:hover:bg-white dark:hover:text-[#20201E] transition-colors flex items-center justify-center gap-1.5 shadow-sm rounded-sm"
                      >
                        <Eye size={14} />
                        <span>{lang === "id" ? "Detail Cepat" : "Quick View"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3 font-sans">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#817A71] dark:text-[#A19A8F] mb-1">
                        <span className="uppercase tracking-wider font-medium">
                          {categoryLabel}
                        </span>
                        <span className="font-serif italic">{product.style}</span>
                      </div>

                      <h3
                        onClick={() => setSelectedProduct(product)}
                        className="font-serif text-xl sm:text-2xl font-normal text-[#20201E] dark:text-[#F7F5F0] hover:text-[#A88968] transition-colors cursor-pointer"
                      >
                        {name}
                      </h3>

                      <p className="text-xs text-[#817A71] dark:text-[#A19A8F] mt-1 line-clamp-1">
                        {material}
                      </p>
                    </div>

                    {/* Footer: Price & Color Swatches + WhatsApp Action */}
                    <div className="pt-3 border-t border-[#E5DFD5]/60 dark:border-[#2A2A26] flex items-center justify-between">
                      <div>
                        <span className="font-sans text-sm font-bold text-[#20201E] dark:text-[#F7F5F0]">
                          {product.price}
                        </span>
                        <div className="flex items-center gap-1 mt-1">
                          {product.colors.map((color, i) => (
                            <span
                              key={i}
                              className="w-2.5 h-2.5 rounded-full border border-black/20 dark:border-white/20"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          openConsultModal({
                            category: categoryLabel,
                            productName: name,
                          })
                        }
                        className="px-3 py-1.5 rounded-sm bg-[#F7F5F0] dark:bg-[#252522] hover:bg-[#20201E] hover:text-white dark:hover:bg-white dark:hover:text-[#20201E] text-xs font-semibold uppercase tracking-wider text-[#20201E] dark:text-[#F7F5F0] border border-[#E5DFD5] dark:border-[#333] transition-colors flex items-center gap-1.5"
                      >
                        <MessageCircle size={13} className="text-emerald-600 dark:text-emerald-400" />
                        <span>{lang === "id" ? "Tanya WA" : "Inquire WA"}</span>
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[9990] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-sm bg-white dark:bg-[#1A1A18] text-[#20201E] dark:text-[#F7F5F0] shadow-2xl p-6 sm:p-8 overflow-hidden border border-[#EEEEEC] dark:border-[#2A2A26]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Tutup"
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="relative aspect-[4/5] w-full rounded-sm overflow-hidden bg-[#F5F5F5] dark:bg-[#20201D]">
                <Image
                  src={selectedProduct.images[0]}
                  alt={lang === "id" ? selectedProduct.nameId : selectedProduct.nameEn}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4 font-sans">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#817A71] dark:text-[#A19A8F]">
                    {lang === "id" ? selectedProduct.categoryLabelId : selectedProduct.categoryLabelEn} · {selectedProduct.style}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal mt-1 leading-snug">
                    {lang === "id" ? selectedProduct.nameId : selectedProduct.nameEn}
                  </h3>
                  <p className="font-sans text-xl font-bold mt-2">
                    {selectedProduct.price}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#817A71] dark:text-[#A19A8F] leading-relaxed">
                  {lang === "id" ? selectedProduct.descriptionId : selectedProduct.descriptionEn}
                </p>

                <div className="pt-2 border-t border-[#E5DFD5] dark:border-[#2A2A26] text-xs space-y-1.5 text-[#817A71] dark:text-[#A19A8F]">
                  <p>
                    <strong>{lang === "id" ? "Bahan:" : "Material:"}</strong>{" "}
                    {lang === "id" ? selectedProduct.materialId : selectedProduct.materialEn}
                  </p>
                  <p>
                    <strong>{lang === "id" ? "Dimensi:" : "Dimensions:"}</strong>{" "}
                    {lang === "id" ? selectedProduct.dimensionsId : selectedProduct.dimensionsEn}
                  </p>
                  <p>
                    <strong>{lang === "id" ? "Garansi:" : "Warranty:"}</strong>{" "}
                    {lang === "id" ? "10 Tahun Rangka Solid Wood" : "10-Year Solid Hardwood Frame"}
                  </p>
                  <p>
                    <strong>{lang === "id" ? "Layanan:" : "Service:"}</strong>{" "}
                    {lang === "id" ? "Gratis Pengiriman & Pemasangan" : "Free White-Glove In-Home Setup"}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      const prod = selectedProduct;
                      const name = lang === "id" ? prod.nameId : prod.nameEn;
                      const category = lang === "id" ? prod.categoryLabelId : prod.categoryLabelEn;
                      setSelectedProduct(null);
                      openConsultModal({
                        category,
                        productName: name,
                      });
                    }}
                    className="w-full py-3.5 bg-[#20201E] hover:bg-[#A88968] dark:bg-white dark:text-[#121211] dark:hover:bg-[#A88968] text-white text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 rounded-sm transition-colors"
                  >
                    <MessageCircle size={15} />
                    <span>
                      {lang === "id"
                        ? "Konsultasi Produk via WhatsApp"
                        : "Inquire Product via WhatsApp"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
