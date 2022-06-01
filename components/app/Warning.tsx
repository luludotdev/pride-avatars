import { type FC, useMemo } from 'react'
import { useStore } from '~/lib/hooks/useStore'
import { qualities } from '~/lib/quality'

const MAX_QUALITY = 2
export const Warning: FC = () => {
  const { state } = useStore()
  const shouldShow = useMemo<boolean>(() => {
    if (state.frames === null) return false
    return state.quality > MAX_QUALITY
  }, [state.frames, state.quality])

  return !shouldShow ? null : (
    <div className='w-full py-3 px-4 text-center dark:text-black flex flex-col gap-y-1 bg-yellow-200 rounded border border-yellow-400'>
      <p className='font-semibold text-lg'>⚠️ Warning!</p>
      <p className='text-sm'>
        Encoding GIFs at a high quality will take a while, and the result
        filesize might be too large to upload to social media platforms.
      </p>
      <p className='text-sm'>
        Consider dropping the quality to {qualities[MAX_QUALITY]}px or lower.
      </p>
    </div>
  )
}
