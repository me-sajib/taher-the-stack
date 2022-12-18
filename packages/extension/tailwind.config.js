/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: ["./**/*.{ts,tsx}", './node_modules/tw-elements/dist/js/**/*.js'],
  variants: { extend: { typography: ["dark"] } },
  plugins: [
    require('tw-elements/dist/plugin')
  ]
}
