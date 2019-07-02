import { input } from './input'

input.addEventListener('change', () => {
  const file = input && input.files && input.files[0]
  if (!file) return
})
