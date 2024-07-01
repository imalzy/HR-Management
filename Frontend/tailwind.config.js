/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }

      md: "960px",
      // => @media (min-width: 960px) { ... }

      lg: "1440px",
      // => @media (min-width: 1440px) { ... }
    },
    // colors: {
    //   darkblue: "#123a6b",
    //   yellow: "#f7b928",
    //   skyblue: "#78b3e3",
    //   orange: "#db7a2a",
    //   gray: "#a2a2a3",
    // },
    extend: {},
  },
  plugins: [],
};
