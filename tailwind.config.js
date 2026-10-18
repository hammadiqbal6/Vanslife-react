/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "amber-550": "#ff8c38",
      },
      fontFamily: {
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
        display: ['"Outfit"', '"DM Sans"', "system-ui", "sans-serif"],
      },
      maxHeight: {
        128: "32rem",
      },
      gridTemplateColumns: {
        fluid: "repeat(auto-fit,minmax(16rem,1fr))",
      },
    },
  },
  plugins: [],
};
