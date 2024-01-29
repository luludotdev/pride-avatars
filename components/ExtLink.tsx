import type { FC, PropsWithChildren } from 'react'

interface Props {
  readonly href: string
}

export const ExtLink: FC<PropsWithChildren<Props>> = ({ href, children }) => (
  <a
    className='hover:text-accent-light dark:hover:text-accent-dark underline transition-colors'
    href={href}
    rel='noopener noreferrer'
    target='_blank'
  >
    {children}
  </a>
)
