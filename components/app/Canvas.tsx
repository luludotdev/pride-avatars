'use client'

import clsx from 'clsx'
import { Suspense, useCallback, useMemo } from 'react'
import type { DragEventHandler, FC, RefObject } from 'react'
import { useAnimationFrame } from '~/lib/hooks/useAnimationFrame'
import { useDebug } from '~/lib/hooks/useDebug'
import { ensureLayers } from '~/lib/layers'
import type { MaybeLayers } from '~/lib/layers'
import { qualityToResolution } from '~/lib/quality'
import { drawFrame } from '~/lib/render'
import { useStore } from '~/lib/store'

interface Props {
  readonly canvasRef: RefObject<HTMLCanvasElement>
  readonly layers: MaybeLayers
}

export const Canvas: FC<Props> = ({ canvasRef: ref, layers }) => {
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
        className={clsx('h-auto w-full rounded', preview && 'rounded-full')}
        height={resolution}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        ref={ref}
        width={resolution}
      />

      <Suspense fallback={null}>
        <Render canvasRef={ref} layers={layers} />
      </Suspense>
    </>
  )
}

interface RenderProps {
  readonly canvasRef: RefObject<HTMLCanvasElement>
  readonly layers: MaybeLayers
}

const Render: FC<RenderProps> = ({ canvasRef: ref, layers: maybeLayers }) => {
  const debug = useDebug()
  const state = useStore()

  useAnimationFrame(
    async ({ time }) => {
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
    [debug, ref, maybeLayers, state],
  )

  return null
}
