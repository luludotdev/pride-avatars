import type { FC } from 'react'

export const InputGrid: FC = ({ children }) => (
  <div className='w-full grid grid-cols-input gap-x-3'>{children}</div>
)
