import Document, { Head, Html, Main, NextScript } from 'next/document'
import type { DocumentContext } from 'next/document'

class MyDocument extends Document {
  public static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  public render() {
    return (
      <Html lang='en'>
        <Head>
          <link href='./favicon.png' rel='icon' type='image/png' />

          <link href='https://fonts.gstatic.com' rel='preconnect' />
          <link
            // Body
            href='https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap'
            rel='stylesheet'
          />

          <link
            // Title
            href='https://fonts.googleapis.com/css2?&family=Montserrat:wght@700&display=swap&text=Pride Avatars!'
            rel='stylesheet'
          />

          <link
            // Mono
            href='https://fonts.googleapis.com/css2?&family=Fira+Mono:wght@500&display=swap&text=0.123456789px-%C2%B0shit'
            rel='stylesheet'
          />
        </Head>

        <body className='bg-light dark:bg-dark dark:text-light'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
