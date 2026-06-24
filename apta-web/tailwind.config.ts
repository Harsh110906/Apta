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
        midnight: {
          DEFAULT: "hsl(222, 47%, 11%)",
          900: "hsl(222, 47%, 13%)",
          800: "hsl(222, 47%, 15%)",
          700: "hsl(222, 40%, 20%)",
          600: "hsl(222, 35%, 28%)",
          500: "hsl(222, 30%, 36%)",
        },
        brand: {
          orange: "hsl(24, 95%, 53%)",
        },
        orange: {
          100: "hsl(33, 100%, 93%)",
          300: "hsl(30, 97%, 72%)",
          400: "hsl(27, 96%, 61%)",
          500: "hsl(24, 95%, 53%)",
          600: "hsl(21, 90%, 48%)",
        },
        neutral: {
          50: "hsl(210, 40%, 98%)",
          100: "hsl(210, 30%, 96%)",
          200: "hsl(214, 25%, 90%)",
          300: "hsl(214, 20%, 82%)",
          400: "hsl(215, 15%, 60%)",
          500: "hsl(215, 18%, 50%)",
          600: "hsl(215, 20%, 40%)",
          700: "hsl(215, 25%, 30%)",
          800: "hsl(215, 30%, 20%)",
          900: "hsl(222, 47%, 11%)",
        },
        gold: {
          DEFAULT: "hsl(45, 93%, 47%)",
          light: "hsl(45, 93%, 85%)",
        },
        emerald: {
          DEFAULT: "hsl(160, 84%, 39%)",
          light: "hsl(160, 60%, 90%)",
        },
        rose: {
          DEFAULT: "hsl(350, 89%, 60%)",
          light: "hsl(350, 80%, 93%)",
        },
        sky: {
          DEFAULT: "hsl(199, 89%, 48%)",
          light: "hsl(199, 80%, 92%)",
        },
        rank: {
          unranked: "hsl(215, 15%, 60%)",
          bronze: "hsl(30, 50%, 50%)",
          silver: "hsl(210, 10%, 72%)",
          gold: "hsl(45, 93%, 47%)",
          platinum: "hsl(200, 20%, 80%)",
          diamond: "hsl(199, 89%, 60%)",
          elite: "hsl(270, 70%, 55%)",
        },
        "bg-primary": "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-tertiary": "var(--bg-tertiary)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "border": "var(--border)",
        "border-strong": "var(--border-strong)",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      }
    },
  },
  plugins: [],
};

export default config;
