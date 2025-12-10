/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stone-50': '#F9F8F6', // Custom off-white
        'stone-100': '#E6DED5',
        'champagne': '#D4C4A8',
        'champagne-dark': '#C0B093',
        'text-main': '#2C2C2C',
        'text-muted': '#666666',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Lato"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}