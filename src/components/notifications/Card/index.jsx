import './styles.scss'

import { BellIcon, CalendarIcon, CloseIcon, InfoIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'

const NotificationCard = ({
  title,
  message,
  buttonText,
  onClose = () => {},
  onAction = () => {},
  type = 'important'
}) => {
  const iconMap = {
    important: <InfoIcon size='md' color='blue' />,
    event: <CalendarIcon size='md' color='green' />,
    info: <BellIcon size='md' color='orange' />
  }

  return (
    <div className='notification-card'>
      <div className='notification-card__top'>
        <div className='notification-card__header'>
          {iconMap[type]}
          <h2 className='notification-card__title'>{title}</h2>
        </div>
        <button
          className='notification-card__close'
          aria-label='Close'
          onClick={onClose}
        >
          <CloseIcon size='xs' />
        </button>
      </div>

      <p className='notification-card__message'>{message}</p>

      <Button variant='outline' onClick={onAction}>
        {buttonText}
      </Button>
    </div>
  )
}

export default NotificationCard
