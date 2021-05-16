import Head from 'next/head'
import type { FC } from 'react'

interface Props {
  children?: never

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

    {description && <meta name='description' content={description} />}
    {colour && <meta name='theme-color' content={colour} />}

    <meta property='og:type' content='website' />
    <meta property='og:title' content={title} />
    {description && <meta property='og:description' content={description} />}
    {url && <meta property='og:url' content={url} />}
    {(ogImage ?? image) && (
      <meta property='og:image' content={ogImage ?? image} />
    )}

    <meta name='twitter:title' content={title} />
    {description && <meta name='twitter:description' content={description} />}
    {image && <meta name='twitter:card' content='summary_large_image' />}
    {image && <meta name='twitter:image' content={image} />}
    {url && <meta property='twitter:url' content={url} />}
  </Head>
)
