import { AlertCircle, AlertOctagon, AlertTriangle } from 'lucide-react'
import type { ReactNode } from 'react'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'

export const Warning = ({
  children,
  title = 'Warning',
  icon = 'triangle',
}: {
  readonly children: ReactNode
  readonly title?: string
  readonly icon?: 'circle' | 'octagon' | 'triangle'
}) => (
  <Alert variant='warning'>
    {icon === 'circle' && <AlertCircle className='h-4 w-4' />}
    {icon === 'octagon' && <AlertOctagon className='h-4 w-4' />}
    {icon === 'triangle' && <AlertTriangle className='h-4 w-4' />}

    <AlertTitle>{title}</AlertTitle>
    <AlertDescription>{children}</AlertDescription>
  </Alert>
)
