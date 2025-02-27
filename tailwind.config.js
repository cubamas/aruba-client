/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: ["dracula", "light"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
