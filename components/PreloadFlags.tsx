import type { FC } from 'react'
import { flags } from '~/lib/flags'

export const PreloadFlags: FC = () => (
  <>
    {flags.map(([name, url]) => (
      <link as='image' href={url} key={name} rel='preload' />
    ))}
  </>
)
