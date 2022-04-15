import { ChangeEventHandler, useCallback } from 'react'
import type { FC } from 'react'

interface Props {
  id: string
  label: string

  min: number
  max: number
  step: number

  value: number
  onChange: (value: number) => void
  formatter?: (value: number) => string
}

export const RangeInput: FC<Props> = ({
  id,
  label,
  min,
  max,
  step,
  value,
  onChange,
  formatter,
}) => {
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ev => {
      if (typeof onChange === 'function') {
        const value =
          step % 1 === 0
            ? Number.parseInt(ev.target.value, 10)
            : Number.parseFloat(ev.target.value)

        onChange(value)
      }
    },
    [step, onChange]
  )

  const formatValue = useCallback<(v: number) => string>(
    v => {
      if (typeof formatter === 'function') return formatter(v)
      return v.toString()
    },
    [formatter]
  )

  return (
    <>
      <label htmlFor={id}>
        {label}:{' '}
        <span className='font-mono whitespace-pre'>{formatValue(value)}</span>
      </label>

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
