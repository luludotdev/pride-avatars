import type { NextPage } from 'next'
import { useRef } from 'react'
import { Advert } from '~components/app/Advert'
import { Canvas } from '~components/app/Canvas'
import { Inputs } from '~components/app/Inputs'
import { LoadImage } from '~components/app/LoadImage'
import { SaveImage } from '~components/app/SaveImage'
import { ExtLink } from '~components/ExtLink'
import { Meta } from '~components/Meta'
import { PreloadFlags } from '~components/PreloadFlags'

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return (
    <>
      <Advert />

      <div className='flex flex-col flex-1 items-center w-full max-w-[500px] gap-y-4'>
        <PreloadFlags />
        <Meta
          title='Pride Avatars!'
          description='Enhance your social media avatars with a pride flag border!'
          colour='#afa5fd'
          ogImage='/favicon.png'
        />

        <h1 className='text-4xl mt-6 mb-2 font-title'>Pride Avatars! 🏳️‍🌈</h1>

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
          <ExtLink href='https://github.com/lolPants/pride-avatars'>
            GitHub
          </ExtLink>
        </p>
      </footer>
    </>
  )
}

export default Home
