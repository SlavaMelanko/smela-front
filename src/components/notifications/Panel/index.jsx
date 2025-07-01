import './styles.scss'

import clsx from 'clsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { CloseIcon } from '@/components/icons'
import { NotificationCard } from '@/components/notifications'
import useLocale from '@/hooks/useLocale'
import useNotifications from '@/hooks/useNotifications'
import useOutsideClick from '@/hooks/useOutsideClick'

const NotificationPanel = ({ isOpen, onToggle, toggleButtonRef }) => {
  const { ref } = useOutsideClick()
  const { inboxNotifications } = useNotifications()
  const { t } = useLocale()
  const navigate = useNavigate()

  // Actually listens for a click outside the panel while it’s open.
  // If you click outside, it triggers onToggle() to close the panel.
  useEffect(() => {
    const handleOutsideClick = e => {
      const clickedOutsidePanel = ref.current && !ref.current.contains(e.target)
      const clickedOutsideToggleButton =
        !toggleButtonRef?.current || !toggleButtonRef.current.contains(e.target)

      if (clickedOutsidePanel && clickedOutsideToggleButton) {
        onToggle() // close the panel
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [ref, isOpen, onToggle, toggleButtonRef])

  return (
    <div
      ref={ref}
      className={clsx(
        'notification-panel',
        isOpen && 'notification-panel--open'
      )}
    >
      <div className='notification-panel__header'>
        <h2 className='notification-panel__title'>{t('notifications')}</h2>
        <button
          type='button'
          onClick={onToggle}
          className='notification-panel__close'
          aria-label='Close notifications panel'
        >
          <CloseIcon size='sm' />
        </button>
      </div>

      <div className='notification-panel__list'>
        {inboxNotifications.length === 0 ? (
          <p className='notification-panel__empty'>{t('noNewNotifications')}</p>
        ) : (
          inboxNotifications.map((notification, index) => (
            <NotificationCard
              key={index}
              title={notification.title}
              message={notification.message}
              buttonText={notification.buttonText}
              onClose={() => {
                // TODO: Mark notification as read
              }}
              onAction={() => {
                if (notification.redirect) {
                  navigate(notification.redirect)
                }
              }}
              type={notification.type}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default NotificationPanel
