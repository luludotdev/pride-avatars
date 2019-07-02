import { Flag, populateFlags } from './flags'
import { angle, flagSelect, input, padding, save } from './input'
import { render } from './render'
import { saveImage } from './save'
import { state } from './state'

populateFlags()

window.addEventListener('load', () => {
  render()

  input.addEventListener(
    'change',
    () => {
      const file = input && input.files && input.files[0]
      if (!file) return

      const img = new Image()
      img.src = URL.createObjectURL(file)
      state.image = img
    },
    false
  )

  padding.addEventListener('input', () => {
    state.padding = parseInt(padding.value, 10)
  })

  angle.addEventListener('input', () => {
    state.angle = parseInt(angle.value, 10)
  })

  flagSelect.addEventListener('change', () => {
    state.flag = flagSelect.value as Flag
  })

  save.addEventListener('click', () => saveImage())
  state.addListener('changed', () => render())
})
