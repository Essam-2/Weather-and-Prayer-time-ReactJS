/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    screens: {
      sm: "320px",
      md: "640px",
      // => @media (min-width: 640px) { ... }

      xl: "1024px",
      // => @media (min-width: 1024px) { ... }

      "2xl": "1680px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        main: "#245953",
        light_green: "#408E91",
        light_orange: "#E49393",
        light_yellow: "#D8D8D8",
      },
      fontFamily: {
        Nunito: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
};
