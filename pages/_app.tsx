import Head from 'next/head'
import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

const NextApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <link
        href='https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Montserrat:wght@700&family=Fira+Mono:wght@500&display=swap'
        rel='stylesheet'
      />
    </Head>

    <Component {...pageProps} />
  </>
)

export default NextApp
