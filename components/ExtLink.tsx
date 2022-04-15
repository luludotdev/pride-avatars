import type { FC, PropsWithChildren } from 'react'

interface Props {
  href: string
}

export const ExtLink: FC<PropsWithChildren<Props>> = ({ href, children }) => (
  <a
    className='underline transition-colors hover:text-accent-light dark:hover:text-accent-dark'
    href={href}
    target='_blank'
    rel='noopener noreferrer'
  >
    {children}
  </a>
)
