/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F7F2EC',
        'soft-beige': '#E8DDD0',
        'light-beige': '#FFFDF9',
        'warm-brown': '#3A2B24',
        'dark-brown': '#3A2B24',
        gold: '#C8A97E',
        copper: '#C8A97E',
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
        'soft': '0 12px 30px rgba(122, 74, 42, 0.035)',
        'premium': '0 20px 50px rgba(122, 74, 42, 0.06)',
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
