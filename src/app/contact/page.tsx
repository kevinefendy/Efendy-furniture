"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  Check,
  ChevronDown,
  Instagram,
  Facebook,
  Youtube,
  Phone,
} from "lucide-react";
import ShowroomMap from "@/components/common/ShowroomMap";

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "Apakah bisa custom ukuran, bahan, dan warna furnitur?",
    a: "Bisa banget! Efendy Furniture melayani pembuatan furnitur custom mulai dari sofa, meja makan, tempat tidur, lemari, hingga kitchen set. Kamu bisa bawa referensi ukuran ruangan dan foto desain, lalu tim kami buatkan estimasi serta 3D preview gratis.",
  },
  {
    q: "Apakah produk di showroom bisa langsung dibeli (ready stock)?",
    a: "Sebagian besar koleksi populer tersedia dalam status ready stock dan siap dikirim dalam 1–3 hari kerja untuk wilayah Jabodetabek, Surabaya, dan Bandung. Untuk barang display showroom atau custom order, estimasi produksi 7–14 hari kerja.",
  },
  {
    q: "Berapa biaya pengiriman dan instalasi ke rumah?",
    a: "Untuk wilayah Jabodetabek, Kota Surabaya, dan Kota Bandung, kami menyediakan gratis ongkir dan gratis perakitan/instalasi di tempat dengan minimal transaksi tertentu. Untuk luar kota, kami bekerja sama dengan kargo khusus furnitur berpengalaman.",
  },
  {
    q: "Apa saja garansi yang diberikan oleh Efendy Furniture?",
    a: "Setiap furnitur kami dilengkapi garansi resmi 1 hingga 3 tahun untuk konstruksi rangka kayu solid, sambungan mekanikal, dan busa berdensitas tinggi (anti-kempes). Kerusakan selama pengiriman juga diganti 100% baru.",
  },
  {
    q: "Apakah melayani cicilan atau metode pembayaran tempo?",
    a: "Kami menerima transfer bank, QRIS, kartu kredit dengan program cicilan 0% hingga 12 bulan via payment gateway, serta opsi SPayLater / Kredivo untuk pembelian online maupun langsung di showroom.",
  },
  {
    q: "Perlukah membuat janji (booking) sebelum berkunjung ke showroom?",
    a: "Showroom kami buka setiap hari pukul 10.00 – 21.00 WIB dan kamu bisa langsung datang tanpa booking. Namun, jika ingin konsultasi interior intensif dengan tim desainer kami, disarankan booking melalui website atau WhatsApp agar kami siapkan sampel material lebih dulu.",
  },
];

