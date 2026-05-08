/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./menu.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebf0fe',
          200: '#ced9fd',
          300: '#a1b6fb',
          400: '#6d8bf7',
          500: '#435ff2',
          600: '#2c3ee6',
          700: '#232fcc',
          800: '#2129a6',
          900: '#1f2784',
          950: '#12164d',
        },
      },
    },
  },
  plugins: [],
}
