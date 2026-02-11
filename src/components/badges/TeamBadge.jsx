import { Globe, Users } from 'lucide-react'

import { Link } from '@/components/links'

export const TeamBadge = ({ team }) => {
  if (!team) {
    return null
  }

  return (
    <div className='flex items-center gap-2 rounded-lg border border-sidebar-border bg-sidebar-accent/50 px-2 py-4'>
      <div className='flex shrink-0 items-center justify-center size-9 rounded-full text-sidebar-primary'>
        <Users className='size-6' />
      </div>
      <div className='flex min-w-0 flex-col gap-2'>
        <span className='truncate text-base font-medium leading-tight text-sidebar-foreground'>
          {team.name}
        </span>
        {team.website && (
          <Link
            to={team.website}
            size='xs'
            underline='none'
            openInNewTab
            className='flex items-center gap-1 truncate'
          >
            <Globe className='size-3 shrink-0' />
            {team.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </Link>
        )}
      </div>
    </div>
  )
}
