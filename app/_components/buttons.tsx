'use client'

import { Camera, Save } from 'lucide-react'
import { Button } from '~/components/ui/button'

export const LoadImage = () => {
  // TODO: Implement logic

  return (
    <Button className='w-full' variant='outline'>
      <Camera className='mr-2 h-5 w-5' /> Load Image
    </Button>
  )
}

export const SaveImage = () => {
  // TODO: Implement logic

  return (
    <Button className='w-full' variant='outline'>
      <Save className='mr-2 h-5 w-5' /> Download
    </Button>
  )
}
