import { canvas } from './canvas'

export const saveImage = () => {
  const a = document.createElement('a')
  const b64 = canvas.toDataURL('image/png;base64')

  a.href = b64
  a.download = 'avatar.png'
  a.click()
  a.remove()
}
