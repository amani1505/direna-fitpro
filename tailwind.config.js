/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      primary: "hsl(12, 98%, 52%)",
      medium: "rgba(0,0,0,0.5)",
      secondary: "#c0c0c0",
      black: "black",
      white: "white",
    },
    fontFamily: {
      "pt-serif": ["PT Serif", "serif"],
      montserrat: ["Montserrat", "sans-serif"],
      raleway: ["Raleway"],
      varela: ["Varela Round", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
}