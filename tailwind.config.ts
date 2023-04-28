import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        mono: ['Fira Code', ...fontFamily.mono],
        title: ['Montserrat', ...fontFamily.sans],
      },
      colors: {
        light: '#fefdfe',
        dark: '#1f1e1f',
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
  plugins: [],
} satisfies Config
