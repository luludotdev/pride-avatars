/* eslint-disable n/prefer-global/url */
import { parse as parsePath } from 'path'
import { decompressFrames, parseGIF } from 'gifuct-js'
import type { Dispatch } from 'react'
import type { Action } from '~/components/app/Store'

export const loadImage = async (dispatch: Dispatch<Action>, file: File) => {
  const { name: filename } = parsePath(file.name)

  if (file.type !== 'image/gif') {
    dispatch({ type: 'setImage', value: URL.createObjectURL(file) })
    dispatch({ type: 'setFilename', value: filename })

    return
  }

  const gif = parseGIF(await file.arrayBuffer())
  const decoded = decompressFrames(gif, true)

  if (decoded.length === 0) return
  if (decoded.length === 1) {
    dispatch({ type: 'setImage', value: URL.createObjectURL(file) })
    dispatch({ type: 'setFilename', value: filename })

    return
  }

  const { delay } = decoded[0]
  const frames = decoded.map(
    ({ patch, dims: { width, height, top, left } }) => {
      const canvas = document.createElement('canvas')
      canvas.width = gif.lsd.width
      canvas.height = gif.lsd.height

      const ctx = canvas.getContext('2d')
      if (ctx === null) throw new Error('oh no')

      const image = ctx.createImageData(width, height)
      image.data.set(patch)

      ctx.putImageData(image, left, top)

      return canvas
    },
  )

  dispatch({ type: 'setGif', value: [frames, delay] })
  dispatch({ type: 'setFilename', value: filename })
}
