import Asexual from '~/assets/flags/Asexual.svg'
import Bisexual from '~/assets/flags/Bisexual.svg'
import Demiboy from '~/assets/flags/Demiboy.svg'
import Demigirl from '~/assets/flags/Demigirl.svg'
import Demisexual from '~/assets/flags/Demisexual.svg'
import GayMen from '~/assets/flags/GayMen.svg'
import Genderfluid from '~/assets/flags/Genderfluid.svg'
import Lesbian from '~/assets/flags/Lesbian.svg'
import Nonbinary from '~/assets/flags/Nonbinary.svg'
import Pansexual from '~/assets/flags/Pansexual.svg'
import Pastel from '~/assets/flags/Pastel.svg'
import PastelPlus from '~/assets/flags/PastelPlus.svg'
import Rainbow from '~/assets/flags/Rainbow.svg'
import Transgender from '~/assets/flags/Transgender.svg'
import AsexualOrange from '~/assets/flags/orange/AsexualOrange.png'
import BisexualOrange from '~/assets/flags/orange/BisexualOrange.png'
import DemiboyOrange from '~/assets/flags/orange/DemiboyOrange.png'
import DemigirlOrange from '~/assets/flags/orange/DemigirlOrange.png'
import DemisexualOrange from '~/assets/flags/orange/DemisexualOrange.png'
import GayMenOrange from '~/assets/flags/orange/GayMenOrange.png'
import GenderfluidOrange from '~/assets/flags/orange/GenderfluidOrange.png'
import LesbianOrange from '~/assets/flags/orange/LesbianOrange.png'
import NonbinaryOrange from '~/assets/flags/orange/NonbinaryOrange.png'
import PansexualOrange from '~/assets/flags/orange/PansexualOrange.png'
import PastelOrange from '~/assets/flags/orange/PastelOrange.png'
import PastelPlusOrange from '~/assets/flags/orange/PastelPlusOrange.png'
import RainbowOrange from '~/assets/flags/orange/RainbowOrange.png'
import TransgenderOrange from '~/assets/flags/orange/TransgenderOrange.png'

export type FlagName = (typeof flagNames)[number]
export const flagNames = [
  'Pastel',
  'Pastel+',
  'Rainbow',
  'Asexual',
  'Bisexual',
  'Demisexual',
  'Genderfluid',
  'Lesbian',
  'Gay Men',
  'Nonbinary',
  'Pansexual',
  'Transgender',
  'Demigirl',
  'Demiboy',
] as const

type Flag = readonly [name: FlagName, svg: string, orange: string]
export const flags = [
  ['Pastel', Pastel.src, PastelOrange.src],
  ['Pastel+', PastelPlus.src, PastelPlusOrange.src],
  ['Rainbow', Rainbow.src, RainbowOrange.src],
  ['Asexual', Asexual.src, AsexualOrange.src],
  ['Bisexual', Bisexual.src, BisexualOrange.src],
  ['Demisexual', Demisexual.src, DemisexualOrange.src],
  ['Genderfluid', Genderfluid.src, GenderfluidOrange.src],
  ['Lesbian', Lesbian.src, LesbianOrange.src],
  ['Gay Men', GayMen.src, GayMenOrange.src],
  ['Nonbinary', Nonbinary.src, NonbinaryOrange.src],
  ['Pansexual', Pansexual.src, PansexualOrange.src],
  ['Transgender', Transgender.src, TransgenderOrange.src],
  ['Demigirl', Demigirl.src, DemigirlOrange.src],
  ['Demiboy', Demiboy.src, DemiboyOrange.src],
] as const satisfies readonly Flag[]

export function isFlagName(string: unknown): string is FlagName {
  if (typeof string !== 'string') return false
  // @ts-expect-error Compare `string` to union
  return flagNames.includes(string)
}

const flagStore: Map<FlagName, HTMLImageElement> = new Map()
const getFlag: (name: FlagName, url?: string) => HTMLImageElement = (
  name,
  url,
) => {
  const cached = flagStore.get(name)
  if (cached !== undefined) return cached

  const href = url ?? flags.find(([flagName]) => flagName === name)?.[1]
  if (href === undefined) throw new Error('Invalid Flag Name')

  const img = new Image()
  img.src = href

  flagStore.set(name, img)
  return img
}

const flagOrangeStore: Map<FlagName, HTMLImageElement> = new Map()
const getFlagOrange: (name: FlagName, url?: string) => HTMLImageElement = (
  name,
  url,
) => {
  const cached = flagOrangeStore.get(name)
  if (cached !== undefined) return cached

  const href = url ?? flags.find(([flagName]) => flagName === name)?.[2]
  if (href === undefined) throw new Error('Invalid Flag Name')

  const img = new Image()
  img.src = href

  flagOrangeStore.set(name, img)
  return img
}

const getFlagCombined = (name: FlagName, orange = false) => {
  if (orange) return getFlagOrange(name)
  return getFlag(name)
}

export { getFlagCombined as getFlag }

for (const [name, url, _orange] of flags) {
  // Only preload on client-side
  if (typeof window === 'undefined') continue

  getFlag(name, url)
}
