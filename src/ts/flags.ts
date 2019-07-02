import { flagSelect } from './dom'

import Asexual from '../images/Asexual_Pride_Flag.svg'
import Bisexual from '../images/Bisexual_Pride_Flag.svg'
import Demisexual from '../images/Demisexual_Pride_Flag.svg'
import Rainbow from '../images/Gay_Pride_Flag.svg'
import Genderfluid from '../images/Genderfluidity_Pride-Flag.svg'
import Lesbian from '../images/Lesbian_Pride_Flag.svg'
import Nonbinary from '../images/Nonbinary_flag.svg'
import Pansexual from '../images/Pansexuality_Pride_Flag.svg'
import Transgender from '../images/Transgender_Pride_flag.svg'

export enum Flag {
  Rainbow = 'Rainbow',
  Asexual = 'Asexual',
  Bisexual = 'Bisexual',
  Demisexual = 'Demisexual',
  Genderfluid = 'Genderfluid',
  Lesbian = 'Lesbian',
  Nonbinary = 'Nonbinary',
  Pansexual = 'Pansexual',
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

const asexualImg = createFlag(Asexual)
const bisexualImg = createFlag(Bisexual)
const demisexualImg = createFlag(Demisexual)
const rainbowImg = createFlag(Rainbow)
const genderfluidImg = createFlag(Genderfluid)
const lesbianImg = createFlag(Lesbian)
const nonbinaryImg = createFlag(Nonbinary)
const pansexualImg = createFlag(Pansexual)
const transgenderImg = createFlag(Transgender)

export const getFlag = (flag: Flag) => {
  switch (flag) {
    case Flag.Asexual:
      return asexualImg

    case Flag.Bisexual:
      return bisexualImg

    case Flag.Demisexual:
      return demisexualImg

    case Flag.Rainbow:
      return rainbowImg

    case Flag.Genderfluid:
      return genderfluidImg

    case Flag.Lesbian:
      return lesbianImg

    case Flag.Nonbinary:
      return nonbinaryImg

    case Flag.Pansexual:
      return pansexualImg

    case Flag.Transgender:
      return transgenderImg

    default:
      return rainbowImg
  }
}
