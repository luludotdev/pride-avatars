import { useMemo } from 'react'
import type { FC } from 'react'
import { Warning } from '~/components/app/Warning'
import { qualities } from '~/lib/quality'
import { useStore } from '~/lib/store'

const MAX_QUALITY = 2
export const QualityWarning: FC = () => {
  const quality = useStore(state => state.quality)
  const frames = useStore(state => state.frames)

  const shouldShow = useMemo<boolean>(() => {
    if (frames === null) return false
    return quality > MAX_QUALITY
  }, [frames, quality])

  return !shouldShow ? null : (
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
