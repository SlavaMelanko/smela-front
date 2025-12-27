import { BellIcon } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const NotificationToggle = ({ unreadCount = 0, onClick, ref }) => (
  <Button
    variant='ghost'
    size='icon'
    className='relative rounded-full'
    onClick={onClick}
    ref={ref}
  >
    <BellIcon size='md' />
    {unreadCount > 0 && (
      <Badge variant='notification' className='absolute top-0.5 right-0'>
        {unreadCount > 9 ? '9+' : unreadCount}
      </Badge>
    )}
  </Button>
)

export default NotificationToggle
