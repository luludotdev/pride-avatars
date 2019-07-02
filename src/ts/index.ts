const input = document.getElementById('input') as HTMLInputElement | null
if (!input) throw new Error('Input box not found!')

const canvas = document.getElementById('canvas') as HTMLCanvasElement | null
if (!canvas) throw new Error('Canvas not found!')

canvas.width = 512
canvas.height = 512

const ctx = canvas.getContext('2d')
if (!ctx) throw new Error('Canvas context not found!')

input.addEventListener('change', () => {
  const file = input && input.files && input.files[0]
  if (!file) return
})
