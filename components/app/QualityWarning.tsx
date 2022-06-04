import { type FC, useMemo } from 'react'
import { Warning } from '~/components/app/Warning'
import { useStore } from '~/lib/hooks/useStore'
import { qualities } from '~/lib/quality'

const MAX_QUALITY = 2
export const QualityWarning: FC = () => {
  const { state } = useStore()
  const shouldShow = useMemo<boolean>(() => {
    if (state.frames === null) return false
    return state.quality > MAX_QUALITY
  }, [state.frames, state.quality])

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
