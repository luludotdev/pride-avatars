import pDebounce from 'p-debounce'
import { canvas, ctx, drawImage } from './canvas'
import { state } from './state'

const render = async () => {
  if (!state.image) return

  ctx.save()
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((Math.PI / 180) * state.angle)

  const scale = Math.abs(state.angle) / 50 + 1
  ctx.scale(scale, scale)
  ctx.drawImage(
    state.flagImage,
    (canvas.width / 2) * -1,
    (canvas.height / 2) * -1,
    canvas.width,
    canvas.height
  )

  ctx.restore()
  ctx.save()

  ctx.beginPath()
  ctx.arc(
    canvas.width / 2,
    canvas.height / 2,
    canvas.height / 2 - state.padding,
    0,
    Math.PI * 2,
    true
  )
  ctx.closePath()
  ctx.clip()

  await drawImage(state.image)
  ctx.restore()
}

const debouncedRender = pDebounce(() => render(), 10)
export { debouncedRender as render }
