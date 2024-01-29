import './tailwind.css'

import { Fira_Code as FiraCode, Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import { PreloadFlags } from '~/components/PreloadFlags'
import { ThemeProvider } from '~/components/theme-provider'
import { cn } from '~/lib/utils'
import { CanvasProvider } from './_components/canvas'

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
  <html lang='en' suppressHydrationWarning>
    <head>
      <link as='image' href='https://lulu.dev/avatar.png' rel='preload' />

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
        <CanvasProvider>{children}</CanvasProvider>
      </ThemeProvider>
    </body>
  </html>
)

export default RootLayout
