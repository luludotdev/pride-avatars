import type { FC } from 'react'

export const Container: FC = ({ children }) => (
  <div className='flex flex-col flex-1 items-center w-full max-w-[500px] gap-y-4'>
    {children}
  </div>
)
