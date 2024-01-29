'use client'

import type { ComponentPropsWithoutRef } from 'react'
import { useCallback, useId, useMemo } from 'react'
import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { Slider } from '~/components/ui/slider'
import { useStore } from '~/lib/data/store'
import { flagNames } from '~/lib/flags'
import {
  qualities,
  qualityToResolution,
  scaleQualityValue,
} from '~/lib/quality'
import { Experimental } from './feature-flags'

export const Controls = () => {
  const quality = useStore(state => state.quality)
  const padding = useStore(state => state.padding)
  const angle = useStore(state => state.angle)
  const blur = useStore(state => state.blur)
  const feather = useStore(state => state.feather)
  const flag = useStore(state => state.flag)
  const preview = useStore(state => state.preview)
  const clip = useStore(state => state.clip)

  const setQuality = useStore(state => state.setQuality)
  const setPadding = useStore(state => state.setPadding)
  const setAngle = useStore(state => state.setAngle)
  const setBlur = useStore(state => state.setBlur)
  const setFeather = useStore(state => state.setFeather)
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
    <div className='grid-cols-input grid w-full gap-x-3'>
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

      <Experimental>
        <RangeInput
          formatter={formatBlur}
          label='Feather'
          max={10}
          min={0}
          onChange={setFeather}
          step={0.01}
          value={feather}
        />
      </Experimental>

      <Label>Flag</Label>
      <Select onValueChange={setFlag} value={flag}>
        <SelectTrigger>
          <SelectValue placeholder='Flag' />
        </SelectTrigger>
        <SelectContent>
          {flagNames.map(flag => (
            <SelectItem key={flag} value={flag}>
              {flag}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Label>Preview</Label>
      <Checkbox checked={preview} onCheckedChange={setPreview} />

      <Label>Clip</Label>
      <Checkbox checked={clip} onCheckedChange={setClip} />
    </div>
  )
}

const RangeInput = ({
  label,
  value,
  onChange,
  formatter,
  ...props
}: Omit<
  ComponentPropsWithoutRef<typeof Slider>,
  'label' | 'onChange' | 'onValueChange' | 'value'
> & {
  readonly label: string
  readonly value: number
  onChange(value: number): void
  formatter(value: number): string
}) => {
  const id = useId()
  const val = useMemo(() => [value], [value])
  const onValueChange = useCallback(
    ([value]: number[]) => onChange(value),
    [onChange],
  )

  // TODO: Format value

  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Slider id={id} onValueChange={onValueChange} value={val} {...props} />
    </>
  )
}
