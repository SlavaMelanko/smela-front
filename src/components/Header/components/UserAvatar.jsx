import { Avatar, AvatarFallback, AvatarStatus } from '@/components/ui'
import { getStatusBgColor } from '@/lib/types/user/status'

const UserAvatar = ({ firstName, status }) => (
  <Avatar className='size-6 overflow-visible'>
    <AvatarFallback className='text-lg'>{firstName?.[0] || 'X'}</AvatarFallback>
    <AvatarStatus color={getStatusBgColor(status)} />
  </Avatar>
)

export default UserAvatar
