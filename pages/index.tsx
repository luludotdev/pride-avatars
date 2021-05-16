import Head from 'next/head'
import { useRef } from 'react'
import { Canvas } from '~components/app/Canvas'
import { Inputs } from '~components/app/Inputs'
import { LoadImage } from '~components/app/LoadImage'
import { SaveImage } from '~components/app/SaveImage'
import { ExtLink } from '~components/ExtLink'
import { PreloadFlags } from '~components/PreloadFlags'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return (
    <>
      <div className='flex flex-col flex-1 items-center w-full max-w-[500px] gap-y-4'>
        <Head>
          <title>Pride Icons</title>
        </Head>
        <PreloadFlags />

        <h1 className='text-4xl mt-6 mb-2 font-title'>Pride Icons! 🏳️‍🌈</h1>

        <LoadImage />
        <Inputs />
        <Canvas canvasRef={canvasRef} />
        <SaveImage canvasRef={canvasRef} />
      </div>

      <footer className='text-center my-3'>
        <p>
          Made with 💝 by{' '}
          <ExtLink href='https://twitter.com/JackBaron__'>
            lolPants#0001
          </ExtLink>
        </p>

        <p>
          Source available on{' '}
          <ExtLink href='https://github.com/lolPants/pride-icons'>
            GitHub
          </ExtLink>
        </p>
      </footer>
    </>
  )
}

export default Home
