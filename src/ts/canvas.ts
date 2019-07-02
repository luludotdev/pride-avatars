export const canvas = document.getElementById('canvas') as HTMLCanvasElement
if (!canvas) throw new Error('Canvas not found!')

canvas.width = 512
canvas.height = 512

export const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
if (!ctx) throw new Error('Canvas context not found!')
