import type { FC, PropsWithChildren } from 'react'

interface Props {
  readonly href: string
}

export const ExtLink: FC<PropsWithChildren<Props>> = ({ href, children }) => (
  <a
    className='underline transition-colors hover:text-accent-light dark:hover:text-accent-dark'
    href={href}
    rel='noopener noreferrer'
    target='_blank'
  >
    {children}
  </a>
)
