import { createContext, useCallback, useMemo, useState } from 'react'
import { toast } from 'sonner'

import { NotificationPanel, Toaster } from '@/components/notifications'

const NotificationContext = createContext(undefined)

export const NotificationProvider = ({ children }) => {
  const notifications = [
    {
      title: 'Terms of service update',
      message:
        "We've updated our terms of service. Please review the changes before continuing.",
      buttonText: 'Acknowledge',
      type: 'important'
    },
    {
      title: 'Complete your checkout',
      message:
        'You have items waiting in your cart. Complete your purchase to secure your items.',
      buttonText: 'Go to checkout',
      redirect: '/checkout',
      type: 'info'
    },
    {
      title: 'New event: Prague meetup',
      message:
        'Join us for our tech meetup in Prague on June 15th at the Tech Hub. Register now to reserve your spot!',
      buttonText: 'RSVP now',
      type: 'event'
    }
  ]

  const [inboxNotifications, setInboxNotifications] = useState(
    notifications || []
  )

  // 🍞 Toasts
  const showSuccessToast = useCallback(message => toast.success(message), [])
  const showErrorToast = useCallback(message => toast.error(message), [])
  const clearToasts = useCallback(() => toast.dismiss(), [])

  // 🛎️ Inbox notifications
  const addInboxNotification = useCallback(newNotification => {
    setInboxNotifications(prev => [...prev, newNotification])
  }, [])

  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false)
  const openNotificationPanel = useCallback(
    () => setIsNotificationPanelOpen(true),
    []
  )
  const closeNotificationPanel = useCallback(
    () => setIsNotificationPanelOpen(false),
    []
  )

  // 📣 Interactive notifications
  // TODO: Think about interactive notifications like rate our service, etc.

  const value = useMemo(
    () => ({
      inboxNotifications,
      addInboxNotification,
      isNotificationPanelOpen,
      openNotificationPanel,
      closeNotificationPanel,
      showSuccessToast,
      showErrorToast,
      clearToasts
    }),
    [
      inboxNotifications,
      addInboxNotification,
      isNotificationPanelOpen,
      openNotificationPanel,
      closeNotificationPanel,
      showSuccessToast,
      showErrorToast,
      clearToasts
    ]
  )

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Toaster />
      <NotificationPanel
        open={isNotificationPanelOpen}
        onOpenChange={setIsNotificationPanelOpen}
      />
    </NotificationContext.Provider>
  )
}

export default NotificationContext
