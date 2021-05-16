import Asexual from '~assets/flags/Asexual_Pride_Flag.svg'
import Bisexual from '~assets/flags/Bisexual_Pride_Flag.svg'
import Demisexual from '~assets/flags/Demisexual_Pride_Flag.svg'
import Rainbow from '~assets/flags/Gay_Pride_Flag.svg'
import Genderfluid from '~assets/flags/Genderfluidity_Pride-Flag.svg'
import Lesbian from '~assets/flags/Lesbian_Pride_Flag.svg'
import Nonbinary from '~assets/flags/Nonbinary_Flag.svg'
import Pansexual from '~assets/flags/Pansexuality_Pride_Flag.svg'
import PastelPlus from '~assets/flags/Pastel_Plus_Flag.svg'
import Pastel from '~assets/flags/Pastel_Pride_Flag.svg'
import Transgender from '~assets/flags/Transgender_Pride_Flag.svg'

export const flags = [
  ['Pastel', Pastel],
  ['Pastel+', PastelPlus],
  ['Rainbow', Rainbow],
  ['Asexual', Asexual],
  ['Bisexual', Bisexual],
  ['Demisexual', Demisexual],
  ['Genderfluid', Genderfluid],
  ['Lesbian', Lesbian],
  ['Nonbinary', Nonbinary],
  ['Pansexual', Pansexual],
  ['Transgender', Transgender],
] as const

export type FlagName = typeof flags[number][0]
export const flagNames: FlagName[] = flags.map(([name]) => name)

export function isFlagName(string: unknown): string is FlagName {
  if (typeof string !== 'string') return false
  // @ts-expect-error
  return flagNames.includes(string)
}

const flagStore: Map<FlagName, HTMLImageElement> = new Map()
const getFlag: (name: FlagName, url?: string) => HTMLImageElement = (
  name,
  url
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

for (const [name, url] of flags) {
  // Only preload on client-side
  if (typeof window === 'undefined') continue

  getFlag(name, url)
}
