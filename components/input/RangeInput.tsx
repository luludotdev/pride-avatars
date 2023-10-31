'use client'

import { useCallback, useId } from 'react'
import type { ChangeEventHandler, FC } from 'react'

interface Props {
  readonly label: string

  readonly min: number
  readonly max: number
  readonly step: number

  readonly value: number
  onChange(value: number): void
  formatter?(value: number): string
}

export const RangeInput: FC<Props> = ({
  label,
  min,
  max,
  step,
  value,
  onChange,
  formatter,
}) => {
  const id = useId()

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
    [step, onChange],
  )

  const formatValue = useCallback<(v: number) => string>(
    value => {
      if (typeof formatter === 'function') return formatter(value)
      return value.toString()
    },
    [formatter],
  )

  return (
    <>
      <label htmlFor={id}>
        {label}:{' '}
        <span className='whitespace-pre font-mono'>{formatValue(value)}</span>
      </label>

      <input
        id={id}
        max={max}
        min={min}
        onChange={handleChange}
        step={step}
        type='range'
        value={value}
      />
    </>
  )
}
