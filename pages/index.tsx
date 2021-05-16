import Head from 'next/head'
import { useRef } from 'react'
import { Canvas } from '~components/app/Canvas'
import { Inputs } from '~components/app/Inputs'
import { LoadImage } from '~components/app/LoadImage'
import { SaveImage } from '~components/app/SaveImage'
import { ExtLink } from '~components/ExtLink'
import { Container } from '~components/layout/Container'
import { Footer } from '~components/layout/Footer'
import { PreloadFlags } from '~components/PreloadFlags'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return (
    <>
      <Container>
        <Head>
          <title>Pride Icons</title>
        </Head>
        <PreloadFlags />

        <h1 className='text-4xl my-6 font-title'>Pride Icons! 🏳️‍🌈</h1>

        <LoadImage />
        <Inputs />
        <Canvas canvasRef={canvasRef} />
        <SaveImage canvasRef={canvasRef} />
      </Container>

      <Footer>
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
      </Footer>
    </>
  )
}

export default Home
