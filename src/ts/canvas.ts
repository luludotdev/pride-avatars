const canvas = document.querySelector<HTMLCanvasElement>('#canvas')
if (canvas === null) throw new Error('Canvas not found!')

canvas.width = 512
canvas.height = 512

const ctx = canvas.getContext('2d')
if (ctx === null) throw new Error('Canvas context not found!')

const canvasExport = canvas
const ctxExport = ctx
export { canvasExport as canvas, ctxExport as ctx }

interface IDrawOptions {
  x: number
  y: number

  w: number
  h: number

  offsetX: number
  offsetY: number
}

const defaultOptions: IDrawOptions = {
  x: 0,
  y: 0,
  w: ctx.canvas.width,
  h: ctx.canvas.height,
  offsetX: 0.5,
  offsetY: 0.5,
}

export const drawImage = async (
  input: HTMLImageElement | string,
  options: Partial<IDrawOptions>
) => {
  const { x, y, w, h, offsetX, offsetY } = { ...defaultOptions, ...options }

  let img: HTMLImageElement
  if (typeof input === 'string') {
    img = new Image()
    img.src = input
  } else {
    img = input
  }

  if (!img.complete) {
    await new Promise(resolve => {
      img.addEventListener('load', () => resolve())
    })
  }

  const iw = img.width
  const ih = img.height
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

  ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h)
}
