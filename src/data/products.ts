import { Product } from "@/types";

// Harga realistis ala Informa. Nama Indonesia deskriptif, bukan fake Scandinavian.
// Material beragam: kayu, fabric, metal, rattan, kaca, plywood, HPL.

export const PRODUCTS: Product[] = [
  {
    id: "prod-001",
    name: "Sofa 3 Seat Oslo Fabric Abu",
    slug: "sofa-3-seat-oslo-fabric-abu",
    category: "Sofa",
    room: "ruang-tamu",
    collectionName: "Rumah Minimalis",
    style: "Minimalis",
    price: 5499000,
    originalPrice: 6999000,
    rating: 4.9,
    reviewCount: 212,
    stock: 12,
    description:
      "Sofa 3 dudukan dengan kain fabric premium yang adem dan gampang dibersihkan. Busa high-density tetap empuk dipakai harian. Cocok untuk ruang tamu apartemen maupun rumah.",
    dimensions: { width: 210, depth: 88, height: 82, unit: "cm" },
    material: "Fabric + rangka kayu solid",
    colors: [
      { name: "Abu Muda", code: "#C9C9C7" },
      { name: "Krem", code: "#E8E2D5" },
      { name: "Biru Denim", code: "#5B7186" },
    ],
    sizes: ["2 Seat", "3 Seat", "L-Shape"],
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    isNewArrival: true,
    bestSeller: true,
  },
  {
    id: "prod-002",
    name: "Meja Makan Jati 6 Kursi Minimalis",
    slug: "meja-makan-jati-6-kursi-minimalis",
    category: "Meja",
    room: "ruang-makan",
    collectionName: "Japandi Calm",
    style: "Japandi",
    price: 8750000,
    originalPrice: 9900000,
    rating: 4.8,
    reviewCount: 96,
    stock: 8,
    description:
      "Set meja makan kayu jati solid untuk 6 orang. Finishing natural matte yang tahan panas dan gampang dilap. Kursi dengan sandaran ergonomis buat makan santai lebih lama.",
    dimensions: { width: 180, depth: 90, height: 75, unit: "cm" },
    material: "Kayu jati solid",
    colors: [
      { name: "Natural Jati", code: "#B8860B" },
      { name: "Walnut", code: "#5A4434" },
    ],
    sizes: ["4 Kursi", "6 Kursi"],
    images: [
      "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    bestSeller: true,
  },
  {
    id: "prod-003",
    name: "Kursi Makan Hitam Kaki Kayu",
    slug: "kursi-makan-rattan-sandaran-lengkung",
    category: "Kursi",
    room: "ruang-makan",
    collectionName: "Scandinavian Warm",
    style: "Scandinavian Warm",
    price: 649000,
    rating: 4.7,
    reviewCount: 184,
    stock: 40,
    description:
      "Kursi makan dudukan ergonomis yang menopang badan dengan nyaman. Ringan, gampang dipindah dan ditata. Beli satuan atau set isi 4 lebih hemat.",
    dimensions: { width: 48, depth: 52, height: 80, unit: "cm" },
    material: "Plastik PP + kaki kayu solid",
    colors: [
      { name: "Hitam", code: "#1F1F1F" },
      { name: "Putih", code: "#F5F3ED" },
    ],
    images: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    isNewArrival: false,
  },
  {
    id: "prod-004",
    name: "Lemari Pakaian 2 Pintu Kayu Oak",
    slug: "lemari-pakaian-2-pintu-kayu-oak",
    category: "Lemari",
    room: "kamar-tidur",
    collectionName: "Rumah Minimalis",
    style: "Minimalis",
    price: 3499000,
    originalPrice: 4299000,
    rating: 4.8,
    reviewCount: 143,
    stock: 10,
    description:
      "Lemari 2 pintu dengan gantungan full-length, rak atas yang lega, dan 2 laci bawah. Pintu soft-close tidak berisik. Bahan kayu lapis finishing oak yang tahan lembap.",
    dimensions: { width: 120, depth: 55, height: 190, unit: "cm" },
    material: "Kayu solid + plywood lapis oak",
    colors: [
      { name: "Oak Natural", code: "#DAC4A6" },
      { name: "Walnut", code: "#5A4434" },
    ],
    images: [
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    bestSeller: true,
  },
  {
    id: "prod-005",
    name: "Tempat Tidur Queen Kayu Oak Natural",
    slug: "tempat-tidur-queen-kayu-oak-natural",
    category: "Tempat Tidur",
    room: "kamar-tidur",
    collectionName: "Japandi Calm",
    style: "Japandi",
    price: 5250000,
    rating: 4.9,
    reviewCount: 88,
    stock: 7,
    description:
      "Dipan queen 160x200 dengan headboard rendah yang bikin kamar terasa lega. Rangka kayu solid kuat sampai 250kg. Sudah termasuk dipan, tinggal tambah kasur favoritmu.",
    dimensions: { width: 170, depth: 215, height: 90, unit: "cm" },
    material: "Kayu solid + plywood",
    colors: [
      { name: "Oak Natural", code: "#CDB38B" },
      { name: "Putih", code: "#F5F3ED" },
    ],
    sizes: ["Queen 160x200", "King 180x200"],
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    isNewArrival: true,
  },
  {
    id: "prod-006",
    name: "Rak Buku 5 Tingkat Minimalis Putih",
    slug: "rak-buku-5-tingkat-minimalis-putih",
    category: "Rak",
    room: "kantor",
    collectionName: "Rumah Minimalis",
    style: "Minimalis",
    price: 1299000,
    rating: 4.7,
    reviewCount: 167,
    stock: 22,
    description:
      "Rak buku 5 susun yang muat banyak tapi tetap ramping. Ambalan bisa diatur tingginya buat buku besar atau box penyimpanan. Gratis bracket pengaman ke dinding.",
    dimensions: { width: 90, depth: 32, height: 180, unit: "cm" },
    material: "Plywood + rangka metal",
    colors: [
      { name: "Putih", code: "#F5F3ED" },
      { name: "Oak + Hitam", code: "#8A6D53" },
    ],
    images: [
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
  },
  {
    id: "prod-007",
    name: "Meja Kopi Bulat Kayu Natural",
    slug: "meja-kopi-bulat-marmer-putih",
    category: "Meja",
    room: "ruang-tamu",
    style: "Minimalis",
    price: 1899000,
    originalPrice: 2299000,
    rating: 4.8,
    reviewCount: 74,
    stock: 14,
    description:
      "Meja kopi bundar kayu solid yang motif seratnya beda-beda tiap meja. Kaki kokoh dan stabil. Ada ruang di bawah buat majalah dan remote biar ruang tamu rapi.",
    dimensions: { width: 85, depth: 85, height: 42, unit: "cm" },
    material: "Kayu jati solid",
    colors: [{ name: "Natural Jati", code: "#B8860B" }],
    images: [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
  },
  {
    id: "prod-008",
    name: "Kursi Kerja Putar Sandaran Empuk",
    slug: "kursi-kerja-ergonomis-mesh-hitam",
    category: "Kursi",
    room: "kantor",
    style: "Minimalis",
    price: 1799000,
    originalPrice: 2199000,
    rating: 4.8,
    reviewCount: 231,
    stock: 18,
    description:
      "Kursi kerja sandaran busa empuk yang nyaman dipakai seharian. Penyangga pinggang menopang postur, kaki putar 360 derajat dengan roda silent tidak berisik di lantai keramik.",
    dimensions: { width: 65, depth: 62, height: 110, unit: "cm" },
    material: "Fabric + kaki metal putar",
    colors: [
      { name: "Krem", code: "#E8E2D5" },
      { name: "Coklat", code: "#8A6D53" },
    ],
    images: [
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    bestSeller: true,
  },
  {
    id: "prod-009",
    name: "Sofa 2 Seat Scandi Kain Oatmeal",
    slug: "sofa-2-seat-scandi-kain-oatmeal",
    category: "Sofa",
    room: "ruang-tamu",
    collectionName: "Scandinavian Warm",
    style: "Scandinavian Warm",
    price: 3999000,
    rating: 4.7,
    reviewCount: 118,
    stock: 9,
    description:
      "Sofa 2 dudukan yang pas buat apartemen tipe studio sampai 2BR. Kaki kayu tinggi bikin ruangan terasa lega dan gampang dibersihkan bawahnya. Cover bisa dilepas dan dicuci.",
    dimensions: { width: 165, depth: 85, height: 80, unit: "cm" },
    material: "Fabric + kayu solid",
    colors: [
      { name: "Oatmeal", code: "#E5DCCB" },
      { name: "Sage", code: "#9BA48B" },
    ],
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: false,
    isNewArrival: true,
  },
  {
    id: "prod-010",
    name: "Meja Kerja Minimalis 120cm Putih",
    slug: "meja-kerja-lipat-kayu-120cm",
    category: "Meja",
    room: "kantor",
    style: "Minimalis",
    price: 999000,
    originalPrice: 1299000,
    rating: 4.6,
    reviewCount: 342,
    stock: 30,
    description:
      "Meja kerja 120cm yang muat laptop + monitor + lampu. Desain ramping, gampang dipindah kalau butuh space. Permukaan HPL motif kayu tahan gores dan gampang dilap.",
    dimensions: { width: 120, depth: 60, height: 75, unit: "cm" },
    material: "Plywood lapis HPL + kaki metal",
    colors: [
      { name: "Putih", code: "#F5F3ED" },
      { name: "Natural", code: "#DAC4A6" },
    ],
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: false,
    bestSeller: true,
  },
  {
    id: "prod-011",
    name: "Meja Samping Teras Kayu Natural",
    slug: "kursi-santai-rotan-outdoor-bali",
    category: "Outdoor",
    room: "outdoor",
    style: "Minimalis",
    price: 749000,
    rating: 4.8,
    reviewCount: 65,
    stock: 16,
    description:
      "Meja samping kayu solid buat naruh pot tanaman, cangkir kopi, atau buku di teras dan balkon. Sudah di-finishing outdoor oil biar tahan panas dan hujan.",
    dimensions: { width: 40, depth: 40, height: 50, unit: "cm" },
    material: "Kayu jati solid",
    colors: [{ name: "Natural Jati", code: "#B8860B" }],
    images: [
      "https://images.unsplash.com/photo-1611486212557-88be5ff6f941?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    isNewArrival: true,
  },
  {
    id: "prod-012",
    name: "Set Meja Cafe Bulat 2 Kursi Putih",
    slug: "set-meja-cafe-bulat-2-kursi",
    category: "Outdoor",
    room: "outdoor",
    collectionName: "Industrial Loft",
    style: "Scandinavian Warm",
    price: 2299000,
    originalPrice: 2799000,
    rating: 4.7,
    reviewCount: 52,
    stock: 11,
    description:
      "Satu set meja cafe bundar + 2 kursi yang pas buat teras rumah atau sudut usaha kuliner. Top halus gampang dilap, kaki kayu kokoh. Hemat tempat penyimpanan.",
    dimensions: { width: 70, depth: 70, height: 75, unit: "cm" },
    material: "Top MDF lapis HPL + kaki kayu",
    colors: [
      { name: "Putih", code: "#F5F3ED" },
      { name: "Natural", code: "#DAC4A6" },
    ],
    images: [
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: false,
  },
  {
    id: "prod-013",
    name: "Lemari TV Minimalis 180cm Putih Oak",
    slug: "lemari-tv-minimalis-180cm",
    category: "Lemari",
    room: "ruang-tamu",
    style: "Minimalis",
    price: 2799000,
    rating: 4.7,
    reviewCount: 89,
    stock: 13,
    description:
      "Bufet TV 180cm muat TV sampai 65 inch. Pintu geser hemat ruang, ada lubang kabel di belakang. Ambalan dalam bisa diatur buat soundbar, konsol game, dan koleksi.",
    dimensions: { width: 180, depth: 42, height: 55, unit: "cm" },
    material: "Plywood lapis HPL",
    colors: [
      { name: "Putih Oak", code: "#EDE7DE" },
      { name: "Walnut", code: "#4A3B32" },
    ],
    images: [
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: false,
  },
  {
    id: "prod-014",
    name: "Set Kamar Tidur Putih + 2 Nakas",
    slug: "tempat-tidur-anak-tingkat-kayu",
    category: "Tempat Tidur",
    room: "kamar-tidur",
    style: "Minimalis",
    price: 4750000,
    originalPrice: 5500000,
    rating: 4.9,
    reviewCount: 47,
    stock: 6,
    description:
      "Paket ranjang putih plus 2 nakas samping tempat tidur. Sekali beli kamar langsung rapi dan serasi. Cat water-based aman, tidak berbau.",
    dimensions: { width: 210, depth: 170, height: 100, unit: "cm" },
    material: "Kayu solid + plywood",
    colors: [
      { name: "Putih", code: "#F5F3ED" },
      { name: "Natural", code: "#DAC4A6" },
    ],
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: false,
    isNewArrival: true,
  },
  {
    id: "prod-015",
    name: "Vas Keramik Putih Set Isi 3 Minimalis",
    slug: "vas-keramik-putih-set-isi-3",
    category: "Dekorasi",
    room: "dekorasi",
    style: "Minimalis",
    price: 249000,
    originalPrice: 329000,
    rating: 4.9,
    reviewCount: 428,
    stock: 80,
    description:
      "Set 3 vas keramik beda ukuran yang langsung bikin meja atau rak terlihat rapi. Cocok buat bunga segar, bunga kering, atau dibiarkan kosong sebagai pajangan.",
    dimensions: { width: 15, depth: 15, height: 28, unit: "cm" },
    material: "Keramik matte",
    colors: [
      { name: "Putih", code: "#F5F3ED" },
      { name: "Terracotta", code: "#C46851" },
    ],
    images: [
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    bestSeller: true,
  },
  {
    id: "prod-016",
    name: "Lampu Gantung Kap Metal Abu 40cm",
    slug: "lampu-gantung-rotan-anyam-40cm",
    category: "Dekorasi",
    room: "ruang-makan",
    style: "Industrial",
    price: 549000,
    rating: 4.8,
    reviewCount: 156,
    stock: 25,
    description:
      "Kap lampu gantung metal dengan sorot fokus yang cantik di atas meja makan. Cahayanya hangat dan menyebar. Sudah termasuk kabel 2 meter + fitting E27.",
    dimensions: { width: 40, depth: 40, height: 32, unit: "cm" },
    material: "Metal powder-coating",
    colors: [
      { name: "Abu Tua", code: "#4B4B4B" },
      { name: "Hitam", code: "#1F1F1F" },
    ],
    images: [
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: false,
    isNewArrival: true,
  },
  {
    id: "prod-017",
    name: "Meja Island Dapur Marmer 110cm",
    slug: "meja-dapur-lipat-granit-2-kursi",
    category: "Meja",
    room: "dapur",
    style: "Minimalis",
    price: 1999000,
    rating: 4.6,
    reviewCount: 73,
    stock: 15,
    description:
      "Meja island dapur top marmer yang tahan panas panci langsung. Multifungsi buat persiapan masak sekaligus meja sarapan. Kaki metal kokoh dan stabil.",
    dimensions: { width: 110, depth: 65, height: 90, unit: "cm" },
    material: "Top marmer + kaki metal",
    colors: [
      { name: "Abu Marmer", code: "#C9C9C7" },
      { name: "Hitam", code: "#1F1F1F" },
    ],
    images: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: false,
  },
  {
    id: "prod-018",
    name: "Rak Ambalan Dapur 4 Susun",
    slug: "rak-dapur-susun-4-stainless",
    category: "Rak",
    room: "dapur",
    style: "Minimalis",
    price: 899000,
    originalPrice: 1099000,
    rating: 4.7,
    reviewCount: 198,
    stock: 28,
    description:
      "Rak ambalan dinding 4 susun buat panci, bumbu, dan stok sembako biar dapur rapi. Papan tebal kuat menahan beban, bracket besi kokoh. Gampang dipasang dan dibersihkan.",
    dimensions: { width: 90, depth: 25, height: 120, unit: "cm" },
    material: "Papan kayu + bracket besi",
    colors: [
      { name: "Putih", code: "#F5F3ED" },
      { name: "Natural", code: "#DAC4A6" },
    ],
    images: [
      "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: false,
    bestSeller: true,
  },
  {
    id: "prod-019",
    name: "Sofa Bed Lipat 2in1 Olive",
    slug: "sofa-bed-lipat-2in1-abu",
    category: "Sofa",
    room: "ruang-tamu",
    style: "Minimalis",
    price: 2999000,
    originalPrice: 3599000,
    rating: 4.6,
    reviewCount: 134,
    stock: 17,
    description:
      "Sofa yang bisa dibuka jadi tempat tidur 120x190 dalam 10 detik. Solusi buat yang sering kedatangan tamu nginap tapi kamar terbatas. Busa tebal tetap nyaman buat tidur.",
    dimensions: { width: 190, depth: 90, height: 80, unit: "cm" },
    material: "Fabric + busa high-density",
    colors: [
      { name: "Olive", code: "#7A7A52" },
      { name: "Krem", code: "#E8E2D5" },
    ],
    images: [
      "https://images.unsplash.com/photo-1550254478-ead40cc54513?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: false,
  },
  {
    id: "prod-020",
    name: "Kursi Teras Jati Klasik",
    slug: "kursi-teras-jati-lipat-klasik",
    category: "Outdoor",
    room: "outdoor",
    style: "Minimalis",
    price: 899000,
    rating: 4.8,
    reviewCount: 91,
    stock: 24,
    description:
      "Kursi teras kayu jati asli yang makin bagus dimakan usia. Dudukan dan sandaran nyaman buat santai sore. Sudah di-finishing outdoor oil biar tahan panas dan hujan di teras.",
    dimensions: { width: 55, depth: 58, height: 88, unit: "cm" },
    material: "Kayu jati solid",
    colors: [{ name: "Natural Jati", code: "#B8860B" }],
    images: [
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: false,
  },
  {
    id: "prod-021",
    name: "Lemari Arsip Kantor 2 Laci Kayu",
    slug: "lemari-arsip-kantor-4-laci-metal",
    category: "Lemari",
    room: "kantor",
    collectionName: "Industrial Loft",
    style: "Industrial",
    price: 1499000,
    rating: 4.6,
    reviewCount: 58,
    stock: 12,
    description:
      "Lemari arsip 2 laci plus rak terbuka buat dokumen, map folio, dan printer kecil. Rel laci smooth, muat map folio. Desain kayu hangat, cocok buat kantor rumah.",
    dimensions: { width: 80, depth: 45, height: 85, unit: "cm" },
    material: "Kayu + HPL motif oak",
    colors: [
      { name: "Oak", code: "#DAC4A6" },
      { name: "Putih", code: "#F5F3ED" },
    ],
    images: [
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: false,
  },
  {
    id: "prod-022",
    name: "Cermin Dinding Bulat 80cm Bingkai Kayu",
    slug: "cermin-dinding-bulat-80cm-kayu",
    category: "Dekorasi",
    room: "dekorasi",
    style: "Scandinavian Warm",
    price: 649000,
    originalPrice: 799000,
    rating: 4.9,
    reviewCount: 267,
    stock: 35,
    description:
      "Cermin bundar 80cm yang bikin ruangan kecil terasa 2x lebih lega. Bingkai kayu tipis yang elegan. Sudah termasuk pengait dinding, tinggal gantung.",
    dimensions: { width: 80, depth: 4, height: 80, unit: "cm" },
    material: "Kaca + bingkai kayu",
    colors: [
      { name: "Oak", code: "#DAC4A6" },
      { name: "Hitam", code: "#1F1F1F" },
    ],
    images: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    bestSeller: true,
  },
  {
    id: "prod-023",
    name: "Set Kamar Tidur Queen Bed + Nakas Oak",
    slug: "set-kamar-tidur-queen-bed-nakas-oak",
    category: "Tempat Tidur",
    room: "kamar-tidur",
    collectionName: "Scandinavian Warm",
    style: "Scandinavian Warm",
    price: 12999000,
    originalPrice: 15499000,
    rating: 5.0,
    reviewCount: 34,
    stock: 4,
    description:
      "Paket hemat: dipan queen + 2 nakas + lemari 2 pintu motif oak. Sekali beli kamar langsung jadi. Hemat sampai 2,5 juta dibanding beli satuan. Gratis instalasi se-Jabodetabek.",
    dimensions: { width: 320, depth: 220, height: 190, unit: "cm" },
    material: "Plywood HPL motif oak + kayu solid",
    colors: [{ name: "Oak Natural", code: "#CDB38B" }],
    sizes: ["Queen 160x200"],
    images: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    bestSeller: true,
  },
  {
    id: "prod-024",
    name: "Set Bingkai Foto Dinding Isi 12",
    slug: "hiasan-dinding-anyam-set-3",
    category: "Dekorasi",
    room: "dekorasi",
    style: "Minimalis",
    price: 189000,
    rating: 4.8,
    reviewCount: 312,
    stock: 60,
    description:
      "Set 12 bingkai foto dinding beda ukuran yang langsung bikin dinding polos jadi galeri hangat. Gampang dipasang mengikuti pola, cocok buat foto keluarga dan print art favorit.",
    dimensions: { width: 30, depth: 3, height: 40, unit: "cm" },
    material: "Bingkai MDF + kaca",
    colors: [
      { name: "Hitam", code: "#1F1F1F" },
      { name: "Putih", code: "#F5F3ED" },
    ],
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: false,
  },
];

// Kategori cepat: 8 kotak (Sofa, Meja, Kursi, Lemari, Tempat Tidur, Rak, Outdoor, Dekorasi)
export const KATEGORI_CEPAT = [
  {
    id: "Sofa",
    nama: "Sofa",
    deskripsi: "2-seat sampai L-shape",
    gambar:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "Meja",
    nama: "Meja",
    deskripsi: "Makan, kerja & kopi",
    gambar:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "Kursi",
    nama: "Kursi",
    deskripsi: "Makan, kerja & santai",
    gambar:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "Lemari",
    nama: "Lemari",
    deskripsi: "Pakaian, TV & arsip",
    gambar:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "Tempat Tidur",
    nama: "Tempat Tidur",
    deskripsi: "Queen, king & anak",
    gambar:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "Rak",
    nama: "Rak",
    deskripsi: "Buku, dapur & display",
    gambar:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "Outdoor",
    nama: "Outdoor",
    deskripsi: "Teras, balkon & cafe",
    gambar:
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "Dekorasi",
    nama: "Dekorasi",
    deskripsi: "Vas, lampu & cermin",
    gambar:
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=80",
  },
];

// Navigasi ruang (dropdown Kategori): label Indonesia, slug tetap pendek
export const ROOMS_DATA = [
  {
    id: "ruang-tamu",
    name: "Ruang Tamu",
    description:
      "Sofa empuk, meja kopi, dan bufet TV buat kumpul keluarga yang nyaman.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    count: 6,
  },
  {
    id: "kamar-tidur",
    name: "Kamar Tidur",
    description:
      "Dipan kokoh, lemari lega, dan nakas. Tidur nyenyak, bangun segar.",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
    count: 5,
  },
  {
    id: "ruang-makan",
    name: "Ruang Makan",
    description: "Set meja makan jati sampai kursi rotan buat makan bareng hangat.",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
    count: 4,
  },
  {
    id: "dapur",
    name: "Dapur",
    description: "Meja dapur granit dan rak stainless yang kuat dan gampang dibersihkan.",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80",
    count: 2,
  },
  {
    id: "kantor",
    name: "Kantor",
    description: "Meja kerja dan kursi ergonomis buat WFH fokus seharian.",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
    count: 4,
  },
  {
    id: "outdoor",
    name: "Outdoor",
    description: "Kursi teras jati dan set cafe buat santai di luar.",
    image:
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1200&q=80",
    count: 3,
  },
  {
    id: "dekorasi",
    name: "Dekorasi",
    description: "Vas, cermin, lampu gantung. Sentuhan akhir yang bikin rumah hidup.",
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=1200&q=80",
    count: 4,
  },
];

export const INSPIRATION_ARTICLES = [
  {
    id: "art-1",
    title: "5 Cara Menata Ruang Tamu Kecil Biar Lega",
    excerpt:
      "Trik pilih sofa ramping, cermin besar, dan warna terang. Cocok buat apartemen tipe studio.",
    category: "Tips Dekorasi",
    readTime: "5 menit baca",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
    slug: "menata-ruang-tamu-kecil",
  },
  {
    id: "art-2",
    title: "Pilih Sofa Fabric atau Kulit? Ini Bedanya",
    excerpt:
      "Punya anak kecil atau peliharaan? Simak plus-minus tiap bahan biar nggak salah beli.",
    category: "Panduan Belanja",
    readTime: "4 menit baca",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
    slug: "sofa-fabric-atau-kulit",
  },
  {
    id: "art-3",
    title: "Ukuran Meja Makan yang Pas Buat Keluarga",
    excerpt:
      "Keluarga 4 vs 6 orang butuh meja beda ukuran. Ada rumusnya biar nggak sempit-sempitan.",
    category: "Panduan Belanja",
    readTime: "6 menit baca",
    image:
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1000&q=80",
    slug: "ukuran-meja-makan-pas",
  },
];

export const KOLEKSI_TEMA = [
  {
    id: "rumah-minimalis",
    nama: "Rumah Minimalis",
    deskripsi: "Putih, rapi, gampang dirawat. Favorit keluarga muda.",
    gambar:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
    jumlah: 9,
  },
  {
    id: "scandinavian-warm",
    nama: "Scandinavian Warm",
    deskripsi: "Kayu terang + kain hangat. Terang tapi tetap homey.",
    gambar:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    jumlah: 6,
  },
  {
    id: "japandi-calm",
    nama: "Japandi Calm",
    deskripsi: "Tenang ala Jepang + nyaman ala Skandinavia.",
    gambar:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
    jumlah: 6,
  },
  {
    id: "industrial-loft",
    nama: "Industrial Loft",
    deskripsi: "Besi hitam + kayu. Cocok buat cafe dan kantor kreatif.",
    gambar:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
    jumlah: 4,
  },
];

export const TESTIMONI = [
  {
    nama: "Bu Ratna",
    kota: "Jakarta Selatan",
    rating: 5,
    foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    kutipan:
      "Sofa Oslonya empuk banget, anak-anak betah nonton di ruang tamu. Pengirimannya juga rapi, dipasangin sekalian.",
  },
  {
    nama: "Pak Budi Santoso",
    kota: "Surabaya",
    rating: 5,
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    kutipan:
      "Awalnya ragu beli lemari online, ternyata bahannya kokoh. Tim showroom Surabaya ramah, dibantu ukur ruangan juga.",
  },
  {
    nama: "Dinda & Rizky",
    kota: "Bandung",
    rating: 5,
    foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    kutipan:
      "Isi kontrakan pertama full dari Efendy. Cicilan 0% ngebantu banget. Kamar tidur set-nya bagus, kayak di hotel.",
  },
];

export const SHOWROOMS = [
  {
    kota: "Jakarta",
    alamat: "Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan",
    jam: "Senin–Minggu, 10.00–21.00",
    telepon: "0812-1000-1001",
  },
  {
    kota: "Surabaya",
    alamat: "Jl. Manyar Kertoarjo No. 45, Surabaya",
    jam: "Senin–Minggu, 10.00–21.00",
    telepon: "0812-1000-1002",
  },
  {
    kota: "Bandung",
    alamat: "Jl. Setiabudi No. 120, Bandung",
    jam: "Senin–Minggu, 10.00–21.00",
    telepon: "0812-1000-1003",
  },
];
