'use client'

import { useCallback } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog'
import { Button } from '~/components/ui/button'
import { useStore } from '~/lib/data/store'

export const Advert = () => {
  const open = useStore(state => state.advertOpen)

  const setAdShowing = useStore(state => state.setAdShowing)
  const handleClose = useCallback(() => setAdShowing(false), [setAdShowing])

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Thanks for using Pride Avatars</AlertDialogTitle>

          <AlertDialogDescription>
            I&apos;m glad you&apos;ve enjoyed my little passion project. If this
            app has helped you, please consider{' '}
            <a
              className='underline'
              href='http://paypal.me/jackbarondev'
              rel='noopener noreferrer'
              target='_blank'
            >
              supporting my work
            </a>
            . Developers gotta eat too! 😉
            <br />
            <br />I work on these projects in my free time and your support
            helps me spend more time working on fun little side-projects, just
            like this.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <Button onClick={handleClose} variant='outline'>
            Dismiss
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
