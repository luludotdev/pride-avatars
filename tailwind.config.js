const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        mono: ['Fira Mono', ...fontFamily.mono],
        title: ['Montserrat', ...fontFamily.sans],
      },
      colors: {
        gray: colors.gray,
        light: '#fefdfe',
        accent: {
          light: '#8879fc',
          dark: '#afa5fd',
        },
      },
      gridTemplateColumns: {
        input: 'fit-content(2000px) auto',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
