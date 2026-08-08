/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "lush-green": "#0D3B2E",
        "sandy-off-white": "#F9F3D9",
        "sunny-yellow": "#F4C430",
        "magenta-pink": "#E91E63",
        "palm-green": "#2E7D32",
        "deep-border": "#1A1A1A",
        "surface-bright": "#fff9e6",
        "surface-container": "#f4eed4",
        "surface-container-high": "#eee8cf",
        "surface-container-highest": "#e9e3c9",
        "surface-variant": "#e9e3c9",
        "on-surface-variant": "#414845"
      },
      fontFamily: {
        "display-lg": ["Anybody", "sans-serif"],
        "headline-lg": ["Anybody", "sans-serif"],
        "body-lg": ["Hanken Grotesk", "sans-serif"],
        "body-md": ["Hanken Grotesk", "sans-serif"],
        "label-code": ["JetBrains Mono", "monospace"],
        "label-caps": ["Hanken Grotesk", "sans-serif"]
      },
      borderWidth: {
        "thin": "2px",
        "thick": "4px"
      },
      boxShadow: {
        "retro": "4px 4px 0px 0px #0D3B2E",
        "retro-lg": "8px 8px 0px 0px #0D3B2E",
        "retro-yellow": "4px 4px 0px 0px #F4C430",
        "retro-pink": "4px 4px 0px 0px #E91E63",
        "retro-sm": "2px 2px 0px 0px #0D3B2E"
      }
    },
  },
  plugins: [],
}
