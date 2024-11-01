/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ffe9e7", // Very light
          100: "#ffc6bf",
          200: "#ff9e92",
          300: "#ff7767",
          400: "#ff5140",
          500: "#ff4836", // Original color
          600: "#e63f31",
          700: "#bf3529",
          800: "#992b21",
          900: "#731f19", // Very dark
        },
        medium: "rgba(0,0,0,0.5)",
        secondary: "#2d6f17",
        black: "black",
        white: "white",
        night: {
          50: "rgba(229, 231, 235, 1)",
          100: "rgba(209, 213, 219, 1)",
          200: "rgba(156, 163, 175, 1)",
          300: "rgba(107, 114, 128, 1)",
          400: "rgba(75, 85, 99, 1)",
          500: "rgba(55, 65, 81, 1)",
          600: "rgba(44, 55, 75, 1)",
          700: "rgba(31, 41, 55, 1)",
          800: "rgba(17, 24, 39, 1)",
          900: "rgba(10, 13, 20, 1)",
        },
      },
      fontFamily: {
        "pt-serif": ["PT Serif", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
        raleway: ["Raleway"],
        varela: ["Varela Round", "sans-serif"],
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-down": {
          from: {
            opacity: "1",
            transform: "translateY(0px)",
          },
          to: {
            opacity: "0",
            transform: "translateY(10px)",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-up": {
          from: {
            opacity: "1",
            transform: "translateY(0px)",
          },
          to: {
            opacity: "0",
            transform: "translateY(10px)",
          },
        },
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
        wiggle: "wiggle 1s ease-in-out infinite",
        "fade-in-down": "fade-in-down 0.3s ease-out",
        "fade-out-down": "fade-out-down 0.3s ease-out",
        "fade-in-up": "fade-in-up 0.3s ease-out",
        "fade-out-up": "fade-out-up 0.3s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
        "slide-down": "slide-down 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
