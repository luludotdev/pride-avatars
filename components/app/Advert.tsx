import { FC, useCallback } from 'react'
import { Button } from '~components/input/Button'
import { useStore } from '~lib/hooks/useStore'
import { ExtLink } from '../ExtLink'

export const Advert: FC = () => {
  const { state, dispatch } = useStore()

  const handleClose = useCallback(() => {
    dispatch({ type: 'setAdShowing', value: false })
  }, [dispatch])

  return !state.advertOpen ? null : (
    <div className='absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-30 dark:bg-opacity-40 flex items-center justify-center'>
      <div className='max-w-[480px] rounded border border-gray-400 dark:border-gray-500 shadow-md bg-light dark:bg-dark py-5 px-6 flex flex-col gap-y-2 text-sm'>
        <h1 className='text-2xl font-bold text-center'>
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
