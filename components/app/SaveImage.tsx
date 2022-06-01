import { saveAs } from 'file-saver'
import GIFEncoder from 'gif-encoder-2'
import ms from 'ms'
import { type FC, type RefObject, useCallback } from 'react'
import { Button } from '~components/input/Button'
import { useStore } from '~lib/hooks/useStore'
import { drawFrame } from '~lib/render'
import { sleep } from '~lib/sleep'

interface Props {
  canvasRef: RefObject<HTMLCanvasElement>
}

export const SaveImage: FC<Props> = ({ canvasRef }) => {
  const { state, dispatch } = useStore()

  const onSaveClicked = useCallback(async () => {
    const shouldShowAd = () => {
      if (state.lastShownAd === undefined) return true

      const offset = ms('3 months')
      const now = Date.now()
      const lastShown = state.lastShownAd.getTime()

      return lastShown + offset <= now
    }

    const shouldShow = shouldShowAd()
    if (shouldShow) {
      dispatch({ type: 'markAdShown' })
      dispatch({ type: 'setAdShowing', value: true })
    }

    if (state.saving) return
    if (!canvasRef.current) return
    const canvas = canvasRef.current

    if (state.frames) {
      dispatch({ type: 'setSaving', value: true })
      await sleep(50)

      try {
        const ctx = canvas.getContext('2d')
        if (ctx === null) throw new Error('oh no')

        const encoder = new GIFEncoder(
          canvas.width,
          canvas.height,
          'neuquant',
          true
        )

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
        saveAs(url, '.gif')
        URL.revokeObjectURL(url)
      } finally {
        dispatch({ type: 'setSaving', value: false })
      }
    } else {
      const url = canvas.toDataURL('image/png;base64')
      saveAs(url, 'avatar.png')
    }
  }, [canvasRef, state, dispatch])

  return (
    <Button disabled={state.saving} onClick={onSaveClicked}>
      {state.saving ? <>⏳ Encoding...</> : <>💾 Download</>}
    </Button>
  )
}
