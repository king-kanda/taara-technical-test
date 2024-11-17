/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container : {
      center : true ,
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'], // This makes Poppins the default font
    },
    extend: {},
  },
  plugins: [],
}

