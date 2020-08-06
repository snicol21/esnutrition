module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js", "./src/**/*.jsx"],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "HelveticaNeue", "Helvetica Neue", "sans-serif"],
    },
    extend: {
      colors: {
        "smoke-dark": "rgba(0, 0, 0, 0.75)",
        smoke: "rgba(0, 0, 0, 0.5)",
        "smoke-light": "rgba(0, 0, 0, 0.25)",
      },
    },
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"],
  },
  plugins: [],
}
