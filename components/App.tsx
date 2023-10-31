'use client'

import { useCallback, useRef } from 'react'
import type { FC } from 'react'
import useKonami from 'react-use-konami'
import { ExtLink } from '~/components/ExtLink'
import { Advert } from '~/components/app/Advert'
import { Canvas } from '~/components/app/Canvas'
import { ExperimentalWarning } from '~/components/app/ExperimentalWarning'
import { Inputs } from '~/components/app/Inputs'
import { LoadImage } from '~/components/app/LoadImage'
import { QualityWarning } from '~/components/app/QualityWarning'
import { RenderDebugLayers } from '~/components/app/RenderDebugLayers'
import { SaveImage } from '~/components/app/SaveImage'
import { Button } from '~/components/input/Button'
import { useLayers } from '~/lib/hooks/useLayers'
import { useStore } from '~/lib/hooks/useStore'

export const App: FC = () => {
  const { state, dispatch } = useStore()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const layers = useLayers()

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

  useKonami(handleKonami, {
    code: [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a',
    ],
  })

  return (
    <>
      <Advert />
      <RenderDebugLayers layers={layers} />

      <div className='flex w-full max-w-[500px] flex-1 flex-col items-center gap-y-4'>
        <h1 className='mb-2 mt-6 text-4xl font-bold'>Pride Avatars! 🏳️‍🌈</h1>

        <ExperimentalWarning />
        <LoadImage />
        <Inputs />

        {!(state.showEasterEgg && !state.frames) ? null : (
          <Button onClick={onEasterEggClicked}>⭕</Button>
        )}

        <Canvas canvasRef={canvasRef} layers={layers} />
        <QualityWarning />
        <SaveImage canvasRef={canvasRef} layers={layers} />
      </div>

      <footer className='py-3 text-center'>
        <p>
          Made with 💝 by{' '}
          <ExtLink href='https://twitter.com/JackBaron__'>Lulu</ExtLink>
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
