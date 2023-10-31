import './tailwind.css'

import { clsx } from 'clsx'
import { Fira_Code as FiraCode, Inter } from 'next/font/google'
import type { FC, PropsWithChildren } from 'react'
import { PreloadFlags } from '~/components/PreloadFlags'
import { Provider } from '~/components/app/Store'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700'],
})

const firaCode = FiraCode({
  variable: '--font-fira-code',
  subsets: ['latin'],
  display: 'swap',
  weight: ['500'],
})

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html className={clsx(inter.variable, firaCode.variable)} lang='en'>
    <head>
      <PreloadFlags />
    </head>

    <body className='bg-light dark:bg-dark dark:text-light'>
      <div className='flex h-screen w-full flex-col items-center px-4'>
        <Provider>{children}</Provider>
      </div>
    </body>
  </html>
)

export default RootLayout
