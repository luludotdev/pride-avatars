import { Star } from 'lucide-react'
import type { ReactNode } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '~/components/ui/hover-card'

export const Footer = ({ children }: { readonly children: ReactNode }) => (
  <footer className='py-4 text-center'>{children}</footer>
)

type TriggerProps = {
  readonly children: ReactNode
  readonly href: string
}

const CardTrigger = ({ children, href }: TriggerProps) => (
  <HoverCardTrigger
    className='underline'
    href={href}
    rel='noopener noreferrer'
    target='_blank'
  >
    {children}
  </HoverCardTrigger>
)

export const NameCard = ({
  avatar,
  handle,
  website,
  ...props
}: TriggerProps & {
  readonly avatar: string
  readonly handle: string
  readonly website?: string
}) => (
  <HoverCard>
    <CardTrigger {...props} />
    <HoverCardContent className='w-fit'>
      <div className='flex space-x-4'>
        <Avatar>
          <AvatarFallback />
          <AvatarImage src={avatar} />
        </Avatar>

        <div className='text-left'>
          <h4 className='text-sm font-bold leading-5'>{handle}</h4>
          <p className='text-sm leading-5'>{website ?? props.href}</p>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
)

export const RepoCard = async ({ ...props }: TriggerProps) => {
  const resp = await fetch(
    'https://api.github.com/repos/luludotdev/pride-avatars',
  )

  const json = await resp.json()
  const stars = json.stargazers_count as number

  return (
    <HoverCard>
      <CardTrigger {...props} />
      <HoverCardContent className='w-fit'>
        <div className='text-left'>
          <h4 className='text-sm font-bold leading-5'>
            luludotdev/pride-avatars
          </h4>
          <p className='flex items-center text-sm leading-5'>
            <Star className='mr-1 w-4' /> {stars} stars
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
