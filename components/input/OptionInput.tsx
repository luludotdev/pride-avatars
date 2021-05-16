import { ChangeEvent, useCallback } from 'react'
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
  const handleChange = useCallback(
    (ev: ChangeEvent<HTMLSelectElement>) => {
      if (typeof onChange === 'function') onChange(ev.target.value)
    },
    [onChange]
  )

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select name={id} id={id} value={value} onChange={handleChange}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  )
}
