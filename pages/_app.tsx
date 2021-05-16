import type { AppProps } from 'next/app'

const NextApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
)

export default NextApp
