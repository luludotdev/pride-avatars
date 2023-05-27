import { useCallback } from 'react'
import type { FC } from 'react'
import { CheckboxInput } from '~/components/input/CheckboxInput'
import { OptionInput } from '~/components/input/OptionInput'
import { RangeInput } from '~/components/input/RangeInput'
import { flagNames, isFlagName } from '~/lib/flags'
import { useExperimental } from '~/lib/hooks/useExperimental'
import { useStore } from '~/lib/hooks/useStore'
import {
  qualities,
  qualityToResolution,
  scaleQualityValue,
} from '~/lib/quality'

export const Inputs: FC = () => {
  const { state, dispatch } = useStore()
  const experimental = useExperimental()

  const onQualityChanged = useCallback(
    (quality: number) => dispatch({ type: 'setQuality', value: quality }),
    [dispatch],
  )

  const formatQuality = useCallback<(v: number) => string>(value => {
    const padding = 6
    if (value === 0) return 'shit'.padEnd(padding, ' ')

    const resolution = qualityToResolution(value).toString()
    return `${resolution}px`.padEnd(padding, ' ')
  }, [])

  const onPaddingChanged = useCallback(
    (padding: number) => dispatch({ type: 'setPadding', value: padding }),
    [dispatch],
  )

  const formatPadding = useCallback<(v: number) => string>(
    value => {
      const scaled = scaleQualityValue(state.quality, value, true)
      return `${scaled.toFixed(0).padStart(2, '0')}px`
    },
    [state.quality],
  )

  const onAngleChanged = useCallback(
    (angle: number) => dispatch({ type: 'setAngle', value: angle }),
    [dispatch],
  )

  const formatAngle = useCallback<(v: number) => string>(
    value => `${value.toFixed(2)}°`,
    [],
  )

  const onBlurChanged = useCallback(
    (blur: number) => dispatch({ type: 'setBlur', value: blur }),
    [dispatch],
  )

  const formatBlur = useCallback<(v: number) => string>(
    value => {
      const scaled = scaleQualityValue(state.quality, value)
      return `${scaled.toFixed(2)}px`
    },
    [state.quality],
  )

  const onFeatherChanged = useCallback(
    (feather: number) => dispatch({ type: 'setFeather', value: feather }),
    [dispatch],
  )

  const onFlagChanged = useCallback(
    (flag: string) => {
      if (!isFlagName(flag)) return
      dispatch({ type: 'setFlag', value: flag })
    },
    [dispatch],
  )

  const onFlag2Changed = useCallback(
    (flag: string) => {
      if (!isFlagName(flag)) return
      dispatch({ type: 'setFlag2', value: flag })
    },
    [dispatch],
  )

  const onDualFlagChanged = useCallback(
    (value: boolean) => dispatch({ type: 'setDualFlag', value }),
    [dispatch],
  )

  const onPreviewChanged = useCallback(
    (value: boolean) => dispatch({ type: 'setPreview', value }),
    [dispatch],
  )

  const onClipChanged = useCallback(
    (value: boolean) => dispatch({ type: 'setClip', value }),
    [dispatch],
  )

  return (
    <div className='w-full grid grid-cols-input gap-x-3'>
      <RangeInput
        formatter={formatQuality}
        label='Quality'
        max={qualities.length - 1}
        min={0}
        onChange={onQualityChanged}
        step={1}
        value={state.quality}
      />

      <RangeInput
        formatter={formatPadding}
        label='Padding'
        max={96}
        min={0}
        onChange={onPaddingChanged}
        step={1}
        value={state.padding}
      />

      <RangeInput
        formatter={formatAngle}
        label='Tilt'
        max={10}
        min={-10}
        onChange={onAngleChanged}
        step={0.01}
        value={state.angle}
      />

      <RangeInput
        formatter={formatBlur}
        label='Blur'
        max={10}
        min={0}
        onChange={onBlurChanged}
        step={0.01}
        value={state.blur}
      />

      {experimental && (
        <RangeInput
          formatter={formatBlur}
          label='Feather'
          max={10}
          min={0}
          onChange={onFeatherChanged}
          step={0.01}
          value={state.feather}
        />
      )}

      <OptionInput
        label='Flag'
        onChange={onFlagChanged}
        options={flagNames}
        value={state.flag}
      />

      {experimental && (
        <>
          {state.dualFlag ? (
            <OptionInput
              label='Second Flag'
              onChange={onFlag2Changed}
              options={flagNames}
              value={state.flag2}
            />
          ) : null}

          <CheckboxInput
            label='Dual Flags'
            onChange={onDualFlagChanged}
            value={state.dualFlag}
          />
        </>
      )}

      <CheckboxInput
        label='Preview'
        onChange={onPreviewChanged}
        value={state.preview}
      />

      <CheckboxInput label='Clip' onChange={onClipChanged} value={state.clip} />
    </div>
  )
}
