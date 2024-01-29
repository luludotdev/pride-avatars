'use client'

import { createContext, useContext, useRef } from 'react'
import type { ReactNode, RefObject } from 'react'
import { cn } from '~/lib/utils'

// #region context
const Context = createContext<RefObject<HTMLCanvasElement>>({ current: null })
export const useCanvas = () => useContext(Context)

export const CanvasProvider = ({
  children,
}: {
  readonly children: ReactNode
}) => {
  const ref = useRef<HTMLCanvasElement>(null)
  return <Context.Provider value={ref}>{children}</Context.Provider>
}
// #endregion

export const Canvas = () => {
  const ref = useCanvas()

  return (
    <canvas
      className={cn('aspect-square h-auto w-full rounded border')}
      ref={ref}
    />
  )
}
