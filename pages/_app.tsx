import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from '~components/app/Store'
import 'tailwindcss/tailwind.css'

const NextApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <link rel='icon' type='image/png' href='./favicon.png' />

      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <link
        // Body
        href='https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap'
        rel='stylesheet'
      />

      <link
        // Title
        href='https://fonts.googleapis.com/css2?&family=Montserrat:wght@700&display=swap&text=Pride Icons!'
        rel='stylesheet'
      />

      <link
        // Mono
        href='https://fonts.googleapis.com/css2?&family=Fira+Mono:wght@500&display=swap&text=0.123456789px-%C2%B0shit'
        rel='stylesheet'
      />
    </Head>

    <ThemeProvider disableTransitionOnChange attribute='class'>
      <div className='w-full h-screen flex flex-col items-center px-4'>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </div>
    </ThemeProvider>
  </>
)

export default NextApp
