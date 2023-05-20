import { useEffect, useMemo } from 'react'
import { useDebug } from '~/lib/hooks/useDebug'
import { layers, makeLayers } from '~/lib/layers'
import type { MaybeLayers } from '~/lib/layers'

export const useLayers = () => {
  const debug = useDebug()

  const isServer = useMemo(() => typeof window === 'undefined', [])
  const layersMemo = useMemo<MaybeLayers>(() => {
    if (!isServer) return makeLayers()

    return Object.fromEntries(
      layers.map(layer => [layer, undefined] as const),
    ) as MaybeLayers
  }, [isServer])

  useEffect(() => {
    if (!debug) return

    const cols = 2
    const size = '20rem'
    const gap = '0.8rem'
    const bg = 'red'

    const container = document.createElement('div')
    document.body.appendChild(container)

    container.style.zIndex = '100'
    container.style.position = 'absolute'
    container.style.top = '0px'
    container.style.left = '0px'
    container.style.padding = gap
    container.style.display = 'grid'
    container.style.gap = gap
    container.style.gridTemplateColumns = `repeat(${cols}, auto)`

    for (const ctx of Object.values(layersMemo)) {
      if (!ctx) continue

      const canvas = ctx.canvas
      container.appendChild(canvas)

      canvas.style.background = bg
      canvas.style.width = size
      canvas.style.height = size
    }

    return () => {
      for (const ctx of Object.values(layersMemo)) {
        ctx?.canvas.remove()
      }

      container.remove()
    }
  }, [debug, layersMemo])

  return layersMemo
}
