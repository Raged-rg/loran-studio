/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#020817',
        'soft-beige': '#071224',
        'light-beige': '#030B1A',
        'warm-brown': '#E5E7EB',
        'dark-brown': '#020817',
        gold: '#3B82F6',
        copper: '#2563EB',
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "'Cairo'", "'IBM Plex Sans Arabic'", "sans-serif"],
        marcellus: ["'Sora'", "'Cairo'", "sans-serif"],
        cinzel: ["'Sora'", "'Cairo'", "sans-serif"],
        alexandria: ["'Cairo'", "sans-serif"],
        'ibm-plex': ["'IBM Plex Sans Arabic'", "sans-serif"],
        sora: ["'Sora'", "sans-serif"],
        cairo: ["'Cairo'", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 12px 30px rgba(37, 99, 235, 0.035)',
        'premium': '0 20px 50px rgba(37, 99, 235, 0.08)',
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
