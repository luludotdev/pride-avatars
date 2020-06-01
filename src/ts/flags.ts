import { flagSelect } from './dom'

import Asexual from '../images/Asexual_Pride_Flag.svg'
import Bisexual from '../images/Bisexual_Pride_Flag.svg'
import Demisexual from '../images/Demisexual_Pride_Flag.svg'
import Rainbow from '../images/Gay_Pride_Flag.svg'
import Genderfluid from '../images/Genderfluidity_Pride-Flag.svg'
import Lesbian from '../images/Lesbian_Pride_Flag.svg'
import Nonbinary from '../images/Nonbinary_flag.svg'
import Pansexual from '../images/Pansexuality_Pride_Flag.svg'
import PastelPlus from '../images/Pastel_Plus_Flag.svg'
import Pastel from '../images/Pastel_Pride_Flag.svg'
import Transgender from '../images/Transgender_Pride_flag.svg'

const createFlag = (src: string) => {
  const img = new Image()
  img.src = src

  return img
}

interface IFlagInfo {
  name: string
  image: HTMLImageElement
}

const pastel = createFlag(Pastel)
const flags: IFlagInfo[] = [
  { name: 'Pastel', image: pastel },
  { name: 'Pastel+', image: createFlag(PastelPlus) },
  { name: 'Rainbow', image: createFlag(Rainbow) },
  { name: 'Asexual', image: createFlag(Asexual) },
  { name: 'Bisexual', image: createFlag(Bisexual) },
  { name: 'Demisexual', image: createFlag(Demisexual) },
  { name: 'Genderfluid', image: createFlag(Genderfluid) },
  { name: 'Lesbian', image: createFlag(Lesbian) },
  { name: 'Nonbinary', image: createFlag(Nonbinary) },
  { name: 'Pansexual', image: createFlag(Pansexual) },
  { name: 'Transgender', image: createFlag(Transgender) },
]

export const populateFlags = () => {
  flagSelect.innerHTML = ''

  for (const flag of flags) {
    const opt = document.createElement('option')
    opt.innerHTML = flag.name
    opt.value = flag.name

    flagSelect.appendChild(opt)
  }
}

export const getFlag = (name: string) => {
  const flag = flags.find(x => x.name === name)
  return (flag && flag.image) || pastel
}
