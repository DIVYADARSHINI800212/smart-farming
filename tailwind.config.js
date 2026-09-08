/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-green': '#12372A',
        'agri-green': '#2E7D32',
        'soft-green': '#A8D5BA',
        'cream': '#F5F3E8',
        'dark-forest': '#172117',
        'warning-amber': '#F4B942',
        'danger-red': '#D9534F',
        brand: {
          50: '#F5F3E8',
          100: '#E6F0EB',
          200: '#C8E2D3',
          300: '#A8D5BA',
          500: '#2E7D32',
          700: '#1B5E20',
          800: '#12372A',
          900: '#0E281E',
          950: '#172117',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(18, 55, 42, 0.05), 0 1px 2px -1px rgba(18, 55, 42, 0.05)',
        'card': '0 4px 6px -1px rgba(18, 55, 42, 0.07), 0 2px 4px -2px rgba(18, 55, 42, 0.05)',
        'card-hover': '0 10px 15px -3px rgba(18, 55, 42, 0.1), 0 4px 6px -4px rgba(18, 55, 42, 0.08)',
        'glow-green': '0 0 15px rgba(46, 125, 50, 0.3)',
      }
    },
  },
  plugins: [],
}
