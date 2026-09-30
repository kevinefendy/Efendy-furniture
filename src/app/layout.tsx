import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawerHost from "@/components/cart/CartDrawerHost";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-logo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Efendy Furniture — Modern Furniture & Interior Inspiration",
  description:
    "Modern furniture designed for the way you live. Discover curated furniture, room designs, and modern essentials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#20201E] antialiased selection:bg-[#6B6B6B] selection:text-white">
        <AnnouncementBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawerHost />
      </body>
    </html>
  );
}
