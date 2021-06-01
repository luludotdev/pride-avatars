export const qualities = [64, 128, 256, 512, 1024] as const
export const qualityToResolution: (quality: number) => number = quality => {
  return qualities[quality]
}
