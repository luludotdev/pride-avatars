import { type NextPage } from 'next'
import { useCallback, useRef } from 'react'
import { Advert } from '~/components/app/Advert'
import { Canvas } from '~/components/app/Canvas'
import { ExperimentalWarning } from '~/components/app/ExperimentalWarning'
import { Inputs } from '~/components/app/Inputs'
import { LoadImage } from '~/components/app/LoadImage'
import { QualityWarning } from '~/components/app/QualityWarning'
import { SaveImage } from '~/components/app/SaveImage'
import { ExtLink } from '~/components/ExtLink'
import { Button } from '~/components/input/Button'
import { Meta } from '~/components/Meta'
import { PreloadFlags } from '~/components/PreloadFlags'
import { useKonami } from '~/lib/hooks/useKonami'
import { useStore } from '~/lib/hooks/useStore'

const Home: NextPage = () => {
  const { state, dispatch } = useStore()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const onEasterEggClicked = useCallback(() => {
    if (!canvasRef.current) return
    if (state.frames) return
    const canvas = canvasRef.current

    const b64 = canvas.toDataURL()
    dispatch({ type: 'setImage', value: b64 })
  }, [state, dispatch])

  const handleKonami = useCallback(() => {
    dispatch({ type: 'toggleEasterEgg' })
  }, [dispatch])

  useKonami(handleKonami)

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

        <ExperimentalWarning />
        <LoadImage />
        <Inputs />

        {!(state.showEasterEgg && !state.frames) ? null : (
          <Button onClick={onEasterEggClicked}>⭕</Button>
        )}

        <Canvas canvasRef={canvasRef} />
        <QualityWarning />
        <SaveImage canvasRef={canvasRef} />
      </div>

      <footer className='text-center py-3'>
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
