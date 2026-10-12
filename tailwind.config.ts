import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Desain: 90% putih, 8% hitam/abu, 2% terracotta. Terracotta (#C2410C)
        // hanya untuk 1 CTA utama, badge Sale/New, harga diskon, underline penting.
        base: {
          white: "#FFFFFF",
          warm: "#F7F7F5",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          secondary: "#6B6B6B",
        },
        line: "#E8E6E1",
        terra: {
          DEFAULT: "#C2410C",
          hover: "#A8370A",
          soft: "#FDEEE4",
        },
        background: "#FFFFFF",
        foreground: "#1A1A1A",
        muted: "#6B6B6B",
        "muted-foreground": "#6B6B6B",
        border: "#E8E6E1",
        accent: {
          DEFAULT: "#C2410C",
          hover: "#A8370A",
          light: "#FDEEE4",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1A1A1A",
        },
      },
      fontFamily: {
        // Heading: Fraunces (serif modern). Body: Inter Tight.
        serif: ["var(--font-heading)", "Fraunces", "Georgia", "serif"],
        sans: ["var(--font-body)", "Inter Tight", "Inter", "system-ui", "sans-serif"],
        logo: ["var(--font-body)", "Inter Tight", "Inter", "sans-serif"],
      },
      fontSize: {
        // Skala: H1 64/36, H2 44/28, body 17px (ramah boomer)
        hero: ["64px", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        h2: ["44px", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      },
      borderRadius: {
        // Card TANPA shadow, radius max 8px
        card: "8px",
      },
      boxShadow: {
        // Hanya dipakai untuk dropdown/modal, bukan card produk
        pop: "0 8px 30px rgba(26,26,26,0.08)",
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1400px",
        },
      },
    },
  },
  plugins: [],
};
export default config;
