import { useCallback } from 'react'
import type { ChangeEventHandler, FC } from 'react'

interface Props {
  id: string
  label: string

  value: boolean
  onChange(value: boolean): void
}

export const CheckboxInput: FC<Props> = ({ id, label, value, onChange }) => {
  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ev => {
      if (typeof onChange === 'function') onChange(ev.target.checked)
    },
    [onChange],
  )

  return (
    <>
      <label htmlFor={id}>{label}:</label>
      <input
        checked={value}
        className='self-end mb-[1px]'
        id={id}
        name={id}
        onChange={handleChange}
        type='checkbox'
      />
    </>
  )
}
