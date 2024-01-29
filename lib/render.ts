import type { AnimationFrame, State } from '~/lib/data/store'
import { getFlag } from '~/lib/flags'
import type { Layers } from '~/lib/layers'
import { scaleQualityValue } from '~/lib/quality'

interface DrawOptions {
  x: number
  y: number

  width: number
  height: number

  offsetX: number
  offsetY: number
}

const drawImage = async (
  ctx: CanvasRenderingContext2D,
  input: HTMLCanvasElement | HTMLImageElement,
  options: Partial<DrawOptions>,
) => {
  const defaultOptions: DrawOptions = {
    x: 0,
    y: 0,
    width: ctx.canvas.width,
    height: ctx.canvas.height,
    offsetX: 0.5,
    offsetY: 0.5,
  }

  const { x, y, width, height, offsetX, offsetY } = {
    ...defaultOptions,
    ...options,
  }

  if (input instanceof HTMLImageElement && !input.complete) {
    await input.decode()
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

const clear = (ctx: CanvasRenderingContext2D): void => {
  ctx.save()
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.width)
  ctx.restore()
}

export const drawFrame = async (
  ctx: CanvasRenderingContext2D,
  layers: Layers,
  state: State,
  time: number,
) => {
  const { width: canvasWidth, height: canvasHeight } = ctx.canvas
  const {
    flag: ctxFlag,
    flag2: ctxFlag2,
    image: ctxImage,
    mask: ctxMask,
    composite: ctxComp,
  } = layers

  const compScaleFactor = 2
  for (const ctx of Object.values(layers)) {
    ctx.canvas.width = canvasWidth * compScaleFactor
    ctx.canvas.height = canvasHeight * compScaleFactor

    clear(ctx)
  }

  ctxFlag.translate(ctxFlag.canvas.width / 2, ctxFlag.canvas.height / 2)
  ctxFlag.rotate((Math.PI / 180) * state.angle)

  const scale = Math.abs(state.angle) / 50 + 1.01
  ctxFlag.scale(scale, scale)

  const flagImage = getFlag(state.flag, state.showOrangeEasterEgg)
  if (!flagImage.complete) await flagImage.decode()

  const blur = scaleQualityValue(state.quality, state.blur)
  ctxFlag.filter = state.blurFlagBoundary
    ? ''
    : blur !== 0
      ? `blur(${blur}px)`
      : ''

  ctxFlag.drawImage(
    flagImage,
    (ctxFlag.canvas.width / 2) * -1,
    (ctxFlag.canvas.height / 2) * -1,
    ctxFlag.canvas.width,
    ctxFlag.canvas.height,
  )

  if (state.dualFlag) {
    const flagImage2 = getFlag(state.flag2)
    if (flagImage2.complete) await flagImage2.decode()

    const region = new Path2D()
    region.rect(
      0,
      (ctxFlag.canvas.height / 2) * -1,
      ctxFlag.canvas.width,
      ctxFlag.canvas.height,
    )

    ctxFlag.clip(region, 'evenodd')
    ctxFlag.drawImage(
      flagImage2,
      (ctxFlag.canvas.width / 2) * -1,
      (ctxFlag.canvas.height / 2) * -1,
      ctxFlag.canvas.width,
      ctxFlag.canvas.height,
    )
  }

  ctxFlag2.canvas.width = canvasWidth
  ctxFlag2.canvas.width = canvasHeight

  ctxFlag2.filter = state.blurFlagBoundary
    ? blur !== 0
      ? `blur(${blur}px)`
      : ''
    : ''

  ctxFlag2.drawImage(
    ctxFlag.canvas,
    0,
    0,
    ctxFlag2.canvas.width,
    ctxFlag2.canvas.height,
  )

  const copy = state.blurFlagBoundary ? ctxFlag2.canvas : ctxFlag.canvas
  ctx.drawImage(copy, 0, 0, canvasWidth, canvasHeight)

  const renderFrames = (): (AnimationFrame | HTMLImageElement)[] => {
    if (state.image !== null) return [state.image]
    if (state.frames === null || state.frames.length === 0) return []

    const frameTime = (time * 1_000) / state.delay
    const idx = Math.floor(frameTime % state.frames.length)

    return state.frames.slice(0, idx + 1)
  }

  const frames = renderFrames()
  if (frames.length > 0) {
    const padding = scaleQualityValue(state.quality, state.padding)
    const feather = scaleQualityValue(state.quality, state.feather)

    ctxImage.translate(ctxImage.canvas.width / 2, ctxImage.canvas.height / 2)

    // eslint-disable-next-line id-length
    for (const f of frames) {
      const frame = f instanceof HTMLImageElement ? ([f, false] as const) : f
      const [image, clearFrame] = frame

      if (clearFrame) clear(ctxImage)

      // eslint-disable-next-line no-await-in-loop
      await drawImage(ctxImage, image, {
        x: (ctxImage.canvas.width / 2) * -1,
        y: (ctxImage.canvas.height / 2) * -1,
        width: ctxImage.canvas.width,
        height: ctxImage.canvas.height,
      })
    }

    ctxMask.filter = `blur(${feather}px)`
    if (state.clip) {
      ctxMask.beginPath()
      ctxMask.arc(
        ctxMask.canvas.width / 2,
        ctxMask.canvas.height / 2,
        ctxMask.canvas.height / 2 - feather * 2,
        0,
        Math.PI * 2,
        true,
      )

      ctxMask.closePath()
      ctxMask.fill()
    } else {
      ctxMask.rect(
        feather,
        feather,
        ctxMask.canvas.width - feather * 2,
        ctxMask.canvas.height - feather * 2,
      )

      ctxMask.fill()
    }

    ctxComp.drawImage(
      ctxMask.canvas,
      0,
      0,
      ctxComp.canvas.width,
      ctxComp.canvas.height,
    )

    ctxComp.globalCompositeOperation = 'source-in'
    ctxComp.drawImage(
      ctxImage.canvas,
      0,
      0,
      ctxComp.canvas.width,
      ctxComp.canvas.height,
    )

    ctx.drawImage(
      ctxComp.canvas,
      padding / 2,
      padding / 2,
      canvasWidth - padding,
      canvasHeight - padding,
    )
  }
}
