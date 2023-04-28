import 'tailwindcss/tailwind.css'

import type { AppProps } from 'next/app'
import { Provider } from '~/components/app/Store'

const NextApp = ({ Component, pageProps }: AppProps) => (
  <div className='w-full h-screen flex flex-col items-center px-4'>
    <Provider>
      <Component {...pageProps} />
    </Provider>
  </div>
)

export default NextApp
