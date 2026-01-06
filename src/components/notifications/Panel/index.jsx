import { useNavigate } from 'react-router-dom'

import { NotificationCard } from '@/components/notifications'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import useLocale from '@/hooks/useLocale'
import useNotifications from '@/hooks/useNotifications'

const NotificationPanel = ({ open, onOpenChange }) => {
  const { inboxNotifications } = useNotifications()
  const { t } = useLocale()
  const navigate = useNavigate()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col gap-0 sm:min-w-[420px]'>
        <SheetHeader className='h-11 py-0 px-4 flex-row items-center justify-between bg-sidebar border-b border-sidebar-border'>
          <SheetTitle className='text-base'>{t('notifications')}</SheetTitle>
        </SheetHeader>

        <div className='flex-1 overflow-y-auto p-4'>
          {inboxNotifications.length === 0 ? (
            <p className='text-sm text-muted-foreground text-center py-8'>
              {t('noNewNotifications')}
            </p>
          ) : (
            <div className='flex flex-col gap-4'>
              {inboxNotifications.map((notification, index) => (
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
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default NotificationPanel
