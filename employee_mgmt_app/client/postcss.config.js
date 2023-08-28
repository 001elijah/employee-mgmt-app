module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),
    require("nativewind/postcss"),
  ],
};

module.exports = {
  plugins: {
    "nativewind/postcss": {
      output: "nativewind-output.js",
    },
  },
};
