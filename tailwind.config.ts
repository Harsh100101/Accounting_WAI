import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#F8FAFC",
        foreground: "#0F172A",
        surface: {
          DEFAULT: "#FFFFFF",
          elevated: "#FFFFFF",
          card: "#F8FAFC",
          hover: "#F1F5F9",
          border: "#E2E8F0",
          borderHover: "#CBD5E1"
        },
        brand: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#818CF8",
          400: "#6366F1",
          500: "#4F46E5",
          600: "#4338CA",
          700: "#3730A3",
          800: "#312E81",
          900: "#1E1B4B",
        },
        signal: {
          positive: "#059669",
          positiveBg: "#ECFDF5",
          positiveBorder: "#A7F3D0",
          watch: "#D97706",
          watchBg: "#FFFBEB",
          watchBorder: "#FDE68A",
          redFlag: "#DC2626",
          redFlagBg: "#FEF2F2",
          redFlagBorder: "#FECACA",
          neutral: "#475569",
          neutralBg: "#F1F5F9",
          neutralBorder: "#CBD5E1",
          investigate: "#7C3AED",
          investigateBg: "#F5F3FF",
          investigateBorder: "#DDD6FE",
        }
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.03)',
        'glow-indigo': '0 4px 14px 0 rgba(79, 70, 229, 0.2)',
        'glow-emerald': '0 4px 14px 0 rgba(5, 150, 105, 0.2)',
        'glow-amber': '0 4px 14px 0 rgba(217, 119, 6, 0.2)',
        'glow-rose': '0 4px 14px 0 rgba(220, 38, 38, 0.2)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
