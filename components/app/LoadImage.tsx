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

      const {
        delay,
        dims: { width, height },
      } = decoded[0]

      const frames = decoded.map(({ patch }) => {
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (ctx === null) throw new Error('oh no')

        const data = new ImageData(patch, width, height)
        ctx.putImageData(data, 0, 0)

        return canvas
      })

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
