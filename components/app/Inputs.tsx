import { Suspense, useCallback } from 'react'
import type { FC } from 'react'
import { CheckboxInput } from '~/components/input/CheckboxInput'
import { OptionInput } from '~/components/input/OptionInput'
import { RangeInput } from '~/components/input/RangeInput'
import { flagNames } from '~/lib/flags'
import { useExperimental } from '~/lib/hooks/useExperimental'
import {
  qualities,
  qualityToResolution,
  scaleQualityValue,
} from '~/lib/quality'
import { useStore } from '~/lib/store'

export const Inputs: FC = () => {
  const quality = useStore(state => state.quality)
  const padding = useStore(state => state.padding)
  const angle = useStore(state => state.angle)
  const blur = useStore(state => state.blur)
  const flag = useStore(state => state.flag)
  const preview = useStore(state => state.preview)
  const clip = useStore(state => state.clip)

  const setQuality = useStore(state => state.setQuality)
  const setPadding = useStore(state => state.setPadding)
  const setAngle = useStore(state => state.setAngle)
  const setBlur = useStore(state => state.setBlur)
  const setFlag = useStore(state => state.setFlag)
  const setPreview = useStore(state => state.setPreview)
  const setClip = useStore(state => state.setClip)

  const formatQuality = useCallback<(v: number) => string>(value => {
    const padding = 6
    if (value === 0) return 'shit'.padEnd(padding, ' ')

    const resolution = qualityToResolution(value).toString()
    return `${resolution}px`.padEnd(padding, ' ')
  }, [])

  const formatPadding = useCallback<(v: number) => string>(
    value => {
      const scaled = scaleQualityValue(quality, value, true)
      return `${scaled.toFixed(0).padStart(2, '0')}px`
    },
    [quality],
  )

  const formatAngle = useCallback<(v: number) => string>(
    value => `${value.toFixed(2)}°`,
    [],
  )

  const formatBlur = useCallback<(v: number) => string>(
    value => {
      const scaled = scaleQualityValue(quality, value)
      return `${scaled.toFixed(2)}px`.padEnd(7, ' ')
    },
    [quality],
  )

  return (
    <div className='grid w-full grid-cols-input gap-x-3'>
      <RangeInput
        formatter={formatQuality}
        label='Quality'
        max={qualities.length - 1}
        min={0}
        onChange={setQuality}
        step={1}
        value={quality}
      />

      <RangeInput
        formatter={formatPadding}
        label='Padding'
        max={96}
        min={0}
        onChange={setPadding}
        step={1}
        value={padding}
      />

      <RangeInput
        formatter={formatAngle}
        label='Tilt'
        max={10}
        min={-10}
        onChange={setAngle}
        step={0.01}
        value={angle}
      />

      <RangeInput
        formatter={formatBlur}
        label='Blur'
        max={10}
        min={0}
        onChange={setBlur}
        step={0.01}
        value={blur}
      />

      <Suspense fallback={null}>
        <FeatherInput formatBlur={formatBlur} />
      </Suspense>

      <OptionInput
        label='Flag'
        onChange={setFlag}
        options={flagNames}
        value={flag}
      />

      <Suspense fallback={null}>
        <DualFlagInput />
      </Suspense>

      <CheckboxInput label='Preview' onChange={setPreview} value={preview} />
      <CheckboxInput label='Clip' onChange={setClip} value={clip} />
    </div>
  )
}

interface FeatherProps {
  formatBlur(v: number): string
}

const FeatherInput: FC<FeatherProps> = ({ formatBlur }) => {
  const feather = useStore(state => state.feather)
  const setFeather = useStore(state => state.setFeather)

  const experimental = useExperimental()
  if (!experimental) return null

  return (
    <RangeInput
      formatter={formatBlur}
      label='Feather'
      max={10}
      min={0}
      onChange={setFeather}
      step={0.01}
      value={feather}
    />
  )
}

const DualFlagInput: FC = () => {
  const flag2 = useStore(state => state.flag2)
  const dualFlag = useStore(state => state.dualFlag)
  const blurFlagBoundary = useStore(state => state.blurFlagBoundary)

  const setFlag2 = useStore(state => state.setFlag2)
  const setDualFlag = useStore(state => state.setDualFlag)
  const setBlurFlagBoundary = useStore(state => state.setBlurFlagBoundary)

  const experimental = useExperimental()
  if (!experimental) return null

  return (
    <>
      {dualFlag ? (
        <OptionInput
          label='Second Flag'
          onChange={setFlag2}
          options={flagNames}
          value={flag2}
        />
      ) : null}

      <CheckboxInput
        label='Dual Flags'
        onChange={setDualFlag}
        value={dualFlag}
      />

      {dualFlag ? (
        <CheckboxInput
          label='Blur Boundary'
          onChange={setBlurFlagBoundary}
          value={blurFlagBoundary}
        />
      ) : null}
    </>
  )
}
