import { type FC } from 'react'
import { Warning } from '~/components/app/Warning'
import { useExperimental } from '~/lib/hooks/useExperimental'

export const ExperimentalWarning: FC = () => {
  const experimental = useExperimental()

  return experimental ? (
    <Warning>
      <p className='text-sm'>
        Experimental features are enabled. Some options may not be fully
        implemented or may contain rendering bugs.
      </p>
      <p className='text-sm'>
        Please do not submit bug reports for experimental features.
      </p>
    </Warning>
  ) : null
}
