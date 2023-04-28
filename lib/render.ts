import type { State } from '~/components/app/Store'
import { getFlag } from '~/lib/flags'
import { scaleQualityValue } from '~/lib/quality'

interface DrawOptions {
  x: number
  y: number

  width: number
  height: number

  offsetX: number
  offsetY: number
}

export const drawFrame = async (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: State,
  time: number,
) => {
  const defaultOptions: DrawOptions = {
    x: 0,
    y: 0,
    width: ctx.canvas.width,
    height: ctx.canvas.height,
    offsetX: 0.5,
    offsetY: 0.5,
  }

  const drawImage = async (
    input: HTMLCanvasElement | HTMLImageElement,
    options: Partial<DrawOptions>,
  ) => {
    const { x, y, width, height, offsetX, offsetY } = {
      ...defaultOptions,
      ...options,
    }

    if (input instanceof HTMLImageElement && input.complete === false) {
      await new Promise<void>(resolve => {
        input.addEventListener('load', () => {
          resolve()
        })
      })
    }

    const iw = input.width
    const ih = input.height
    const radius = Math.min(width / iw, height / ih)
    let nw = iw * radius
    let nh = ih * radius
    let cx
    let cy
    let cw
    let ch
    let ar = 1

    if (nw < width) ar = width / nw
    if (Math.abs(ar - 1) < 1e-14 && nh < height) ar = height / nh
    nw *= ar
    nh *= ar

    cw = iw / (nw / width)
    ch = ih / (nh / height)

    cx = (iw - cw) * Math.max(0, Math.min(1, offsetX))
    cy = (ih - ch) * Math.max(0, Math.min(1, offsetY))

    if (cx < 0) cx = 0
    if (cy < 0) cy = 0
    if (cw > iw) cw = iw
    if (ch > ih) ch = ih

    ctx.drawImage(input, cx, cy, cw, ch, x, y, width, height)
  }

  ctx.save()

  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((Math.PI / 180) * state.angle)

  const scale = Math.abs(state.angle) / 50 + 1.01
  ctx.scale(scale, scale)

  const flagImage = getFlag(state.flag)
  if (flagImage.complete === false) {
    await new Promise<void>(resolve => {
      flagImage.addEventListener('load', () => {
        resolve()
      })
    })
  }

  const blur = scaleQualityValue(state.quality, state.blur)
  // eslint-disable-next-line require-atomic-updates
  ctx.filter = blur !== 0 ? `blur(${blur}px)` : ''
  ctx.drawImage(
    flagImage,
    (canvas.width / 2) * -1,
    (canvas.height / 2) * -1,
    canvas.width,
    canvas.height,
  )

  if (state.dualFlag) {
    const flagImage2 = getFlag(state.flag2)
    if (flagImage2.complete === false) {
      await new Promise<void>(resolve => {
        flagImage2.addEventListener('load', () => {
          resolve()
        })
      })
    }

    const region = new Path2D()
    region.rect(
      0,
      (ctx.canvas.height / 2) * -1,
      ctx.canvas.width,
      ctx.canvas.height,
    )

    ctx.clip(region, 'evenodd')

    ctx.drawImage(
      flagImage2,
      (canvas.width / 2) * -1,
      (canvas.height / 2) * -1,
      canvas.width,
      canvas.height,
    )
  }

  ctx.restore()

  const renderFrames = (): (HTMLCanvasElement | HTMLImageElement)[] => {
    if (state.image !== null) return [state.image]
    if (state.frames === null || state.frames.length === 0) return []

    const frameTime = (time * 1_000) / state.delay
    const idx = Math.floor(frameTime % state.frames.length)

    return state.frames.slice(0, idx + 1)
  }

  const frames = renderFrames()
  if (frames.length > 0) {
    ctx.save()
    const padding = scaleQualityValue(state.quality, state.padding)

    if (state.clip) {
      ctx.beginPath()
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        canvas.height / 2 - padding,
        0,
        Math.PI * 2,
        true,
      )

      ctx.closePath()
      ctx.clip()
    }

    ctx.translate(canvas.width / 2, canvas.height / 2)
    for (const frame of frames) {
      // eslint-disable-next-line no-await-in-loop
      await drawImage(frame, {
        x: (canvas.width / 2) * -1 + padding,
        y: (canvas.height / 2) * -1 + padding,
        width: canvas.width - padding * 2,
        height: canvas.height - padding * 2,
      })
    }

    ctx.restore()
  }
}
