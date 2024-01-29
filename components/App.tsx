'use client'

import { useCallback, useEffect, useRef } from 'react'
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
import { useStore } from '~/lib/store'

export const App: FC = () => {
  const frames = useStore(state => state.frames)
  const showRecursionEasterEgg = useStore(state => state.showRecursionEasterEgg)
  const showOrangeEasterEgg = useStore(state => state.showOrangeEasterEgg)

  const loadImage = useStore(state => state.loadImage)
  const toggleRecursion = useStore(state => state.toggleRecursionEasterEgg)
  const enableOrangeEasterEgg = useStore(state => state.enableOrangeEasterEgg)
  const toggleOrangeEasterEgg = useStore(state => state.toggleOrangeEasterEgg)

  useEffect(() => {
    const now = new Date()
    const isAprilFools = now.getMonth() === 3 && now.getDate() === 1

    const rand = Math.random()
    const chance = isAprilFools ? 0.666_666 : 0.02
    // 2% chance to automatically enable "annoying orange" mode
    // or 66.6% chance on april fools day (2/3rds time)

    if (rand <= chance) enableOrangeEasterEgg()
  }, [enableOrangeEasterEgg])

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const layers = useLayers()

  const onEasterEggClicked = useCallback(() => {
    if (!canvasRef.current) return
    if (frames) return
    const canvas = canvasRef.current

    const b64 = canvas.toDataURL()
    void loadImage(b64)
  }, [frames, loadImage])

  useKonami(toggleRecursion, {
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

  useKonami(toggleOrangeEasterEgg, {
    code: ['h', 'e', 'y', 'a', 'p', 'p', 'l', 'e'],
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

        {!(showRecursionEasterEgg && !frames) ? null : (
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
          <ExtLink href='https://github.com/luludotdev/pride-avatars'>
            GitHub
          </ExtLink>
        </p>

        {showOrangeEasterEgg && (
          <p>
            Cursed Annoying Orange flags made by{' '}
            <ExtLink href='https://twitter.com/vrbobbie'>Bobbie</ExtLink>
          </p>
        )}
      </footer>
    </>
  )
}
