'use client'

import clsx from 'clsx'
import { useCallback, useMemo } from 'react'
import type { DragEventHandler, FC, RefObject } from 'react'
import { useAnimationFrame } from '~/lib/hooks/useAnimationFrame'
import type { Composite } from '~/lib/hooks/useComposite'
import { useDebug } from '~/lib/hooks/useDebug'
import { useStore } from '~/lib/hooks/useStore'
import { loadImage } from '~/lib/load'
import { qualityToResolution } from '~/lib/quality'
import { drawFrame } from '~/lib/render'

interface Props extends Composite {
  canvasRef: RefObject<HTMLCanvasElement>
}

export const Canvas: FC<Props> = ({ canvasRef: ref, ...composite }) => {
  const debug = useDebug()
  const { state, dispatch } = useStore()

  useAnimationFrame(
    async ({ time }) => {
      if (state.saving) return
      if (!ref.current) return
      if (!debug && !state.dirty && state.frames === null) return

      const canvas = ref.current
      const ctx = canvas.getContext('2d')
      const { ctxImage, ctxMask, ctxComp } = composite
      if (!ctx || !ctxImage || !ctxMask || !ctxComp) return

      await drawFrame(ctx, { ctxImage, ctxMask, ctxComp }, state, time)
      if (state.blur === 0) dispatch({ type: 'markClean' })
    },
    [debug, ref, composite, state, dispatch],
  )

  const handleDragOver = useCallback<DragEventHandler<HTMLCanvasElement>>(
    ev => {
      ev.preventDefault()
    },
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

      await loadImage(dispatch, file)
    },
    [dispatch],
  )

  const resolution = useMemo(
    () => qualityToResolution(state.quality),
    [state.quality],
  )

  return (
    <canvas
      className={clsx('w-full h-auto rounded', state.preview && 'rounded-full')}
      height={resolution}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      ref={ref}
      width={resolution}
    />
  )
}
