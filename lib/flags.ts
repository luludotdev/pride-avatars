import Asexual from '~/assets/flags/Asexual.svg'
import Bisexual from '~/assets/flags/Bisexual.svg'
import Demisexual from '~/assets/flags/Demisexual.svg'
import Genderfluid from '~/assets/flags/Genderfluid.svg'
import Lesbian from '~/assets/flags/Lesbian.svg'
import Nonbinary from '~/assets/flags/Nonbinary.svg'
import Pansexual from '~/assets/flags/Pansexual.svg'
import Pastel from '~/assets/flags/Pastel.svg'
import PastelPlus from '~/assets/flags/PastelPlus.svg'
import Rainbow from '~/assets/flags/Rainbow.svg'
import Transgender from '~/assets/flags/Transgender.svg'

export const flags = [
  ['Pastel', Pastel.src],
  ['Pastel+', PastelPlus.src],
  ['Rainbow', Rainbow.src],
  ['Asexual', Asexual.src],
  ['Bisexual', Bisexual.src],
  ['Demisexual', Demisexual.src],
  ['Genderfluid', Genderfluid.src],
  ['Lesbian', Lesbian.src],
  ['Nonbinary', Nonbinary.src],
  ['Pansexual', Pansexual.src],
  ['Transgender', Transgender.src],
] as const

export type FlagName = typeof flags[number][0]
export const flagNames: FlagName[] = flags.map(([name]) => name)

export function isFlagName(string: unknown): string is FlagName {
  if (typeof string !== 'string') return false
  // @ts-expect-error Compare `string` to union
  return flagNames.includes(string)
}

const flagStore: Map<FlagName, HTMLImageElement> = new Map()
export const getFlag: (name: FlagName, url?: string) => HTMLImageElement = (
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
