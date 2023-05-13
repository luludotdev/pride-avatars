import { useEffect, useMemo } from 'react'
import type { ConditionalPick, SetNonNullable } from 'type-fest'
import { useDebug } from '~/lib/hooks/useDebug'

export type Composite = ReturnType<typeof useComposite>
export type CompositeCtx = ConditionalPick<
  SetNonNullable<Composite>,
  CanvasRenderingContext2D
>

export const useComposite = () => {
  const debug = useDebug()

  const imageCanvas = useMemo(() => document.createElement('canvas'), [])
  const maskCanvas = useMemo(() => document.createElement('canvas'), [])
  const compCanvas = useMemo(() => document.createElement('canvas'), [])

  useEffect(() => {
    if (!debug) return

    document.body.appendChild(imageCanvas)
    document.body.appendChild(maskCanvas)
    document.body.appendChild(compCanvas)

    const spacing = '1rem'
    const size = '25rem'
    const bg = 'red'

    imageCanvas.style.position = 'absolute'
    imageCanvas.style.backgroundColor = bg
    imageCanvas.style.top = spacing
    imageCanvas.style.left = spacing
    imageCanvas.style.width = size
    imageCanvas.style.height = size

    maskCanvas.style.position = 'absolute'
    maskCanvas.style.backgroundColor = bg
    maskCanvas.style.top = `calc(${size} + (${spacing} * 2))`
    maskCanvas.style.left = spacing
    maskCanvas.style.width = size
    maskCanvas.style.height = size

    compCanvas.style.position = 'absolute'
    compCanvas.style.backgroundColor = bg
    compCanvas.style.top = `calc((${size} * 2) + (${spacing} * 3))`
    compCanvas.style.left = spacing
    compCanvas.style.width = size
    compCanvas.style.height = size

    return () => {
      imageCanvas.remove()
      maskCanvas.remove()
      compCanvas.remove()
    }
  }, [debug, imageCanvas, maskCanvas, compCanvas])

  const ctxImage = useMemo(() => imageCanvas.getContext('2d'), [imageCanvas])
  const ctxMask = useMemo(() => maskCanvas.getContext('2d'), [maskCanvas])
  const ctxComp = useMemo(() => compCanvas.getContext('2d'), [compCanvas])

  return { imageCanvas, ctxImage, maskCanvas, ctxMask, compCanvas, ctxComp }
}
