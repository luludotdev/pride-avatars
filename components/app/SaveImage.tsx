import GIFEncoder from 'gif-encoder-2'
import { useCallback } from 'react'
import { Button } from '~components/input/Button'
import { useStore } from '~lib/hooks/useStore'
import { drawFrame } from '~lib/render'
import { sleep } from '~lib/sleep'
import type { FC, RefObject } from 'react'

interface Props {
  children?: never
  canvasRef: RefObject<HTMLCanvasElement>
}

export const SaveImage: FC<Props> = ({ canvasRef }) => {
  const { state, dispatch } = useStore()

  const saveToFile = useCallback((url: string, ext: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = `avatar${ext}`

    a.click()
    a.remove()
  }, [])

  const onSaveClicked = useCallback(async () => {
    if (state.saving) return
    if (!canvasRef.current) return
    const canvas = canvasRef.current

    if (state.frames) {
      dispatch({ type: 'setSaving', value: true })
      await sleep(50)

      try {
        const ctx = canvas.getContext('2d')
        if (ctx === null) throw new Error('oh no')

        const encoder = new GIFEncoder(canvas.width, canvas.height)
        encoder.setDelay(state.delay)
        encoder.start()

        /* eslint-disable no-await-in-loop */
        for (let i = 0; i < state.frames.length; i++) {
          const time = (i * state.delay) / 1000
          await drawFrame(canvas, ctx, state, time)

          encoder.addFrame(ctx)
        }
        /* eslint-enable no-await-in-loop */

        encoder.finish()
        const buffer = encoder.out.getData()
        const blob = new Blob([buffer], { type: 'image/gif' })

        const url = URL.createObjectURL(blob)
        saveToFile(url, '.gif')
        URL.revokeObjectURL(url)
      } finally {
        dispatch({ type: 'setSaving', value: false })
      }
    } else {
      const url = canvas.toDataURL('image/png;base64')
      saveToFile(url, '.png')
    }
  }, [canvasRef, state, dispatch, saveToFile])

  return (
    <Button disabled={state.saving} onClick={onSaveClicked}>
      💾 Download
    </Button>
  )
}
