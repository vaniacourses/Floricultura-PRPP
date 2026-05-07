/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rosa-claro': '#FFE3F2',
        'rosa-choque': '#B7176C',
        'mostarda': '#FFA213',
        'azul': '#3B5BC4',
        'roxo': '#480058',
      }
    },
  },
  plugins: [],
}