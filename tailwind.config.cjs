/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        robotoSlab: ["Roboto Slab", "serif"],
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
  daisyui: {
    styled: true,
    themes: ["dark"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
  plugins: [
    require("daisyui"),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ]
};
