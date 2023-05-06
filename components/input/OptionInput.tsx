'use client'

import { useCallback } from 'react'
import type { ChangeEventHandler, FC } from 'react'

interface Props {
  id: string
  label: string
  options: string[]

  value: string
  onChange(value: string): void
}

export const OptionInput: FC<Props> = ({
  id,
  label,
  options,
  value,
  onChange,
}) => {
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
        className='p-1 mt-2 text-sm bg-light dark:bg-dark rounded border border-gray-400 dark:border-gray-500'
        id={id}
        name={id}
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
