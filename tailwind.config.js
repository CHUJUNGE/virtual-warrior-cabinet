/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'breathe': 'breathe 3s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
