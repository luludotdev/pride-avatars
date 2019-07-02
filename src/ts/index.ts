import { input } from './input'
import { render } from './render'
import { state } from './state'

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

state.addListener('changed', () => render())
