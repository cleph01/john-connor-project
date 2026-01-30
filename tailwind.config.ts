import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core palette
        void: "#030303",
        terminal: "#0a0a0a",
        carbon: "#111111",
        slate: "#1a1a1a",
        ash: "#2a2a2a",

        // Signal colors
        crimson: {
          DEFAULT: "#ff1744",
          glow: "#ff174480",
          dark: "#b71c1c",
        },
        phosphor: {
          DEFAULT: "#00ff41",
          dim: "#00ff4140",
        },
        electric: {
          DEFAULT: "#00d4ff",
          dim: "#00d4ff30",
        },
        warning: "#ffab00",

        // Text hierarchy
        "text-primary": "#e8e8e8",
        "text-secondary": "#888888",
        "text-muted": "#555555",

        // Legacy support
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "Courier New", "monospace"],
        display: ["var(--font-display)", "Arial Black", "sans-serif"],
      },
      animation: {
        flicker: "flicker 4s infinite",
        "signal-pulse": "signal-pulse 2s ease-in-out infinite",
        scan: "scan 4s linear infinite",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.8" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.9" },
          "97%": { opacity: "1" },
        },
        "signal-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 5px rgba(255, 23, 68, 0.5)",
          },
          "50%": {
            boxShadow:
              "0 0 10px rgba(255, 23, 68, 0.5), 0 0 20px rgba(255, 23, 68, 0.5), 0 0 30px rgba(255, 23, 68, 0.5)",
          },
        },
        scan: {
          "0%": { top: "-10%" },
          "100%": { top: "110%" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
