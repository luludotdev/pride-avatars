import './tailwind.css'

import { Fira_Code as FiraCode, Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import { PreloadFlags } from '~/components/PreloadFlags'
import { ThemeProvider } from '~/components/theme-provider'
import { cn } from '~/lib/utils'

const fontSans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700'],
})

const fontMono = FiraCode({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['500'],
})

const RootLayout = ({ children }: { readonly children: ReactNode }) => (
  <html lang='en'>
    <head>
      <PreloadFlags />
    </head>

    <body
      className={cn(
        'bg-background min-h-screen font-sans antialiased',
        fontSans.variable,
        fontMono.variable,
      )}
    >
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        disableTransitionOnChange
        enableSystem
      >
        {children}
      </ThemeProvider>
    </body>
  </html>
)

export default RootLayout
