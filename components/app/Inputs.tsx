import { useCallback } from 'react'
import { InputGrid } from '~components/input/InputGrid'
import { OptionInput } from '~components/input/OptionInput'
import { RangeInput } from '~components/input/RangeInput'
import { flagNames, isFlagName } from '~lib/flags'
import { useStore } from '~lib/hooks/useStore'
import type { FC } from 'react'

export const Inputs: FC = () => {
  const { state, dispatch } = useStore()

  const onPaddingChanged = useCallback(
    (padding: number) => {
      dispatch({ type: 'setPadding', value: padding })
    },
    [dispatch]
  )

  const onAngleChanged = useCallback(
    (angle: number) => {
      dispatch({ type: 'setAngle', value: angle })
    },
    [dispatch]
  )

  const onFlagChanged = useCallback(
    (flag: string) => {
      if (!isFlagName(flag)) return
      dispatch({ type: 'setFlag', value: flag })
    },
    [dispatch]
  )

  return (
    <InputGrid>
      <RangeInput
        id='padding'
        label='Padding:'
        min={0}
        max={50}
        step={1}
        value={state.padding}
        onChange={onPaddingChanged}
      />

      <RangeInput
        id='angle'
        label='Angle:'
        min={-10}
        max={10}
        step={0.01}
        value={state.angle}
        onChange={onAngleChanged}
      />

      <OptionInput
        id='flags'
        label='Flag:'
        options={flagNames}
        value={state.flag}
        onChange={onFlagChanged}
      />
    </InputGrid>
  )
}
