import button from '../styles/button.styl'
import canvas from '../styles/canvas.styl'
import file from '../styles/file.styl'
import firefox from '../styles/firefox.styl'
import global from '../styles/global.styl'
import input from '../styles/input.styl'

const applyClass = (oldClass: string, newClass: string) => {
  const elements = document.querySelectorAll(`.${oldClass}`)
  for (const element of elements) {
    element.classList.remove(oldClass)
    element.classList.add(newClass)
  }
}

const applyAll = (styles: Record<string, string>) => {
  for (const [old, cls] of Object.entries(styles)) {
    applyClass(old, cls)
  }
}

const styles = [button, canvas, file, firefox, global, input]
styles.forEach(x => applyAll(x))
