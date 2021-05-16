import Head from 'next/head'
import { flags } from '~lib/flags'
import type { FC } from 'react'

export const PreloadFlags: FC<{ children?: never }> = () => (
  <Head>
    {flags.map(([name, url]) => (
      <link key={name} rel='preload' href={url} as='image' />
    ))}
  </Head>
)
