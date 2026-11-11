/** @type {import('tailwindcss').Config} */

// Theme tokens live as RGB channels on :root / .dark (see src/styles.scss),
// so every semantic color below flips automatically between light and dark.
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

const bodyStack = ["Figtree", "system-ui", "-apple-system", "Segoe UI", "sans-serif"];
const displayStack = ["Bricolage Grotesque", "Figtree", "system-ui", "sans-serif"];

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  important: true,
  theme: {
    extend: {
      screens: {
        xs: "420px",
      },
      colors: {
        // Semantic, theme-aware tokens
        bg: token("bg"),
        sunken: token("sunken"),
        surface: {
          DEFAULT: token("surface"),
          2: token("surface-2"),
        },
        ink: token("ink"),
        muted: token("muted"),
        subtle: token("subtle"),
        line: token("line"),
        lilac: {
          DEFAULT: token("lilac"),
          soft: token("lilac-soft"),
        },

        // Brand: "Heat" coral
        primary: {
          50: "#fff1ef",
          100: "#ffdcd7",
          200: "#ffb8ae",
          300: "#ff8e80",
          400: "#ff6a59",
          500: "#ff4836",
          600: "#e8331f",
          700: "#c22717",
          800: "#992014",
          900: "#731a12",
          950: "#420a05",
        },
        // Secondary: "Haze" violet (was forest green)
        secondary: {
          25: "#f6f3ff",
          50: "#eee9ff",
          100: "#ddd3ff",
          200: "#c3b2ff",
          300: "#a68cff",
          400: "#8f6dff",
          500: "#7a56f5",
          600: "#6541db",
          700: "#5133b3",
          800: "#3e2889",
          900: "#2b1c5f",
        },
        medium: "rgba(0,0,0,0.5)",
        black: "black",
        white: "white",
        // Dark-mode palette (plum-tinted greys). Existing dark:*-night-* classes use it.
        night: {
          50: "#f4f1fa",
          100: "#e2ddeb",
          200: "#bdb6ca",
          300: "#968fa5",
          400: "#726b82",
          500: "#3a3446",
          600: "#2a2534",
          700: "#1a1622",
          800: "#110e17",
          900: "#0b0910",
        },
      },
      fontFamily: {
        sans: bodyStack,
        display: displayStack,
        // Legacy families used across templates, unified onto the new pair.
        poppins: bodyStack,
        montserrat: bodyStack,
        raleway: bodyStack,
        varela: displayStack,
        rubik: bodyStack,
        catamaran: displayStack,
        "pt-serif": ["PT Serif", "Georgia", "serif"],
      },
      maxWidth: {
        // Shared content width for landing pages; wide enough for large screens.
        page: "92rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        pop: "var(--shadow-pop)",
        "pop-sm": "var(--shadow-pop-sm)",
        soft: "0 1px 2px rgb(var(--c-ink) / 0.04), 0 8px 24px -12px rgb(var(--c-ink) / 0.18)",
        glow: "0 10px 40px -10px rgb(255 72 54 / 0.55)",
        custom: "0 1px 2px rgb(var(--c-ink) / 0.06), 0 12px 32px -12px rgb(var(--c-ink) / 0.25)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "out-expo": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "fade-in-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out-down": {
          from: { opacity: "1", transform: "translateY(0px)" },
          to: { opacity: "0", transform: "translateY(10px)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out-up": {
          from: { opacity: "1", transform: "translateY(0px)" },
          to: { opacity: "0", transform: "translateY(10px)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
        "slide-left": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-right": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(28px) rotate(1deg)" },
          "100%": { opacity: "1", transform: "translateY(0) rotate(0)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.85) translateY(12px)" },
          "60%": { opacity: "1", transform: "scale(1.03) translateY(0)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.08)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        "fade-in-down": "fade-in-down 0.3s ease-out",
        "fade-out-down": "fade-out-down 0.3s ease-out",
        "fade-in-up": "fade-in-up 0.3s ease-out",
        "fade-out-up": "fade-out-up 0.3s ease-out",
        "slide-up": "slide-up 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        "slide-down": "slide-down 0.45s cubic-bezier(0.64, 0, 0.78, 0)",
        "slide-left": "slide-left 0.5s ease-in-out",
        "slide-right": "slide-right 0.5s ease-in-out",
        rise: "rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "pop-in": "pop-in 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        marquee: "marquee 28s linear infinite",
        shimmer: "shimmer 1.6s infinite",
        float: "float 5s ease-in-out infinite",
        blob: "blob 14s ease-in-out infinite",
        "spin-slow": "spin-slow 18s linear infinite",
      },
    },
  },
  plugins: [],
};
