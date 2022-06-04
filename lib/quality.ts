export const qualities = [64, 128, 256, 512, 1024] as const
export const qualityToResolution = (quality: number) => qualities[quality]

const SCALE_FACTOR = 8

export const scaleQualityValue: (
  quality: number,
  value: number,
  round?: boolean
) => number = (quality, value, round = false) => {
  const resolution = qualityToResolution(quality)
  const scaled = (value / 64) * (resolution / SCALE_FACTOR)

  if (round) return Math.round(scaled)
  return scaled
}
