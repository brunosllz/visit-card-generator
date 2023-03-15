/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.tsx'],
  safelist: [
    {
      pattern: /grid-cols-./,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'san-serif'],
      },
    },
  },
  plugins: [],
}
