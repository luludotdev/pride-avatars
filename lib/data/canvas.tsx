'use client'

import { createContext, useContext, useRef } from 'react'
import type { ReactNode, RefObject } from 'react'

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
