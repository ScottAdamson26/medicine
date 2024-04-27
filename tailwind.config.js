/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      boxShadow: {
        'custom-lg': '0 0px 12px -3px rgba(0, 0, 0, 0.15)'
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