export default function ContactPage() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Konsultasi Custom Order");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) {
      setError("Silakan isi nama lengkap kamu.");
      return;
    }
    if (!email.trim() && !phone.trim()) {
      setError("Isi minimal salah satu kontak (Email atau No. WhatsApp).");
      return;
    }
    if (!message.trim()) {
      setError("Tuliskan pesan atau kebutuhan furniturmu.");
      return;
    }

    setError("");
    setSent(true);
  };

  return (
    <div className="w-full bg-white">
      {/* ── Breadcrumb & Page Header ── */}
      <header className="border-b border-[#E8E6E1] bg-[#F7F7F5] py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-[#6B6B6B]">
              <li>
                <Link href="/" className="transition-colors hover:text-[#C2410C]">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#C9C5BC]">/</li>
              <li className="font-medium text-[#C2410C]" aria-current="page">
                Hubungi Kami
              </li>
            </ol>
          </nav>
          <div className="mt-4">
            <h1 className="font-serif text-3xl font-medium text-[#1A1A1A] md:text-5xl tracking-tight">
              Get in Touch
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#6B6B6B] md:text-lg">
              Punya pertanyaan seputar produk, pesanan custom, atau ingin berkunjung ke showroom? Tim Efendy Furniture siap membantumu.
            </p>
          </div>
        </div>
      </header>

      {/* ── Section Contact Info & Form ── */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 items-start">
            {/* Info Kontak Kolom Kiri */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#1A1A1A]">
                Informasi Kontak
              </h2>
              <p className="mt-2.5 max-w-md text-base leading-relaxed text-[#6B6B6B]">
                Hubungi kami lewat saluran yang paling nyaman untukmu. Pada jam operasional, tim kami biasanya merespons dalam waktu 5 menit.
              </p>

              <ul className="mt-6 space-y-4">
                {/* WhatsApp */}
                <li className="flex items-start gap-4 rounded-2xl border border-[#E8E6E1] bg-white p-5 transition-all hover:border-[#1A1A1A] hover:shadow-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#C2410C]/10 text-[#C2410C]">
                    <MessageCircle size={22} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider font-semibold text-[#6B6B6B]">
                      WhatsApp Resmi
                    </p>
                    <a
                      href="https://wa.me/6281210001001?text=Halo%20Efendy%20Furniture%2C%20saya%20mau%20tanya%20produk."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 block break-words text-base font-semibold text-[#1A1A1A] hover:text-[#C2410C] transition-colors"
                    >
                      +62 812-1000-1001
                    </a>
                    <span className="text-xs text-emerald-600 font-medium mt-0.5 inline-block">
                      ● Respon Cepat (Online)
                    </span>
                  </div>
                </li>

                {/* Email */}
                <li className="flex items-start gap-4 rounded-2xl border border-[#E8E6E1] bg-white p-5 transition-all hover:border-[#1A1A1A] hover:shadow-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#C2410C]/10 text-[#C2410C]">
                    <Mail size={22} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider font-semibold text-[#6B6B6B]">
                      Email Pelayanan
                    </p>
                    <a
                      href="mailto:halo@efendyfurniture.id"
                      className="mt-0.5 block break-words text-base font-semibold text-[#1A1A1A] hover:text-[#C2410C] transition-colors"
                    >
                      halo@efendyfurniture.id
                    </a>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">Untuk penawaran B2B & proyek komersial</p>
                  </div>
                </li>

                {/* Showroom Flagship */}
                <li className="flex items-start gap-4 rounded-2xl border border-[#E8E6E1] bg-white p-5 transition-all hover:border-[#1A1A1A] hover:shadow-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#C2410C]/10 text-[#C2410C]">
                    <MapPin size={22} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider font-semibold text-[#6B6B6B]">
                      Showroom Utama (Jakarta)
                    </p>
                    <p className="mt-0.5 text-base font-semibold text-[#1A1A1A]">
                      Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan
                    </p>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">
                      Juga tersedia di Surabaya (Manyar) & Bandung (Setiabudi)
                    </p>
                  </div>
                </li>

                {/* Jam Operasional */}
                <li className="flex items-start gap-4 rounded-2xl border border-[#E8E6E1] bg-white p-5 transition-all hover:border-[#1A1A1A] hover:shadow-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#C2410C]/10 text-[#C2410C]">
                    <Clock size={22} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider font-semibold text-[#6B6B6B]">
                      Jam Buka Showroom
                    </p>
                    <p className="mt-0.5 text-base font-semibold text-[#1A1A1A]">
                      Senin – Minggu: 10.00 – 21.00 WIB
                    </p>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">Buka setiap hari termasuk akhir pekan & tanggal merah</p>
                  </div>
                </li>
              </ul>

              {/* Social Media */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-[#1A1A1A]">Ikuti kami:</span>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Efendy Furniture"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E6E1] text-[#1A1A1A] hover:border-[#C2410C] hover:text-[#C2410C] transition-colors"
                >
                  <Instagram size={17} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Efendy Furniture"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E6E1] text-[#1A1A1A] hover:border-[#C2410C] hover:text-[#C2410C] transition-colors"
                >
                  <Facebook size={17} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Efendy Furniture"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E6E1] text-[#1A1A1A] hover:border-[#C2410C] hover:text-[#C2410C] transition-colors"
                >
                  <Youtube size={17} />
                </a>
              </div>
            </div>

            {/* Form Kirim Pesan Kolom Kanan */}
            <div className="rounded-2xl border border-[#E8E6E1] bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-medium text-[#1A1A1A]">
                Kirim Pesan
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-[#6B6B6B]">
                Isi form di bawah ini dan konsultan furnitur kami akan membalas via WhatsApp atau Email maksimal dalam 1x24 jam.
              </p>

              {sent ? (
                <div className="mt-6 p-6 rounded-xl bg-[#F7F7F5] border border-[#E8E6E1] text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Check size={24} />
                  </div>
                  <h3 className="font-semibold text-lg text-[#1A1A1A]">Pesan Berhasil Terkirim!</h3>
                  <p className="text-sm text-[#6B6B6B] max-w-sm mx-auto">
                    Terima kasih {nama}. Tim Efendy Furniture akan segera menghubungi kamu mengenai {subject}.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setMessage("");
                    }}
                    className="mt-3 px-5 py-2 rounded-full border border-[#E8E6E1] text-xs font-medium hover:border-[#1A1A1A]"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="contact-nama" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                      Nama Lengkap <span className="text-[#C2410C]">*</span>
                    </label>
                    <input
                      id="contact-nama"
                      type="text"
                      required
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      placeholder="Contoh: Dimas Prakoso"
                      className="w-full rounded-xl border border-[#E8E6E1] bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:border-[#C2410C] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="dimas@email.com"
                        className="w-full rounded-xl border border-[#E8E6E1] bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:border-[#C2410C] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                        Nomor WhatsApp / HP
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="081234567890"
                        className="w-full rounded-xl border border-[#E8E6E1] bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:border-[#C2410C] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                      Topik Keperluan
                    </label>
                    <select
                      id="contact-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full rounded-xl border border-[#E8E6E1] bg-white px-4 py-3 text-sm text-[#1A1A1A] focus:border-[#C2410C] focus:outline-none"
                    >
                      <option value="Konsultasi Custom Order">Konsultasi Custom Order Furnitur</option>
                      <option value="Booking Kunjungan Showroom">Booking Kunjungan Showroom</option>
                      <option value="Informasi Stok & Pengiriman">Informasi Stok & Pengiriman</option>
                      <option value="Garansi & Layanan Purnajual">Klaim Garansi & Servis</option>
                      <option value="Kerja Sama Proyek / Interior Designer">Kerja Sama B2B / Proyek</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                      Pesan / Kebutuhan Ruangan <span className="text-[#C2410C]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ceritakan furnitur apa yang sedang kamu cari, estimasi ukuran, atau gaya ruangan yang diinginkan..."
                      className="w-full rounded-xl border border-[#E8E6E1] bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:border-[#C2410C] focus:outline-none resize-y"
                    />
                  </div>

                  {error && (
                    <p role="alert" className="text-xs text-[#C2410C]">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1A1A1A] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-black"
                  >
                    <Send size={16} />
                    Kirim Pesan
                  </button>
                </form>
              )}

              <p className="mt-5 text-center text-xs leading-relaxed text-[#6B6B6B]">
                Atau langsung terhubung via{" "}
                <a
                  href="https://wa.me/6281210001001?text=Halo%20Efendy%20Furniture%2C%20saya%20mau%20tanya%20produk."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
                >
                  <MessageCircle size={14} /> WhatsApp Admin
                </a>{" "}
                untuk respon lebih cepat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section Find Us Here (Maps) ala ZorrexTour ── */}
      <section className="bg-[#F7F7F5] py-14 md:py-20 border-y border-[#E8E6E1]">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
          <ShowroomMap showHeader={true} />
        </div>
      </section>

      {/* ── Section FAQ ala ZorrexTour ── */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-medium text-[#1A1A1A] md:text-4xl">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="mt-3 text-base text-[#6B6B6B]">
              Jawaban cepat seputar pemesanan, custom ukuran, pengiriman, dan kunjungan showroom.
            </p>
            <span className="mx-auto mt-4 block h-1 w-12 rounded-full bg-[#C2410C]" />
          </div>

          <div className="mt-10 divide-y divide-[#E8E6E1] rounded-2xl border border-[#E8E6E1] bg-white overflow-hidden shadow-sm">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left transition-colors hover:bg-[#F7F7F5]"
                    >
                      <span className="text-sm sm:text-base font-semibold text-[#1A1A1A]">
                        {faq.q}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-[#C2410C] transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </h3>
                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 text-sm text-[#6B6B6B] leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="mt-8 text-center text-sm text-[#6B6B6B]">
            Masih ada pertanyaan lain?{" "}
            <a
              href="https://wa.me/6281210001001?text=Halo%20Efendy%20Furniture%2C%20saya%20mau%20tanya%20sesuatu."
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#C2410C] hover:underline"
            >
              Tanya tim kami di WhatsApp
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
