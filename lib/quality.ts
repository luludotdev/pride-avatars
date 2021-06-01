export const qualities = [64, 128, 256, 512, 1024] as const
export const qualityToResolution: (quality: number) => number = quality => {
  return qualities[quality]
}

const SCALE_FACTOR = 8
export const calculatePadding: (quality: number, value: number) => number = (
  quality,
  value
) => {
  const resolution = qualityToResolution(quality)
  const padding = Math.round((value / 64) * (resolution / SCALE_FACTOR))

  return padding
}
