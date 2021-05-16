import Head from 'next/head'
import { PreloadFlags } from '~components/PreloadFlags'
import type { NextPage } from 'next'

const Home: NextPage = () => (
  <>
    <PreloadFlags />
    <Head>
      <title>Pride Icons</title>
    </Head>

    <div className='w-full h-screen flex justify-center px-4'>
      <div className='flex flex-col items-center w-full max-w-[500px]'>
        <h1 className='text-4xl my-6 font-title'>Pride Icons! 🏳️‍🌈</h1>
      </div>
    </div>
  </>
)

export default Home
