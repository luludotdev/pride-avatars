import { ChangeEvent, useCallback } from 'react'
import type { FC } from 'react'

interface Props {
  id: string
  label: string

  min: number
  max: number
  step: number

  value: number
  onChange: (value: number) => void
}

export const RangeInput: FC<Props> = ({
  id,
  label,
  min,
  max,
  step,
  value,
  onChange,
}) => {
  const handleChange = useCallback(
    (ev: ChangeEvent<HTMLInputElement>) => {
      if (typeof onChange === 'function') {
        const value = Number.parseInt(ev.target.value, 10)
        onChange(value)
      }
    },
    [onChange]
  )

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type='range'
        name={id}
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
      />
    </>
  )
}
