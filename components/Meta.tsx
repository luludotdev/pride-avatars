import Head from 'next/head'
import type { FC } from 'react'

interface Props {
  title: string
  description?: string
  colour?: string
  image?: string
  url?: string

  ogImage?: string
}

export const Meta: FC<Props> = ({
  title,
  description,
  colour,
  image,
  url,
  ogImage,
}) => (
  <Head>
    <title>{title}</title>

    {description && <meta content={description} name='description' />}
    {colour && <meta content={colour} name='theme-color' />}

    <meta content='website' property='og:type' />
    <meta content={title} property='og:title' />
    {description && <meta content={description} property='og:description' />}
    {url && <meta content={url} property='og:url' />}
    {(ogImage ?? image) && (
      <meta content={ogImage ?? image} property='og:image' />
    )}

    <meta content={title} name='twitter:title' />
    {description && <meta content={description} name='twitter:description' />}
    {image && <meta content='summary_large_image' name='twitter:card' />}
    {image && <meta content={image} name='twitter:image' />}
    {url && <meta content={url} property='twitter:url' />}
  </Head>
)
