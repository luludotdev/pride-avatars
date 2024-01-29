'use client'

import { useMemo } from 'react'
import { useExperimental } from '~/lib/hooks/useExperimental'
import { qualities } from '~/lib/quality'
import { useStore } from '~/lib/store'
import { Warning } from './warning'

export const ExperimentalWarning = () => {
  const experimental = useExperimental()
  if (!experimental) return null

  return (
    <Warning>
      <p className='text-sm'>
        Experimental features are enabled. Some options may not be fully
        implemented or may contain rendering bugs.
      </p>
      <p className='text-sm'>
        Please do not submit bug reports for experimental features.
      </p>
    </Warning>
  )
}

const MAX_QUALITY = 2
export const QualityWarning = () => {
  const quality = useStore(state => state.quality)
  const frames = useStore(state => state.frames)

  const shouldShow = useMemo<boolean>(() => {
    if (frames === null) return false
    return quality > MAX_QUALITY
  }, [frames, quality])

  if (!shouldShow) return null

  return (
    <Warning>
      <p className='text-sm'>
        Encoding GIFs at a high quality will take a while, and the result
        filesize might be too large to upload to social media platforms.
      </p>
      <p className='text-sm'>
        Consider dropping the quality to {qualities[MAX_QUALITY]}px or lower.
      </p>
    </Warning>
  )
}
