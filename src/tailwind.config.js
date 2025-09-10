/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
      },
      colors: {
        primary: '#ff4fea',
        card: '#ffffffcc',
        accent: '#f9a8d4',
        deep: '#0f172a',
      },
    },
  },
  plugins: [],
}
