import './tailwind.css'

import { Fira_Code as FiraCode, Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import { ThemeProvider } from '~/components/theme-provider'
import { CanvasProvider } from '~/lib/data/canvas'
import { flags } from '~/lib/flags'
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
  <html lang='en' suppressHydrationWarning>
    <head>
      <link as='image' href='https://lulu.dev/avatar.png' rel='preload' />
      {flags.map(([name, url]) => (
        <link as='image' href={url} key={name} rel='preload' />
      ))}
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
