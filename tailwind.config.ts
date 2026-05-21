import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17211c",
        moss: "#2f5d50",
        leaf: "#70a288",
        coral: "#e86f51",
        gold: "#f2b84b",
        mist: "#f4f7f5"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(23, 33, 28, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
