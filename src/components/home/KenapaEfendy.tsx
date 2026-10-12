import { ShieldCheck, Truck, CreditCard, RotateCcw } from "lucide-react";
import ScrollReveal from "@/components/common/ScrollReveal";

// Kenapa Efendy: 4 card putih, icon line-art minimalis. Tanpa shadow.
const ALASAN = [
  {
    Icon: ShieldCheck,
    judul: "Garansi 1–3 tahun",
    deskripsi: "Rangka rusak? Kami perbaiki atau ganti. Klaim gampang via WA, tanpa ribet.",
  },
  {
    Icon: Truck,
    judul: "Gratis ongkir + instalasi",
    deskripsi: "Min. belanja Rp 3 juta (Jabodetabek). Tim kami antar, rakit, dan bereskan kardus.",
  },
  {
    Icon: CreditCard,
    judul: "Cicilan 0% 12 bulan",
    deskripsi: "Pakai kartu kredit atau paylater favoritmu. Tidur nyenyak dulu, bayar belakangan.",
  },
  {
    Icon: RotateCcw,
    judul: "30 hari retur",
    deskripsi: "Nggak cocok di rumah? Tukar atau refund dalam 30 hari. Syarat gampang.",
  },
];

export default function KenapaEfendy() {
  return (
    <section className="bg-[#F7F7F5]" aria-labelledby="kenapa-heading" id="bantuan">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[60px] lg:py-[100px]">
        <ScrollReveal>
          <h2
            id="kenapa-heading"
            className="font-serif font-medium text-[28px] lg:text-[44px] tracking-tight text-[#1A1A1A] text-center"
          >
            Kenapa 12.000+ orang pilih Efendy?
          </h2>
          <p className="mt-3 text-[17px] text-[#6B6B6B] text-center max-w-2xl mx-auto">
            Beli furniture itu investasi. Kami pastikan kamu tenang sebelum, saat, dan sesudah beli.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {ALASAN.map(({ Icon, judul, deskripsi }, i) => (
            <ScrollReveal key={judul} delay={Math.min(i * 80, 240)}>
              <div className="h-full bg-white border border-[#E8E6E1] rounded-[8px] p-6">
                <span className="inline-flex w-11 h-11 items-center justify-center rounded-full border border-[#E8E6E1] text-[#1A1A1A]">
                  <Icon size={21} strokeWidth={1.6} />
                </span>
                <h3 className="mt-4 text-[17px] font-semibold text-[#1A1A1A]">{judul}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-[#6B6B6B]">{deskripsi}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
