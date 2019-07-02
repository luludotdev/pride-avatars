export const input = document.getElementById('input') as HTMLInputElement
if (!input) throw new Error('Input box not found!')

export const padding = document.getElementById('padding') as HTMLInputElement
if (!padding) throw new Error('Padding slider not found!')

export const angle = document.getElementById('angle') as HTMLInputElement
if (!angle) throw new Error('Angle slider not found!')
