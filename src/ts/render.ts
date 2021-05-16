import { canvas, ctx, drawImage } from './canvas'
import { state } from './state'

const drawFrame = async () => {
  ctx.save()

  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((Math.PI / 180) * state.angle)

  const scale = Math.abs(state.angle) / 50 + 1.01
  ctx.scale(scale, scale)

  if (state.flagImage.complete === false) {
    await new Promise<void>(resolve => {
      state.flagImage.addEventListener('load', () => {
        resolve()
      })
    })
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
    await drawImage(state.image, {
      x: (canvas.width / 2) * -1 + state.padding,
      y: (canvas.height / 2) * -1 + state.padding,
      w: canvas.width - state.padding * 2,
      h: canvas.height - state.padding * 2,
    })
    ctx.restore()
  }
}

export const render = async () => {
  if (state.dirty) {
    state.dirty = false
    await drawFrame()
  }

  requestAnimationFrame(render)
}
