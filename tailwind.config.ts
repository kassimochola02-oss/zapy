import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        zap: {
          forest: "#218838",
          deep: "#14652D",
          mint: "#F0F8F0",
          orange: "#FF9F1C",
          charcoal: "#202820",
          grey: "#F4F6F4",
          line: "#DCEBDD",
        },
      },
      boxShadow: { card: "0 2px 12px rgba(20, 101, 45, 0.08)" },
      borderRadius: { "2xl": "1rem" },
    },
  },
  plugins: [],
};
export default config;
