import Head from 'next/head'
import { Provider } from '~components/app/Store'
import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

const NextApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <link rel='icon' type='image/png' href='./favicon.png' />

      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <link
        href='https://fonts.googleapis.com/css2?family=Inter:wght@500;600&family=Montserrat:wght@700&family=Fira+Mono:wght@500&display=swap'
        rel='stylesheet'
      />
    </Head>

    <div className='w-full h-screen flex flex-col items-center px-4'>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </div>
  </>
)

export default NextApp
