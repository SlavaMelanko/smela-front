import { Avatar, AvatarFallback, AvatarStatus } from '@/components/ui'
import { getUserStatusBackgroundColor } from '@/lib/types'

export const UserAvatar = ({ firstName, status }) => (
  <Avatar className='size-6 overflow-visible'>
    <AvatarFallback className='text-lg'>{firstName?.[0] || '?'}</AvatarFallback>
    {status && <AvatarStatus color={getUserStatusBackgroundColor(status)} />}
  </Avatar>
)
