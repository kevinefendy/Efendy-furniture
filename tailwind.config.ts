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
        background: "#F7F5F0",
        foreground: "#20201E",
        muted: "#817A71",
        "muted-foreground": "#817A71",
        border: "#E5E1DB",
        accent: {
          DEFAULT: "#A88968",
          hover: "#8E7253",
          light: "#F0EAE1",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#20201E",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
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
