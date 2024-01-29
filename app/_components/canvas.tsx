'use client'

import { Suspense, useCallback, useMemo } from 'react'
import type { DragEventHandler } from 'react'
import { useCanvas, useLayers } from '~/lib/data/rendering'
import { useStore } from '~/lib/data/store'
import { useAnimationFrame } from '~/lib/hooks/useAnimationFrame'
import { useDebug } from '~/lib/hooks/useDebug'
import { ensureLayers } from '~/lib/layers'
import { qualityToResolution } from '~/lib/quality'
import { drawFrame } from '~/lib/render'
import { cn } from '~/lib/utils'

export const Canvas = () => {
  const ref = useCanvas()

  const quality = useStore(state => state.quality)
  const preview = useStore(state => state.preview)

  const loadImage = useStore(state => state.loadImage)
  const handleDragOver = useCallback<DragEventHandler<HTMLCanvasElement>>(
    ev => ev.preventDefault(),
    [],
  )

  const handleDrop = useCallback<DragEventHandler<HTMLCanvasElement>>(
    async ev => {
      ev.preventDefault()
      if (!ev.dataTransfer) return

      const file = ev.dataTransfer.items
        ? ev.dataTransfer.items[0].getAsFile()
        : ev.dataTransfer.files[0]

      if (!file) return
      if (!file.type.startsWith('image/')) return

      await loadImage(file)
    },
    [loadImage],
  )

  const resolution = useMemo(() => qualityToResolution(quality), [quality])

  return (
    <>
      <canvas
        className={cn(
          'aspect-square h-auto w-full rounded border',
          preview && 'rounded-full',
        )}
        height={resolution}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        ref={ref}
        width={resolution}
      />

      <Suspense fallback={null}>
        <Render />
      </Suspense>
    </>
  )
}

const Render = () => {
  const debug = useDebug()
  const ref = useCanvas()
  const maybeLayers = useLayers()

  const render = useCallback(
    async ({ time }: { time: number }) => {
      const state = useStore.getState()

      if (state.saving) return
      if (!ref.current) return
      if (!debug && !state.dirty && state.frames === null) return

      const canvas = ref.current
      const ctx = canvas.getContext('2d')
      const layers = ensureLayers(maybeLayers)
      if (!ctx || !layers) return

      await drawFrame(ctx, layers, state, time)
      if (state.blur === 0) state.markClean()
    },
    [debug, maybeLayers, ref],
  )

  useAnimationFrame(render)
  return null
}
