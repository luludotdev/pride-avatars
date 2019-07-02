import pDebounce from 'p-debounce'
import { canvas, ctx, drawImage } from './canvas'
import { state } from './state'

const render = async () => {
  ctx.save()

  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((Math.PI / 180) * state.angle)

  const scale = Math.abs(state.angle) / 50 + 1
  ctx.scale(scale, scale)

  if (!state.flagImage.complete) {
    await new Promise(resolve => (state.flagImage.onload = () => resolve()))
  }

  ctx.drawImage(
    state.flagImage,
    (canvas.width / 2) * -1,
    (canvas.height / 2) * -1,
    canvas.width,
    canvas.height
  )

  ctx.restore()

  if (state.image) {
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

    ctx.translate(canvas.width / 2, canvas.height / 2)
    await drawImage(
      state.image,
      (canvas.width / 2) * -1 + state.padding,
      (canvas.height / 2) * -1 + state.padding,
      canvas.width - state.padding * 2,
      canvas.height - state.padding * 2
    )
    ctx.restore()
  }
}

const debouncedRender = pDebounce(() => render(), 10)
export { debouncedRender as render }
