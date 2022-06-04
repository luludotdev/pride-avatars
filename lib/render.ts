import { type State } from '~/components/app/Store'
import { getFlag } from '~/lib/flags'
import { calculatePadding } from '~/lib/quality'

interface DrawOptions {
  x: number
  y: number

  w: number
  h: number

  offsetX: number
  offsetY: number
}

export const drawFrame = async (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  state: State,
  time: number
) => {
  const defaultOptions: DrawOptions = {
    x: 0,
    y: 0,
    w: ctx.canvas.width,
    h: ctx.canvas.height,
    offsetX: 0.5,
    offsetY: 0.5,
  }

  const drawImage = async (
    input: HTMLImageElement | HTMLCanvasElement,
    options: Partial<DrawOptions>
  ) => {
    const { x, y, w, h, offsetX, offsetY } = { ...defaultOptions, ...options }

    if (input instanceof HTMLImageElement && input.complete === false) {
      await new Promise<void>(resolve => {
        input.addEventListener('load', () => {
          resolve()
        })
      })
    }

    const iw = input.width
    const ih = input.height
    const r = Math.min(w / iw, h / ih)
    let nw = iw * r
    let nh = ih * r
    let cx
    let cy
    let cw
    let ch
    let ar = 1

    if (nw < w) ar = w / nw
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh
    nw *= ar
    nh *= ar

    cw = iw / (nw / w)
    ch = ih / (nh / h)

    cx = (iw - cw) * Math.max(0, Math.min(1, offsetX))
    cy = (ih - ch) * Math.max(0, Math.min(1, offsetY))

    if (cx < 0) cx = 0
    if (cy < 0) cy = 0
    if (cw > iw) cw = iw
    if (ch > ih) ch = ih

    ctx.drawImage(input, cx, cy, cw, ch, x, y, w, h)
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

  ctx.filter = state.blur !== 0 ? `blur(${state.blur}px)` : ''
  ctx.drawImage(
    flagImage,
    (canvas.width / 2) * -1,
    (canvas.height / 2) * -1,
    canvas.width,
    canvas.height
  )

  ctx.restore()

  const pickFrame = () => {
    if (state.image !== null) return state.image
    if (state.frames === null || state.frames.length === 0) return null

    const frameTime = (time * 1000) / state.delay
    const idx = Math.floor(frameTime % state.frames.length)

    return state.frames[idx]
  }

  const frame = pickFrame()
  if (frame) {
    ctx.save()
    const padding = calculatePadding(state.quality, state.padding)

    if (state.clip) {
      ctx.beginPath()
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        canvas.height / 2 - padding,
        0,
        Math.PI * 2,
        true
      )

      ctx.closePath()
      ctx.clip()
    }

    ctx.translate(canvas.width / 2, canvas.height / 2)
    await drawImage(frame, {
      x: (canvas.width / 2) * -1 + padding,
      y: (canvas.height / 2) * -1 + padding,
      w: canvas.width - padding * 2,
      h: canvas.height - padding * 2,
    })

    ctx.restore()
  }
}
