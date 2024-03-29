/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'shadow-table' : 'rgba(114, 114, 113, 0.5)',
        'BgLight':'#F1EFF3',
        'BgDark' : '#151818',
        'MainLight' : '#FFFFFF',
        'MainDark' : '#1E2124',
        'TextLight' : '#555555',
        'TextDark' : '#FFFFFF',
        'BorderLight' : '#AEB2BE',
        'BorderDark' : '#FFFFFF',
        'TextHover' : '#1FABFF'
      },
      screens:{
        'navbreak': '1080px',
        'navmedium': '1420px'
      },
      transitionProperty: {
        'height': 'height',
      },
      keyframes: {
        jumpIn: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1.13)' },
          '100%': { transform: 'scale(1)' },
        },
        jumpOut: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
      },
      animation: {
        'jump-in': 'jumpIn 0.5s ease-in-out',
        'jump-out': 'jumpOut 0.5s ease-in-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
