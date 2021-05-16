const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        mono: ['Fira Mono', ...fontFamily.mono],
        title: ['Montserrat', ...fontFamily.sans],
      },
      colors: {
        light: '#fefdfe',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
