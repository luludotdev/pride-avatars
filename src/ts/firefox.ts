import { firefox__hidden as hidden } from '../styles/firefox.styl'

if (navigator.userAgent.toLowerCase().includes('firefox')) {
  const element = document.querySelector(`.${hidden}`)
  if (element !== null) element.classList.remove(hidden)
}
