'use client'

import { saveAs } from 'file-saver'
import { Camera, Save, Trash2 } from 'lucide-react'
import ms from 'ms'
import { useCallback, useRef } from 'react'
import type { ChangeEventHandler } from 'react'
import { Button } from '~/components/ui/button'
import { useCanvas, useLayers } from '~/lib/data/rendering'
import { useStore } from '~/lib/data/store'
import { ensureLayers } from '~/lib/layers'
import { drawFrame } from '~/lib/render'
import { sleep } from '~/lib/utils'

export const LoadImage = () => {
  const saving = useStore(state => state.saving)
  const loadImage = useStore(state => state.loadImage)

  const ref = useRef<HTMLInputElement>(null)
  const onLoadClicked = useCallback(() => {
    ref.current?.click()
  }, [])

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    async ev => {
      const file = ev.target.files?.[0]
      if (file === undefined) return

      await loadImage(file)
    },
    [loadImage],
  )

  return (
    <>
      <Button
        className='w-full'
        disabled={saving}
        onClick={onLoadClicked}
        variant='outline'
      >
        <Camera className='mr-2 h-5 w-5' /> Load Image
      </Button>

      <input
        accept='image/*'
        className='hidden'
        name='avatar'
        onChange={handleChange}
        ref={ref}
        type='file'
      />
    </>
  )
}

export const ClearImage = () => {
  const saving = useStore(state => state.saving)
  const clearImage = useStore(state => state.clearImage)

  return (
    <Button
      className='w-full'
      disabled={saving}
      onClick={clearImage}
      variant='outline'
    >
      <Trash2 className='mr-2 h-5 w-5' /> Clear Image
    </Button>
  )
}

export const SaveImage = () => {
  const state = useStore()
  const canvasRef = useCanvas()
  const maybeLayers = useLayers()

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

        const { default: GIFEncoder } = await import('gif-encoder-2')
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
    <Button
      className='w-full'
      disabled={state.saving}
      onClick={onSaveClicked}
      variant='outline'
    >
      <Save className='mr-2 h-5 w-5' /> Download
    </Button>
  )
}
