/* eslint-disable n/prefer-global/url */
import { saveAs } from 'file-saver'
import GIFEncoder from 'gif-encoder-2'
import ms from 'ms'
import { useCallback } from 'react'
import type { FC, RefObject } from 'react'
import { Button } from '~/components/input/Button'
import { ensureLayers } from '~/lib/layers'
import type { MaybeLayers } from '~/lib/layers'
import { drawFrame } from '~/lib/render'
import { sleep } from '~/lib/sleep'
import { useStore } from '~/lib/store'

interface Props {
  readonly canvasRef: RefObject<HTMLCanvasElement>
  readonly layers: MaybeLayers
}

export const SaveImage: FC<Props> = ({ canvasRef, layers: maybeLayers }) => {
  const state = useStore()
  const setSaving = useStore(state => state.setSaving)
  const setAdShowing = useStore(state => state.setAdShowing)

  const originalName = useStore(state => state.filename)
  const filename = useCallback(
    (ext: string) => {
      const base = originalName ?? 'avatar'
      return `${base}.pride.${ext}`
    },
    [originalName],
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
    if (shouldShow) setAdShowing(true)

    if (state.saving) return
    if (!canvasRef.current) return
    const canvas = canvasRef.current

    if (state.frames) {
      setSaving(true)
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
        setSaving(false)
      }
    } else {
      const url = canvas.toDataURL('image/png;base64')
      saveAs(url, filename('png'))
    }
  }, [canvasRef, maybeLayers, state, setSaving, setAdShowing, filename])

  return (
    <Button disabled={state.saving} onClick={onSaveClicked}>
      {state.saving ? <>⏳ Encoding...</> : <>💾 Download</>}
    </Button>
  )
}
