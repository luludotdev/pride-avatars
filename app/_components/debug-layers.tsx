'use client'

import { useLayers } from '~/lib/data/rendering'
import { useDisplayLayers } from '~/lib/hooks/useLayers'

export const RenderDebugLayers = () => {
  const layers = useLayers()
  useDisplayLayers(layers)

  return null
}
