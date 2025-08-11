/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8edf2',
          100: '#d1dbe5',
          200: '#a3b7cb',
          300: '#7593b1',
          400: '#476f97',
          500: '#13253d',
          600: '#0f1e30',
          700: '#0b1724',
          800: '#071018',
          900: '#03080c',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Oswald', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 