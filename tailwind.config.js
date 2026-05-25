/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F7EFE6',
        'soft-beige': '#EADCCB',
        'light-beige': '#F4ECE3',
        'warm-brown': '#7A4A2A',
        'dark-brown': '#2B1A12',
        gold: '#C89B5B',
        copper: '#B87333',
      },
      fontFamily: {
        marcellus: ["Marcellus", "serif"],
        cinzel: ["Cinzel", "serif"],
        tajawal: ["Tajawal", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 18px 42px rgba(92, 48, 18, 0.08)',
        'premium': '0 24px 70px rgba(92, 48, 18, 0.12)',
      },
      borderRadius: {
        'xl': '32px',
        'lg': '24px',
        'md': '18px',
      }
    },
  },
  plugins: [],
}
