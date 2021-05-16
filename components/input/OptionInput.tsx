import { ChangeEventHandler, useCallback } from 'react'
import type { FC } from 'react'

interface Props {
  children?: never

  id: string
  label: string
  options: string[]

  value: string
  onChange: (value: string) => void
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
    [onChange]
  )

  return (
    <>
      <label htmlFor={id}>{label}:</label>
      <select
        name={id}
        id={id}
        value={value}
        className='p-1 text-sm bg-transparent rounded border border-gray-400'
        onChange={handleChange}
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
