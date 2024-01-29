'use client'

import { useCanvas } from '~/lib/data/rendering'
import { cn } from '~/lib/utils'

export const Canvas = () => {
  const ref = useCanvas()

  return (
    <canvas
      className={cn('aspect-square h-auto w-full rounded border')}
      ref={ref}
    />
  )
}
