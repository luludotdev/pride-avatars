import { useRouter } from 'next/router'
import { type FC, useCallback } from 'react'
import { OptionInput } from '~/components/input/OptionInput'
import { RangeInput } from '~/components/input/RangeInput'
import { flagNames, isFlagName } from '~/lib/flags'
import { useStore } from '~/lib/hooks/useStore'
import { calculatePadding, qualities, qualityToResolution } from '~/lib/quality'
import { CheckboxInput } from '../input/CheckboxInput'

export const Inputs: FC = () => {
  const { state, dispatch } = useStore()

  const { query } = useRouter()
  const experimental = query.experimental !== undefined

  const onQualityChanged = useCallback(
    (quality: number) => {
      dispatch({ type: 'setQuality', value: quality })
    },
    [dispatch]
  )

  const formatQuality = useCallback<(v: number) => string>(v => {
    const padding = 6
    if (v === 0) return 'shit'.padEnd(padding, ' ')

    const resolution = qualityToResolution(v).toString()
    return `${resolution}px`.padEnd(padding, ' ')
  }, [])

  const onPaddingChanged = useCallback(
    (padding: number) => {
      dispatch({ type: 'setPadding', value: padding })
    },
    [dispatch]
  )

  const formatPadding = useCallback<(v: number) => string>(
    v => {
      const value = calculatePadding(state.quality, v)
      return `${value.toFixed(0).padStart(2, '0')}px`
    },
    [state.quality]
  )

  const onAngleChanged = useCallback(
    (angle: number) => {
      dispatch({ type: 'setAngle', value: angle })
    },
    [dispatch]
  )

  const formatAngle = useCallback<(v: number) => string>(
    v => `${v.toFixed(2)}°`,
    []
  )

  const onBlurChanged = useCallback(
    (blur: number) => {
      dispatch({ type: 'setBlur', value: blur })
    },
    [dispatch]
  )

  const formatBlur = useCallback<(v: number) => string>(
    v => `${v.toFixed(2)}px`,
    []
  )

  const onFlagChanged = useCallback(
    (flag: string) => {
      if (!isFlagName(flag)) return
      dispatch({ type: 'setFlag', value: flag })
    },
    [dispatch]
  )

  const onFlag2Changed = useCallback(
    (flag: string) => {
      if (!isFlagName(flag)) return
      dispatch({ type: 'setFlag2', value: flag })
    },
    [dispatch]
  )

  const onDualFlagChanged = useCallback(
    (v: boolean) => {
      dispatch({ type: 'setDualFlag', value: v })
    },
    [dispatch]
  )

  const onPreviewChanged = useCallback(
    (v: boolean) => {
      dispatch({ type: 'setPreview', value: v })
    },
    [dispatch]
  )

  const onClipChanged = useCallback(
    (v: boolean) => {
      dispatch({ type: 'setClip', value: v })
    },
    [dispatch]
  )

  return (
    <div className='w-full grid grid-cols-input gap-x-3'>
      <RangeInput
        id='quality'
        label='Quality'
        min={0}
        max={qualities.length - 1}
        step={1}
        value={state.quality}
        formatter={formatQuality}
        onChange={onQualityChanged}
      />

      <RangeInput
        id='padding'
        label='Padding'
        min={0}
        max={64}
        step={1}
        value={state.padding}
        formatter={formatPadding}
        onChange={onPaddingChanged}
      />

      <RangeInput
        id='angle'
        label='Tilt'
        min={-10}
        max={10}
        step={0.01}
        value={state.angle}
        formatter={formatAngle}
        onChange={onAngleChanged}
      />

      {experimental && (
        <RangeInput
          id='blur'
          label='Blur'
          min={0}
          max={10}
          step={0.01}
          value={state.blur}
          formatter={formatBlur}
          onChange={onBlurChanged}
        />
      )}

      <OptionInput
        id='flags'
        label='Flag'
        options={flagNames}
        value={state.flag}
        onChange={onFlagChanged}
      />

      {experimental && (
        <>
          {state.dualFlag ? (
            <OptionInput
              id='flags2'
              label='Second Flag'
              options={flagNames}
              value={state.flag2}
              onChange={onFlag2Changed}
            />
          ) : null}

          <CheckboxInput
            id='dual-flag'
            label='Dual Flags'
            value={state.dualFlag}
            onChange={onDualFlagChanged}
          />
        </>
      )}

      <CheckboxInput
        id='preview'
        label='Preview'
        value={state.preview}
        onChange={onPreviewChanged}
      />

      <CheckboxInput
        id='clip'
        label='Clip'
        value={state.clip}
        onChange={onClipChanged}
      />
    </div>
  )
}
