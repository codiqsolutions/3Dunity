// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a', // charcoal
        accent: '#b8860b', // gold/bronze
        background: '#fafafa', // warm off‑white
      },
    },
  },
  plugins: [],
};
