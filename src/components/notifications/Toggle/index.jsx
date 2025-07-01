import './styles.scss'

import { BellIcon } from '@/components/icons'

import Badge from '../Badge'

const NotificationToggle = ({ unreadCount = 0, onClick, ref }) => (
  <button className='notification-toggle' onClick={onClick} ref={ref}>
    <BellIcon size='md' />
    {unreadCount > 0 && (
      <Badge className='notification-toggle__badge'>
        {unreadCount > 99 ? '99+' : unreadCount}
      </Badge>
    )}
  </button>
)

export default NotificationToggle
