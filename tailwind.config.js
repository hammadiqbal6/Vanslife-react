/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      ...colors,
      "amber-550": "#ff8c38",
    },
    extend: {
      maxHeight: {
        128: "32rem",
      },
      gridTemplateColumns: {
        fluid: "repeat(auto-fit,minmax(20rem,1fr))",
      },
    },
  },
  plugins: [],
};
