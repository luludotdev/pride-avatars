export const input = document.getElementById('input') as HTMLInputElement
if (!input) throw new Error('Input box not found!')

export const padding = document.getElementById('padding') as HTMLInputElement
if (!padding) throw new Error('Padding slider not found!')

export const paddingLabel = document.getElementById(
  'paddingLbl'
) as HTMLSpanElement
if (!paddingLabel) throw new Error('Padding label not found!')

export const angle = document.getElementById('angle') as HTMLInputElement
if (!angle) throw new Error('Angle slider not found!')

export const angleLabel = document.getElementById('angleLbl') as HTMLSpanElement
if (!angleLabel) throw new Error('Angle label not found!')

export const flagSelect = document.getElementById('flags') as HTMLSelectElement
if (!flagSelect) throw new Error('Flag select not found!')

export const save = document.getElementById('save') as HTMLButtonElement
if (!flagSelect) throw new Error('Flag select not found!')
