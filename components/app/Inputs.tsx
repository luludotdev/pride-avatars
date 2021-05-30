import { useCallback } from 'react'
import type { FC } from 'react'
import { OptionInput } from '~components/input/OptionInput'
import { RangeInput } from '~components/input/RangeInput'
import { flagNames, isFlagName } from '~lib/flags'
import { useStore } from '~lib/hooks/useStore'

export const Inputs: FC<{ children?: never }> = () => {
  const { state, dispatch } = useStore()

  const onPaddingChanged = useCallback(
    (padding: number) => {
      dispatch({ type: 'setPadding', value: padding })
    },
    [dispatch]
  )

  const formatPadding = useCallback<(v: number) => string>(
    v => `${v.toFixed(0).padStart(2, '0')}px`,
    []
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

  const onFlagChanged = useCallback(
    (flag: string) => {
      if (!isFlagName(flag)) return
      dispatch({ type: 'setFlag', value: flag })
    },
    [dispatch]
  )

  return (
    <div className='w-full grid grid-cols-input gap-x-3'>
      <RangeInput
        id='padding'
        label='Padding'
        min={0}
        max={50}
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

      <OptionInput
        id='flags'
        label='Flag'
        options={flagNames}
        value={state.flag}
        onChange={onFlagChanged}
      />
    </div>
  )
}
