import type { FC } from 'react'

export const Container: FC = ({ children }) => (
  <div className='flex flex-col flex-1 items-center w-full max-w-[500px]'>
    {children}
  </div>
)
