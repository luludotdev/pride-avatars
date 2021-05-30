import { decompressFrames, parseGIF } from 'gifuct-js'
import { ChangeEventHandler, useCallback, useRef } from 'react'
import { Button } from '~components/input/Button'
import { useStore } from '~lib/hooks/useStore'
import type { FC } from 'react'

export const LoadImage: FC<{ children?: never }> = () => {
  const { dispatch } = useStore()
  const ref = useRef<HTMLInputElement>(null)

  const onLoadClicked = useCallback(() => {
    ref.current?.click()
  }, [])

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    async ev => {
      const file = ev.target.files?.[0]
      if (file === undefined) return

      if (file.type !== 'image/gif') {
        dispatch({ type: 'setImage', value: URL.createObjectURL(file) })
        return
      }

      const gif = parseGIF(await file.arrayBuffer())
      const decoded = decompressFrames(gif, true)

      if (decoded.length === 0) return
      if (decoded.length === 1) {
        dispatch({ type: 'setImage', value: URL.createObjectURL(file) })
        return
      }

      const { delay } = decoded[0]
      const frames = decoded.map(x => x.patch)

      dispatch({ type: 'setGif', value: [frames, delay] })
    },
    [dispatch]
  )

  return (
    <>
      <Button onClick={onLoadClicked}>📸 Load Avatar</Button>

      <input
        ref={ref}
        type='file'
        name='avatar'
        accept='image/*'
        className='hidden'
        onChange={handleChange}
      />
    </>
  )
}
