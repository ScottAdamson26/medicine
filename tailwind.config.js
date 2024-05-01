/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      boxShadow: {
        'custom-lg': '0 0px 12px -3px rgba(0, 0, 0, 0.15)',
        'custom-md': '0 12px 12px -10px rgba(0, 0, 0, 0.15), 0 -12px 12px -10px rgba(0, 0, 0, 0.05)',
        'custom-xl': '0 0px 20px 10px rgba(0, 0, 0, 0.03)'
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: { // Adding the colors section here
        'turq': '#24B0BA',
        'offwhite': '#f0f2f2',
      }
    },
  },
  plugins: []
}
