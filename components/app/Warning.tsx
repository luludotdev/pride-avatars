import type { FC, PropsWithChildren } from 'react'

export const Warning: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <div className='w-full py-3 px-4 text-center dark:text-black flex flex-col gap-y-1 bg-yellow-200 rounded border border-yellow-400'>
    <p className='font-semibold text-lg'>⚠️ Warning!</p>
    {children}
  </div>
)
