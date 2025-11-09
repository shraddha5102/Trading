/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A1B1E',
        secondary: '#27282B',
        accent: '#3B82F6',
        success: '#22C55E',
        error: '#EF4444',
        warning: '#F59E0B',
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        'price-flash-green': 'priceFlashGreen 1s cubic-bezier(0.4, 0, 0.2, 1)',
        'price-flash-red': 'priceFlashRed 1s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 0.2s ease-out',
        'slide-down': 'slideDown 0.2s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        priceFlashGreen: {
          '0%': { backgroundColor: 'rgba(34, 197, 94, 0.15)' },
          '50%': { backgroundColor: 'rgba(34, 197, 94, 0.075)' },
          '100%': { backgroundColor: 'transparent' },
        },
        priceFlashRed: {
          '0%': { backgroundColor: 'rgba(239, 68, 68, 0.15)' },
          '50%': { backgroundColor: 'rgba(239, 68, 68, 0.075)' },
          '100%': { backgroundColor: 'transparent' },
        },
        slideUp: {
          '0%': { transform: 'translateY(0.5rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-0.5rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}