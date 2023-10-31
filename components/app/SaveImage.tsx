/* eslint-disable n/prefer-global/url */
import { saveAs } from 'file-saver'
import GIFEncoder from 'gif-encoder-2'
import ms from 'ms'
import { useCallback } from 'react'
import type { FC, RefObject } from 'react'
import { Button } from '~/components/input/Button'
import { useStore } from '~/lib/hooks/useStore'
import { ensureLayers } from '~/lib/layers'
import type { MaybeLayers } from '~/lib/layers'
import { drawFrame } from '~/lib/render'
import { sleep } from '~/lib/sleep'

interface Props {
  readonly canvasRef: RefObject<HTMLCanvasElement>
  readonly layers: MaybeLayers
}

export const SaveImage: FC<Props> = ({ canvasRef, layers: maybeLayers }) => {
  const { state, dispatch } = useStore()

  const filename = useCallback(
    (ext: string) => {
      const base = state.filename ?? 'avatar'
      return `${base}.pride.${ext}`
    },
    [state.filename],
  )

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
        const layers = ensureLayers(maybeLayers)
        if (!ctx || !layers) throw new Error('oh no')

        const encoder = new GIFEncoder(
          canvas.width,
          canvas.height,
          'neuquant',
          true,
        )

        encoder.setDelay(state.delay)
        encoder.start()

        /* eslint-disable no-await-in-loop */
        for (let idx = 0; idx < state.frames.length; idx++) {
          const time = (idx * state.delay) / 1_000
          await drawFrame(ctx, layers, state, time)

          encoder.addFrame(ctx)
        }
        /* eslint-enable no-await-in-loop */

        encoder.finish()
        const buffer = encoder.out.getData()
        const blob = new Blob([buffer], { type: 'image/gif' })

        const url = URL.createObjectURL(blob)
        saveAs(url, filename('gif'))
        URL.revokeObjectURL(url)
      } finally {
        dispatch({ type: 'setSaving', value: false })
      }
    } else {
      const url = canvas.toDataURL('image/png;base64')
      saveAs(url, filename('png'))
    }
  }, [canvasRef, maybeLayers, state, dispatch, filename])

  return (
    <Button disabled={state.saving} onClick={onSaveClicked}>
      {state.saving ? <>⏳ Encoding...</> : <>💾 Download</>}
    </Button>
  )
}
