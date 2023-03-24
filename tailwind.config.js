/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#611313",
        "color-primary": "#F64141",
        "color-heading": "#D4CCB8",
        "color-text": "#D9D9D9",
        "custom-black": "#1A1A1A",
        "custom-white": "#FFFFFF",
        "cobalt-blue": "#0047AB",
      },
    },
    fontFamily: {
      k2d: ["K2D", "sans-serif"],
    },
  },
  plugins: [],
};
