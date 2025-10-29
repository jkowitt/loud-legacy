import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0c0d0f",
        surface: {
          DEFAULT: "#14171c",
          elevated: "#1c2026",
          subtle: "#101317"
        },
        brand: {
          50: "#f3f5f7",
          100: "#d1d8e0",
          200: "#aab4c5",
          300: "#8390aa",
          400: "#5b6c90",
          500: "#405274",
          600: "#303f59",
          700: "#202b3d",
          800: "#131a26",
          900: "#090d13"
        },
        accent: "#88ffc7",
        warning: "#f5a623",
        success: "#75f0a0"
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "-apple-system", "sans-serif"],
        mono: ["'Share Tech Mono'", "monospace"]
      },
      boxShadow: {
        hard: "0 0 0 1px rgba(255,255,255,0.05), 0 10px 40px rgba(0,0,0,0.45)"
      },
      backgroundImage: {
        "grain-overlay":
          "radial-gradient(circle at 20% 20%, rgba(136, 255, 199, 0.08), transparent 60%), radial-gradient(circle at 80% 0%, rgba(245, 166, 35, 0.05), transparent 55%)"
      }
    }
  },
  plugins: []
} satisfies Config;
