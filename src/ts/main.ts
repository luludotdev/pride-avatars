import {
  angle,
  angleLabel,
  fileInput,
  flagSelect,
  padding,
  paddingLabel,
  save,
} from './dom'
import { Flag, populateFlags } from './flags'
import { render } from './render'
import { saveImage } from './save'
import { state } from './state'

populateFlags()

window.addEventListener('load', () => {
  render()

  fileInput.addEventListener(
    'change',
    () => {
      const file = fileInput && fileInput.files && fileInput.files[0]
      if (!file) return

      const img = new Image()
      img.src = URL.createObjectURL(file)
      state.image = img
    },
    false
  )

  padding.addEventListener('input', () => {
    const val = parseInt(padding.value, 10)

    state.padding = val
    paddingLabel.innerHTML = `${val}px`
  })

  angle.addEventListener('input', () => {
    const snap = 0.7

    const val = parseFloat(angle.value)
    const zeroed = val > snap * -1 && val < snap

    state.angle = zeroed ? 0 : val
    angleLabel.innerHTML = zeroed ? 'Straight' : `${val}°`
  })

  flagSelect.addEventListener('change', () => {
    state.flag = flagSelect.value as Flag
  })

  save.addEventListener('click', () => saveImage())
  state.addListener('changed', () => render())
})
