/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{tsx, jsx, ts, js}"],
  theme: {
    extend: {
      colors: {
        "grayish-white": "#f8f8fc",
        "light-black": "#121214",
        "surface-black": "#242424",
        "vibrant-blue": "#42d3ff",
      },
    },
  },
  plugins: [],
};
