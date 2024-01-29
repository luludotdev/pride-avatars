'use client'

import { useCallback } from 'react'
import type { FC } from 'react'
import { ExtLink } from '~/components/ExtLink'
import { Button } from '~/components/input/Button'
import { useStore } from '~/lib/store'

export const Advert: FC = () => {
  const advertOpen = useStore(state => state.advertOpen)

  const setAdShowing = useStore(state => state.setAdShowing)
  const handleClose = useCallback(() => setAdShowing(false), [setAdShowing])

  return !advertOpen ? null : (
    <div className='absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black bg-opacity-30 dark:bg-opacity-40'>
      <div className='bg-light dark:bg-dark flex max-w-[480px] flex-col gap-y-2 rounded-md border border-gray-400 px-6 py-5 text-sm shadow-md dark:border-gray-500'>
        <h1 className='text-center text-2xl font-bold'>
          Thanks for using Pride Avatars!
        </h1>

        <p>
          I&apos;m glad you&apos;ve enjoyed my little passion project. If this
          app has helped you, please consider{' '}
          <ExtLink href='http://paypal.me/jackbarondev'>
            supporting my work
          </ExtLink>
          . Developers gotta eat too! 😉
        </p>

        <p>
          I work on these projects in my free time and your support helps me
          spend more time working on fun little side-projects, just like this.
        </p>

        <div className='mt-2'>
          <Button onClick={handleClose}>❌ Dismiss</Button>
        </div>
      </div>
    </div>
  )
}
