import pDebounce from 'p-debounce'
import { canvas, ctx, drawImage } from './canvas'
import { state } from './state'

const render = async () => {
  if (!state.image) return
  await drawImage(Genderfluid)

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
