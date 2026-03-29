import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        surface: {
          level0: "#0a0a0a",
          level1: "#0f0f0f",
          level2: "#111111",
          level3: "#141414",
        },
        border: {
          subtle: "#1a1a1a",
          default: "#222222",
          hover: "#333333",
        },
        text: {
          primary: "#ffffff",
          secondary: "#a1a1a1",
          muted: "#666666",
          disabled: "#555555",
        },
        accent: {
          primary: "#2DD4BF",
          hover: "#26b8a6",
        },
      },
    },
  },
  plugins: [],
};

export default config;
