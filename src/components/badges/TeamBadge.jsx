import { Globe, Users } from 'lucide-react'

import { Link } from '@/components/links'

const TeamBadgeContainer = ({ children }) => (
  <div className='flex items-center gap-2 rounded-lg border border-sidebar-border bg-sidebar-accent/50 px-2 py-4'>
    {children}
  </div>
)

const TeamBadgeIcon = ({ icon: Icon }) => (
  <div className='flex shrink-0 items-center justify-center size-9 rounded-full text-sidebar-primary'>
    <Icon className='size-6' />
  </div>
)

const TeamBadgeContent = ({ children }) => (
  <div className='flex min-w-0 flex-col gap-2'>{children}</div>
)

const TeamBadgeName = ({ children }) => (
  <span className='truncate text-base font-medium leading-tight text-sidebar-foreground'>
    {children}
  </span>
)

const TeamBadgeWebsite = ({ url }) => {
  if (!url) {
    return null
  }

  return (
    <Link
      to={url}
      size='xs'
      underline='none'
      openInNewTab
      className='flex items-center gap-1 truncate'
    >
      <Globe className='size-3 shrink-0' />
      {url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
    </Link>
  )
}

export const TeamBadge = ({ team }) => {
  if (!team) {
    return null
  }

  return (
    <TeamBadgeContainer>
      <TeamBadgeIcon icon={Users} />
      <TeamBadgeContent>
        <TeamBadgeName>{team.name}</TeamBadgeName>
        <TeamBadgeWebsite url={team.website} />
      </TeamBadgeContent>
    </TeamBadgeContainer>
  )
}
