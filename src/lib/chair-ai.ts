import { PRODUCTS } from "@/data/products";
import { formatIDR } from "@/lib/utils";
import type { Product } from "@/types";

export interface ChairAIProductHit {
  name: string;
  slug: string;
  price: number;
  category: string;
  stock: number;
}

export interface ChairAIResponse {
  text: string;
  products?: ChairAIProductHit[];
  links?: { label: string; href: string }[];
  suggestions?: string[];
}

const toHit = (p: Product): ChairAIProductHit => ({
  name: p.name,
  slug: p.slug,
  price: p.price,
  category: p.category,
  stock: p.stock,
});

function searchProducts(query: string, limit = 3): Product[] {
  const q = query.toLowerCase();
  const tokens = q.split(/[^a-z0-9]+/).filter((t) => t.length > 2);

  const scored = PRODUCTS.map((p) => {
    const hay = `${p.name} ${p.category} ${p.room} ${p.style} ${p.collectionName ?? ""} ${p.description} ${p.material} ${p.colors.map((c) => c.name).join(" ")}`.toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (p.name.toLowerCase().includes(t)) score += 5;
      else if (p.category.toLowerCase().includes(t)) score += 4;
      else if (hay.includes(t)) score += 2;
    }
    return { p, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.p);
}

function byCategory(keyword: string, limit = 3): Product[] {
  const map: Record<string, string> = {
    sofa: "Sofa",
    kursi: "Kursi",
    chair: "Kursi",
    meja: "Meja",
    table: "Meja",
    bed: "Tempat Tidur",
    kasur: "Tempat Tidur",
    "tempat tidur": "Tempat Tidur",
    lemari: "Lemari",
    storage: "Lemari",
    rak: "Rak",
    lampu: "Dekorasi",
    lighting: "Dekorasi",
    dekor: "Dekorasi",
    vas: "Dekorasi",
    hiasan: "Dekorasi",
    outdoor: "Outdoor",
    teras: "Outdoor",
  };
  const cat = map[keyword.toLowerCase()];
  if (!cat) return [];
  return PRODUCTS.filter((p) => p.category === cat).slice(0, limit);
}

const DEFAULT_SUGGESTIONS = [
  "Apa itu Efendy Furniture?",
  "Rekomendasi sofa ruang tamu?",
  "Bagaimana cara checkout?",
];

export function getChairAIResponse(rawInput: string): ChairAIResponse {
  const input = rawInput.trim();
  const q = input.toLowerCase();

  if (!q) {
    return {
      text: "Silakan ketik pertanyaanmu seputar furniture, produk, pengiriman, atau pembayaran.",
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  // ——— Sapaan ———
  if (/^(halo|hallo|hai|hi|hello|pagi|siang|sore|malam|assalamu)/.test(q)) {
    return {
      text: "Halo! Saya Chair AI, asisten Efendy Furniture. Saya bisa bantu cari sofa, kursi, meja, tempat tidur, lampu, sampai bantu checkout & lacak pesanan. Ada yang ingin kamu tanyakan?",
      suggestions: [
        "Apa itu Efendy Furniture?",
        "Rekomendasi kursi kerja?",
        "Bagaimana cara mencari sofa?",
      ],
    };
  }

  // ——— Apa itu Efendy Furniture ———
  if (
    q.includes("apa itu efendy") ||
    q.includes("tentang efendy") ||
    q.includes("efendy furniture") ||
    (q.includes("apa itu") && q.length < 30)
  ) {
    return {
      text: "Efendy Furniture adalah brand furniture modern terinspirasi Article + West Elm — minimal, warm, dan premium. Kamu bisa belanja per ruangan (Living Room, Bedroom, Dining Room, Workspace), per koleksi (Nara & Awan), baca inspirasi interior, lalu checkout lengkap: cart → checkout → pembayaran simulasi → tracking pengiriman.",
      links: [
        { label: "Lihat Katalog", href: "/shop" },
        { label: "Koleksi Kami", href: "/collections" },
        { label: "Inspirasi Interior", href: "/inspiration" },
      ],
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  // ——— Terima kasih / bye ———
  if (q.includes("terima kasih") || q.includes("makasih") || q.includes("thanks") || q.includes("thank")) {
    return {
      text: "Sama-sama! Senang bisa membantu menata ruang impianmu. Kalau butuh rekomendasi lain, tinggal tanya Chair AI ya.",
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }
  if (q.includes("bye") || q.includes("dadah") || q.includes("sampai jumpa")) {
    return {
      text: "Sampai jumpa! Jangan lupa mampir lagi kalau butuh furniture baru untuk rumahmu.",
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  // ——— Promo / diskon / sale ———
  if (q.includes("promo") || q.includes("diskon") || q.includes("sale") || q.includes("murah") || q.includes("potongan")) {
    const deals = PRODUCTS.filter((p) => p.originalPrice).slice(0, 3);
    const list = deals.map((p) => `• ${p.name} — ${formatIDR(p.price)} (dari ${formatIDR(p.originalPrice!)})`).join("\n");
    return {
      text: `Ada dong! Ini produk yang lagi turun harga:\n${list}\n\nKlik produk untuk lihat detail & stoknya.`,
      products: deals.map(toHit),
      links: [{ label: "Lihat Semua Promo", href: "/shop?deal=sale" }],
      suggestions: ["Rekomendasi sofa di bawah 10 juta?", "Ada lampu murah?"],
    };
  }

  // ——— Budget / harga ———
  const budgetMatch = q.match(/(\d+)\s?(jt|juta|m|ribu|k)?/);
  if (q.includes("budget") || q.includes("bawah") || q.includes("di bawah") || q.includes("range") || q.includes("harga")) {
    let max = 10_000_000;
    if (budgetMatch) {
      const num = parseInt(budgetMatch[1], 10);
      const unit = budgetMatch[2];
      if (unit === "jt" || unit === "juta" || unit === "m") max = num * 1_000_000;
      else if (unit === "ribu" || unit === "k") max = num * 1_000;
      else if (num < 1000) max = num * 1_000_000;
      else max = num;
    }
    const hits = PRODUCTS.filter((p) => p.price <= max)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
    if (hits.length === 0) {
      return {
        text: `Untuk budget ${formatIDR(max)}, stok kami yang paling dekat adalah produk termurah kami. Coba naikkan sedikit budgetnya?`,
        links: [{ label: "Lihat Katalog", href: "/shop" }],
        suggestions: DEFAULT_SUGGESTIONS,
      };
    }
    return {
      text: `Siap! Ini rekomendasi terbaik di bawah ${formatIDR(max)}:\n${hits.map((p) => `• ${p.name} — ${formatIDR(p.price)} (★ ${p.rating})`).join("\n")}`,
      products: hits.map(toHit),
      links: [{ label: "Lihat Semua", href: "/shop" }],
      suggestions: ["Ada yang lebih murah?", "Rekomendasi sofa ruang tamu?"],
    };
  }

  // ——— Pengiriman / ongkir ———
  if (q.includes("kirim") || q.includes("ongkir") || q.includes("pengiriman") || q.includes("ekspedisi") || q.includes("berapa lama") || q.includes("sampai")) {
    return {
      text: "Kami punya 3 opsi pengiriman:\n• Regular — 3–5 hari — Rp 25.000\n• Express — 1–2 hari — Rp 45.000\n• Same Day — hari ini juga — Rp 65.000\n\nOngkir & estimasi otomatis dihitung saat checkout dan bisa dilacak di halaman Tracking.",
      links: [
        { label: "Ke Keranjang", href: "/cart" },
        { label: "Cara Checkout", href: "/checkout" },
      ],
      suggestions: ["Bagaimana cara checkout?", "Metode pembayaran apa saja?"],
    };
  }

  // ——— Pembayaran ———
  if (q.includes("bayar") || q.includes("payment") || q.includes("qris") || q.includes("transfer") || q.includes("gopay") || q.includes("ovo") || q.includes("dana") || q.includes("cod") || q.includes("virtual account") || q.includes("va ")) {
    return {
      text: "Pembayaran di Efendy Furniture mudah (simulasi frontend, tanpa gateway asli):\n• Bank Transfer (BCA, BNI, BRI, Mandiri)\n• Virtual Account\n• E-Wallet (GoPay, OVO, DANA)\n• QRIS\n• COD\n\nPilih metode di halaman Payment lalu klik Simulate Payment.",
      links: [{ label: "Ke Pembayaran", href: "/payment" }],
      suggestions: ["Bagaimana cara checkout?", "Bagaimana cara lacak pesanan?"],
    };
  }

  // ——— Checkout / cart ———
  if (q.includes("checkout") || q.includes("check out") || q.includes("keranjang") || q.includes("cart") || q.includes("cara beli") || q.includes("cara order") || q.includes("cara pesan")) {
    return {
      text: "Cara belanja gampang banget:\n1. Buka produk → pilih warna/ukuran & jumlah → Add to Cart\n2. Buka Cart untuk atur jumlah\n3. Checkout → isi nama, HP, alamat & kota\n4. Pilih pengiriman (Regular/Express/Same Day)\n5. Pilih pembayaran → Simulate Payment\n6. Dapat Order ID → lacak di Tracking\n\nCart tersimpan otomatis di browser (localStorage) jadi aman walau refresh.",
      links: [
        { label: "Lihat Katalog", href: "/shop" },
        { label: "Buka Keranjang", href: "/cart" },
        { label: "Checkout Sekarang", href: "/checkout" },
      ],
      suggestions: ["Metode pembayaran apa saja?", "Bagaimana cara lacak pesanan?"],
    };
  }

  // ——— Tracking / order ———
  if (q.includes("lacak") || q.includes("tracking") || q.includes("pesanan") || q.includes("order") || q.includes("status") || q.includes("resi") || q.includes("sampai")) {
    return {
      text: "Untuk melacak pesanan, buka halaman Order dengan Order ID kamu (contoh: #ORD-20260930-001). Statusnya: Dibuat → Dibayar → Diproses → Diserahkan ke Kurir → Dalam Pengiriman → Sampai. Ada tombol simulasi Next Status untuk demo.",
      links: [
        { label: "Lacak Pesanan", href: "/tracking/ORD-20260930-001" },
        { label: "Keranjang Saya", href: "/cart" },
      ],
      suggestions: ["Bagaimana cara checkout?", "Ongkir berapa?"],
    };
  }

  // ——— Wishlist ———
  if (q.includes("wishlist") || q.includes("simpan") || q.includes("favorit") || q.includes("suka")) {
    return {
      text: "Klik ikon hati (♡) di kartu produk untuk menyimpan ke Wishlist. Semua wishlist tersimpan di browser dan bisa dibuka kapan saja di halaman Wishlist.",
      links: [{ label: "Buka Wishlist", href: "/wishlist" }],
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  // ——— Material / bahan ———
  if (q.includes("material") || q.includes("bahan") || q.includes("kayu") || q.includes("jati") || q.includes("linen") || q.includes("beludru") || q.includes("velvet") || q.includes("rotan") || q.includes("kualitas")) {
    const hits = searchProducts(input, 3);
    return {
      text: hits.length
        ? `Untuk urusan material, ini yang bahannya premium:\n${hits.map((p) => `• ${p.name}\n  ${p.material}`).join("\n")}`
        : "Kami memakai material premium: solid teak & oak FSC-certified, Belgian linen, wool boucle, top-grain leather, dan rotan anyaman Cirebon. Setiap produk mencantumkan material lengkap di halaman detail.",
      products: hits.map(toHit),
      links: [{ label: "Lihat Katalog", href: "/shop" }],
      suggestions: ["Rekomendasi sofa ruang tamu?", "Meja makan yang bagus?"],
    };
  }

  // ——— Ukuran / dimensi ———
  if (q.includes("ukuran") || q.includes("dimensi") || q.includes("cm ") || q.includes("lebar") || q.includes("panjang") || q.includes("muat") || q.includes("kecil") || q.includes("apartemen")) {
    return {
      text: "Tips pilih ukuran:\n• Ukur ruangan & sisakan 75–90 cm jalur jalan\n• Sofa 2-seater (±190 cm) cocok untuk apartemen kecil — lihat Saga Loveseat\n• Meja makan 160 cm untuk 4 orang, 200 cm untuk 6 orang\n• Setiap halaman produk mencantumkan dimensi lengkap (P × L × T).",
      links: [
        { label: "Panduan Pilih Sofa", href: "/inspiration" },
        { label: "Lihat Katalog", href: "/shop" },
      ],
      suggestions: ["Apartemen kecil cocoknya apa?", "Rekomendasi sofa ruang tamu?"],
    };
  }

  // ——— Ruangan ———
  if (q.includes("ruang tamu") || q.includes("living")) {
    const hits = PRODUCTS.filter((p) => p.room === "ruang-tamu").slice(0, 3);
    return {
      text: `Untuk ruang tamu yang calm & cozy, ini favorit customer:\n${hits.map((p) => `�?� ${p.name} �?" ${formatIDR(p.price)}`).join("\n")}`,
      products: hits.map(toHit),
      links: [{ label: "Shop Living Room", href: "/rooms/ruang-tamu" }],
      suggestions: ["Rekomendasi sofa di bawah 10 juta?", "Lampu ruang tamu yang bagus?"],
    };
  }
  if (q.includes("kamar") || q.includes("bedroom") || q.includes("tidur")) {
    const hits = PRODUCTS.filter((p) => p.room === "kamar-tidur").slice(0, 3);
    return {
      text: `Buat kamar yang tenang, coba ini:\n${hits.map((p) => `�?� ${p.name} �?" ${formatIDR(p.price)}`).join("\n")}`,
      products: hits.map(toHit),
      links: [{ label: "Shop Bedroom", href: "/rooms/kamar-tidur" }],
      suggestions: ["Kasur yang nyaman?", "Lemari pakaian yang bagus?"],
    };
  }
  if (q.includes("makan") || q.includes("dining") || q.includes("dapur")) {
    const hits = PRODUCTS.filter((p) => p.room === "ruang-makan").slice(0, 3);
    return {
      text: `Untuk ruang makan hangat, rekomendasi saya:\n${hits.map((p) => `�?� ${p.name} �?" ${formatIDR(p.price)}`).join("\n")}`,
      products: hits.map(toHit),
      links: [{ label: "Shop Dining Room", href: "/rooms/ruang-makan" }],
      suggestions: ["Meja makan yang bagus?", "Kursi makan yang nyaman?"],
    };
  }
  if (q.includes("kerja") || q.includes("kantor") || q.includes("workspace") || q.includes("wfh") || q.includes("belajar")) {
    const hits = PRODUCTS.filter((p) => p.room === "kantor").slice(0, 3);
    return {
      text: `Buat setup kerja fokus & nyaman:\n${hits.map((p) => `�?� ${p.name} �?" ${formatIDR(p.price)}`).join("\n")}`,
      products: hits.map(toHit),
      links: [{ label: "Shop Workspace", href: "/rooms/kantor" }],
      suggestions: ["Kursi ergonomis?", "Meja kerja minimalis?"],
    };
  }

  // ——— Koleksi ———
  if (q.includes("koleksi") || q.includes("nara") || q.includes("awan") || q.includes("collection")) {
    return {
      text: "Kami punya 2 koleksi utama:\n• NARA — warm wood, soft curves, slow living (Sora Sofa, Luna Table, Kanso Chair)\n• AWAN — ringan & airy untuk apartemen (Amara Chair, Sinta Bed, Pagi Bookshelf)",
      links: [{ label: "Jelajahi Koleksi", href: "/collections" }],
      suggestions: ["Koleksi Nara apa saja?", "Rekomendasi sofa ruang tamu?"],
    };
  }

  // ——— Kategori langsung ———
  const catKeywords = ["sofa", "kursi", "chair", "meja", "table", "bed", "kasur", "lemari", "storage", "rak", "lampu", "lighting", "dekor", "vas"];
  for (const kw of catKeywords) {
    if (q.includes(kw)) {
      const hits = byCategory(kw, 3);
      const fallback = hits.length ? hits : searchProducts(input, 3);
      if (fallback.length === 0) break;
      return {
        text: `Ketemu! Ini pilihan ${fallback[0].category} terbaik untukmu:\n${fallback.map((p) => `• ${p.name} — ${formatIDR(p.price)} (★ ${p.rating}, stok ${p.stock})`).join("\n")}\n\nKlik produk untuk lihat warna, ukuran & material lengkap.`,
        products: fallback.map(toHit),
        links: [{ label: `Shop Semua ${fallback[0].category}`, href: `/shop?category=${fallback[0].category}` }],
        suggestions: ["Ada yang lebih murah?", "Bagaimana cara checkout?"],
      };
    }
  }

  // ——— Stok ———
  if (q.includes("stok") || q.includes("stock") || q.includes("tersedia") || q.includes("ready") || q.includes("habis")) {
    const hits = searchProducts(input, 3);
    if (hits.length) {
      return {
        text: `Info stok:\n${hits.map((p) => `• ${p.name} — ${p.stock > 0 ? `${p.stock} tersedia` : "stok habis"}`).join("\n")}`,
        products: hits.map(toHit),
        suggestions: ["Bagaimana cara checkout?"],
      };
    }
    return {
      text: "Setiap halaman produk menampilkan stok real-time (contoh: 12 tersedia). Kalau habis, ada tombol Notify Me. Produk apa yang mau dicek stoknya?",
      suggestions: ["Cek stok Sora Sofa?", "Cek stok Kanso Chair?"],
    };
  }

  // ——— Inspirasi ———
  if (q.includes("inspirasi") || q.includes("ide ") || q.includes("desain interior") || q.includes("tips") || q.includes("gaya") || q.includes("japandi") || q.includes("scandinavian") || q.includes("minimalis") || q.includes("mid-century")) {
    return {
      text: "Coba baca artikel inspirasi kami: 'How to Create a Calm Living Room', '5 Ways to Style a Small Apartment', dan 'Choosing the Right Sofa Size'. Gaya favorit di sini: Japandi, Scandinavian, Minimal, Mid-Century, dan Modern.",
      links: [{ label: "Baca Inspirasi", href: "/inspiration" }],
      suggestions: ["Rekomendasi sofa ruang tamu?", "Apartemen kecil cocoknya apa?"],
    };
  }

  // ——— Toko / kontak / showroom ———
  if (q.includes("toko") || q.includes("showroom") || q.includes("alamat") || q.includes("lokasi") || q.includes("kontak") || q.includes("nomor") || q.includes("jam buka") || q.includes("offline")) {
    return {
      text: "Showroom kami di Senopati, Jakarta Selatan. Customer care: hello@efendy-furniture.com. Tapi semua bisa dibeli online — dari katalog sampai tracking, 100% dari web ini!",
      links: [{ label: "Lihat Katalog", href: "/shop" }],
      suggestions: DEFAULT_SUGGESTIONS,
    };
  }

  // ——— Search umum produk ———
  const generic = searchProducts(input, 3);
  if (generic.length > 0) {
    return {
      text: `Ini yang paling cocok dengan "${input}":\n${generic.map((p) => `• ${p.name} — ${formatIDR(p.price)}`).join("\n")}\n\nMau yang lebih spesifik? Coba sebutkan budget atau ruanganmu.`,
      products: generic.map(toHit),
      links: [{ label: "Cari Lanjutan", href: `/search?q=${encodeURIComponent(input)}` }],
      suggestions: ["Ada yang lebih murah?", "Bagaimana cara checkout?"],
    };
  }

  // ——— Fallback ———
  return {
    text: `Hmm, saya belum paham soal "${input}". Tapi saya bisa bantu:\n• Cari produk (contoh: "sofa beige di bawah 9 juta")\n• Info ongkir, pembayaran, cara checkout & lacak pesanan\n• Rekomendasi per ruangan atau koleksi\n\nCoba tanya dengan kata kunci furniture ya!`,
    links: [
      { label: "Lihat Katalog", href: "/shop" },
      { label: "Cara Belanja", href: "/checkout" },
    ],
    suggestions: DEFAULT_SUGGESTIONS,
  };
}

export const CHAIR_AI_QUICK_REPLIES = [
  "Apa itu Efendy Furniture?",
  "Bagaimana cara mencari sofa?",
  "Rekomendasi kursi kerja?",
];
