import { button } from '../styles/button.styl'
import { canvas as cvs } from '../styles/canvas.styl'
import { file } from '../styles/file.styl'
import { container, footer } from '../styles/global.styl'
import { input } from '../styles/input.styl'
import { canvas } from './canvas'
import { save } from './dom'

canvas.classList.add(cvs)
save.classList.add(button)

const applyClass = (oldClass: string, newClass: string) => {
  const elements = document.querySelectorAll(`.${oldClass}`)
  for (const element of elements) {
    element.classList.remove(oldClass)
    element.classList.add(newClass)
  }
}

applyClass('container', container)
applyClass('footer', footer)
applyClass('input', input)
applyClass('fileInput', file)
