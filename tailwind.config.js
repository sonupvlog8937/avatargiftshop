/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        burgundy: { DEFAULT: '#641E35', dark: '#4A1426' },
        gold: { DEFAULT: '#D4AF72', dark: '#A8864A' },
        cream: '#FFF9F1',
        softpink: '#F5DDE4',
        ink: '#292524',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
