import Head from 'next/head'
import type { FC } from 'react'
import { flags } from '~/lib/flags'

export const PreloadFlags: FC = () => (
  <Head>
    {flags.map(([name, url]) => (
      <link as='image' href={url} key={name} rel='preload' />
    ))}
  </Head>
)
