import type { FC, PropsWithChildren } from 'react'

export const Warning: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <div className='flex w-full flex-col gap-y-1 rounded border border-yellow-400 bg-yellow-200 px-4 py-3 text-center dark:text-black'>
    <p className='text-lg font-semibold'>⚠️ Warning!</p>
    {children}
  </div>
)
