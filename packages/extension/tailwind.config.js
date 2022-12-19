/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        blue: {
          '50': '#eef0ff',
          '100': '#e0e4ff',
          '200': '#c6ccff',
          '300': '#a4a9fd',
          '400': '#8280f9',
          '500': '#6e61f3',
          '600': '#593de6',
          '700': '#5236cc',
          '800': '#432fa4',
          '900': '#392d82',
        },
      }
    }
  },
  content: ["./**/*.{ts,tsx}", "./node_modules/tw-elements/dist/js/**/*.js"],
  variants: { extend: { typography: ["dark"] } },
  plugins: [[require('@tailwindcss/forms')]]
}
