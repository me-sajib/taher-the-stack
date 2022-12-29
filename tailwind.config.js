/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#eef0ff",
          100: "#e0e4ff",
          200: "#c6ccff",
          300: "#a4a9fd",
          400: "#8280f9",
          500: "#6e61f3",
          600: "#0072f5",
          700: "#5236cc",
          800: "#432fa4",
          900: "#392d82"
        }
      }
    }
  },
  content: [
    "./**/*.{js,ts,jsx,tsx}"
  ],
  plugins: [
    require("@tailwindcss/forms"),
    require('autoprefixer'),
    // require("rippleui")
  ]
}
