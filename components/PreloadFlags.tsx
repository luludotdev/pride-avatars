import Head from 'next/head'
import { type FC } from 'react'
import { flags } from '~/lib/flags'

export const PreloadFlags: FC = () => (
  <Head>
    {flags.map(([name, url]) => (
      <link key={name} rel='preload' href={url} as='image' />
    ))}
  </Head>
)
