function nodeByID<E extends Element = Element>(id: string): E {
  const node = document.querySelector<E>(`#${id}`)
  if (node === null) throw new Error(`Node #${id} not found!`)

  return node
}

export const fileInput = nodeByID<HTMLInputElement>('input')
export const padding = nodeByID<HTMLInputElement>('padding')
export const paddingLabel = nodeByID<HTMLSpanElement>('paddingLbl')
export const angle = nodeByID<HTMLInputElement>('angle')
export const angleLabel = nodeByID<HTMLSpanElement>('angleLbl')
export const flagSelect = nodeByID<HTMLSelectElement>('flags')
export const save = nodeByID<HTMLButtonElement>('save')
