import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', ...fontFamily.sans],
        mono: ['var(--font-fira-code)', 'Fira Code', ...fontFamily.mono],
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
