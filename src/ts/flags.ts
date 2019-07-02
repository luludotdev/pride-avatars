import { flagSelect } from './dom'

import Genderfluid from '../images/genderfluid.png'
import Rainbow from '../images/rainbow.png'
import Transgender from '../images/transgender.png'

export enum Flag {
  Rainbow = 'Rainbow',
  Genderfluid = 'Genderfluid',
  Transgender = 'Transgender',
}

export const populateFlags = () => {
  flagSelect.innerHTML = ''

  for (const flag in Flag) {
    if (!Flag[flag]) continue

    const opt = document.createElement('option')
    opt.innerHTML = flag
    opt.value = flag

    flagSelect.appendChild(opt)
  }
}

const createFlag = (src: string) => {
  const img = new Image()
  img.src = src

  return img
}

const rainbowImg = createFlag(Rainbow)
const genderFluidImg = createFlag(Genderfluid)
const transgenderImg = createFlag(Transgender)

export const getFlag = (flag: Flag) => {
  switch (flag) {
    case Flag.Rainbow:
      return rainbowImg
    case Flag.Genderfluid:
      return genderFluidImg
    case Flag.Transgender:
      return transgenderImg
    default:
      return rainbowImg
  }
}