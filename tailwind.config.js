/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        military: {
          50: '#f0f4f0',
          100: '#d9e6d9',
          200: '#b3ccb3',
          300: '#8cb28c',
          400: '#6b9b7f',
          500: '#4a7c59',  // Primary military green
          600: '#3d6649',
          700: '#2d4a2b',  // Dark military green
          800: '#1f3320',
          900: '#152217',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#f0d673',
          dark: '#b8941f',
        },
        tan: {
          DEFAULT: '#c19a6b',
          light: '#d4b896',
          dark: '#a67c52',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
