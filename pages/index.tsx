import Head from 'next/head'
import { PreloadFlags } from '~components/PreloadFlags'
import type { NextPage } from 'next'

const Home: NextPage = () => (
  <>
    <PreloadFlags />
    <Head>
      <title>Pride Icons</title>
    </Head>

    <h1>Pride Icons</h1>
  </>
)

export default Home
