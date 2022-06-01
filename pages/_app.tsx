import { ThemeProvider } from 'next-themes'
import { type AppProps } from 'next/app'
import { Provider } from '~/components/app/Store'
import 'tailwindcss/tailwind.css'

const NextApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider disableTransitionOnChange attribute='class'>
    <div className='w-full h-screen flex flex-col items-center px-4'>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </div>
  </ThemeProvider>
)

export default NextApp
