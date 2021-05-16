import type { FC } from 'react'

interface Props {
  href: string
}

export const ExtLink: FC<Props> = ({ href, children }) => (
  <a href={href} target='_blank' rel='noopener noreferrer'>
    {children}
  </a>
)
