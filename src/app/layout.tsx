import type { Metadata } from "next";
import { Fraunces, Inter_Tight } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawerHost from "@/components/cart/CartDrawerHost";
import FloatingActions from "@/components/common/FloatingActions";
import ChairAI from "@/components/chat/ChairAI";

// Heading: Fraunces (serif modern) 400-600. Body: Inter Tight 400-500.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-heading",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Efendy Furniture — Rumah Kamu, Gaya Kamu",
  description:
    "Toko furniture lengkap untuk rumah modern Indonesia. Sofa, meja, kursi, lemari, tempat tidur, rak, outdoor, dekorasi. Ready stock atau custom sesuai ukuran. 3 showroom di Jakarta, Surabaya, Bandung.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${fraunces.variable} ${interTight.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-[#1A1A1A] antialiased selection:bg-[#C2410C] selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawerHost />
        <FloatingActions />
        <ChairAI />
      </body>
    </html>
  );
}
