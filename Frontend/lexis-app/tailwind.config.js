/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      'light': '#c4dfdf',
      'light-medium': '#d2e9e9',
      'light-high': '#e4f4f4',
      'off-white': '#f8f6f4'
    },
    backgroundImage: {
      'custom-gradient': 'radial-gradient(circle, rgba(196,223,223,1) 5%, rgba(153,182,182,1) 30%, rgba(228,244,244,1) 53%, rgba(248,246,244,1) 79%);'
    }
  },
  plugins: [],
}

