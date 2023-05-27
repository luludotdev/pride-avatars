import { Suspense } from 'react'
import type { FC } from 'react'
import { useDisplayLayers } from '~/lib/hooks/useLayers'
import type { MaybeLayers } from '~/lib/layers'

interface Props {
  layers: MaybeLayers
}

const RenderDebugLayers: FC<Props> = ({ layers }) => {
  useDisplayLayers(layers)
  return null
}

const RenderDebugLayersSuspense: FC<Props> = ({ ...props }) => (
  <Suspense fallback={null}>
    <RenderDebugLayers {...props} />
  </Suspense>
)

export { RenderDebugLayersSuspense as RenderDebugLayers }
