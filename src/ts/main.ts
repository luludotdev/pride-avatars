import { canvas } from './canvas'
import {
  angle,
  angleLabel,
  fileInput,
  flagSelect,
  padding,
  paddingLabel,
  save,
} from './dom'
import { populateFlags } from './flags'
import { render } from './render'
import { saveImage } from './save'
import { state } from './state'

populateFlags()

window.addEventListener('load', () => {
  void render()

  fileInput.addEventListener(
    'change',
    () => {
      const file = fileInput?.files?.[0]
      if (file === undefined) return

      const img = new Image()
      img.src = URL.createObjectURL(file)
      state.image = img
    },
    false
  )

  padding.addEventListener('input', () => {
    const value = Number.parseInt(padding.value, 10)

    state.padding = value
    paddingLabel.innerHTML = `${value.toString().padStart(2, '0')}px`
  })

  angle.addEventListener('input', () => {
    const snap = 0.7

    const value = Number.parseFloat(angle.value)
    const zeroed = value > snap * -1 && value < snap

    state.angle = zeroed ? 0 : value
    angleLabel.innerHTML = zeroed ? 'Straight' : `${value}°`
  })

  flagSelect.addEventListener('change', () => {
    state.flag = flagSelect.value
  })

  save.addEventListener('click', () => {
    saveImage()
  })

  state.addListener('changed', () => {
    state.dirty = true
  })

  canvas.addEventListener('dragover', ev => {
    ev.preventDefault()
  })

  canvas.addEventListener('drop', ev => {
    ev.preventDefault()
    if (!ev.dataTransfer) return

    const file = ev.dataTransfer.items
      ? ev.dataTransfer.items[0].getAsFile()
      : ev.dataTransfer.files[0]

    if (!file) return
    if (!file.type.startsWith('image/')) return

    const img = new Image()
    img.src = URL.createObjectURL(file)
    state.image = img
  })
})
