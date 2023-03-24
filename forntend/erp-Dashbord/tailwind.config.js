/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/css/index.css","./src/css/component.css","./src/css/App.css",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode:['class'],
  theme: {
    extend: {
      fontFamily : {
        'sobit' : ['Manrope', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
