'use client'

import { useCallback, useId } from 'react'
import type { ChangeEventHandler, FC } from 'react'

interface Props {
  label: string

  value: boolean
  onChange(value: boolean): void
}

export const CheckboxInput: FC<Props> = ({ label, value, onChange }) => {
  const id = useId()
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
        onChange={handleChange}
        type='checkbox'
      />
    </>
  )
}
