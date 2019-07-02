import { canvas } from './canvas'
import { save } from './dom'

import { button } from '../css/button.css'
import { canvas as cvs } from '../css/canvas.css'
import { container, footer } from '../css/global.css'
import { input } from '../css/input.css'

canvas.classList.add(cvs)
save.classList.add(button)

const applyClass = (oldClass: string, newClass: string) => {
  const elements = document.getElementsByClassName(oldClass)
  for (const e of elements) {
    e.classList.remove(oldClass)
    e.classList.add(newClass)
  }
}

applyClass('container', container)
applyClass('footer', footer)
applyClass('input', input)
