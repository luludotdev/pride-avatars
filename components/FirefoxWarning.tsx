import { useCallback, useEffect, useState } from 'react'
import { ExtLink } from './ExtLink'
import type { FC } from 'react'

export const FirefoxWarning: FC<{ children?: never }> = () => {
  const [hidden, setHidden] = useState<boolean>(true)
  const isFireFox = useCallback<() => boolean>(() => {
    if (typeof window === 'undefined') return false
    return navigator.userAgent.toLowerCase().includes('firefox')
  }, [])

  useEffect(() => {
    if (isFireFox()) setHidden(false)
  }, [isFireFox])

  return hidden ? null : (
    <div className='absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-30 dark:bg-opacity-40 flex items-center justify-center'>
      <div className='max-w-[500px] rounded border border-gray-400 dark:border-gray-500 shadow-md bg-light dark:bg-dark py-5 px-6 flex flex-col gap-y-2 text-sm'>
        <h1 className='text-3xl font-bold text-center'>Firefox Detected</h1>
        <p>
          Unfortunately due to a longstanding{' '}
          <ExtLink href='https://stackoverflow.com/a/34713521'>
            inconsistency
          </ExtLink>{' '}
          in Firefox canvas handling, this app will not work.
        </p>
        <p>
          It is recommended to use this app on Chromium based browsers (Chrome,
          Opera, Edge), but it should work on Safari as well.
        </p>
      </div>
    </div>
  )
}
