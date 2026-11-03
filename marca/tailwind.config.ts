import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    borderRadius: { none: "0", DEFAULT: "0" },
    extend: {
      colors: {
        bg: "#F2F2F0",
        studio: "#E9E9E6",
        ink: "#0A0A0A",
        muted: "#6B6B6B",
        line: "#D6D6D2",
        accent: "#8E1B24",
      },
      fontFamily: {
        sans: ["Archivo", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      letterSpacing: { label: "0.08em" },
      maxWidth: { site: "1600px" },
    },
  },
  plugins: [],
} satisfies Config;
