/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(12, 98%, 52%)",
        medium: "rgba(0,0,0,0.5)",
        secondary: "#2d6f17",
        black: "black",
        white: "white",
      },
      fontFamily: {
        "pt-serif": ["PT Serif", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
        raleway: ["Raleway"],
        varela: ["Varela Round", "sans-serif"],
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "slide-up": "slide-up 0.5s ease-out",
        "slide-down": "slide-down 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
