import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#303f59",
        orange: "#f5a623",
        "light-gray": "#1c2026",
        silver: "#3b4251",
        accent: "#88ffc7"
      },
      fontFamily: {
        heading: ["Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["Share Tech Mono", "monospace"]
      },
      borderRadius: {
        xl: "20px"
      }
    }
  },
  plugins: []
};

export default config;
