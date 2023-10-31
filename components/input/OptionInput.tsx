'use client'

import { useCallback, useId } from 'react'
import type { ChangeEventHandler, FC } from 'react'

interface Props {
  readonly label: string
  readonly options: string[]

  readonly value: string
  onChange(value: string): void
}

export const OptionInput: FC<Props> = ({ label, options, value, onChange }) => {
  const id = useId()
  const handleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    ev => {
      if (typeof onChange === 'function') onChange(ev.target.value)
    },
    [onChange],
  )

  return (
    <>
      <label className='my-auto' htmlFor={id}>
        {label}:
      </label>

      <select
        className='mt-2 rounded border border-gray-400 bg-light p-1 text-sm dark:border-gray-500 dark:bg-dark'
        id={id}
        onChange={handleChange}
        value={value}
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  )
}
