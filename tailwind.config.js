module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'prod',
    content: [
      './src/html/**/*.+(html|njk)',
      './src/css/**/*.css',
      './src/js/**/*.js'
    ],
    options: {
      keyframes: true, // delete not used keyframes as well
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
