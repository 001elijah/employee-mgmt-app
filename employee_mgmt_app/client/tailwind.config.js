/** @type {import('tailwindcss').Config} */
const nativewind = require("nativewind/tailwind/css");
module.exports = {
  content: ["./components/**/*.js", "./screens/**/*.js", "./App.js"],
  theme: {
    extend: {},
  },
  plugins: [nativewind],
};
