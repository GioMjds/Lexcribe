/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

const scrollbar = require("tailwind-scrollbar");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        "light": "#c4dfdf",
        "light-medium": "#d2e9e9",
        "light-high": "#e4f4f4",
        "off-white": "#f8f6f4",
        "gray1": "#353535",
        "gray2": "#545454",
        "gray3": "#747474",
        "gray4": "#939393",
        "gray5": "#b4b4b4",
      },
    },
    backgroundImage: {
      "custom-gradient": "linear-gradient(135deg, rgba(53,53,53,1) 15%, rgba(84,84,84,1) 35%, rgba(147,147,147,1) 65%, rgba(180,180,180,1) 85%);",
    },
  },
  plugins: [flowbite.plugin()],
};

