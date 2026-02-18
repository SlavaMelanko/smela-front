import { MailIcon, Send, User, X } from 'lucide-react'

import { UserStatus } from '@/lib/types'

export const createOpenItem = (t, onClick, icon = User) => ({
  icon,
  label: t('contextMenu.open'),
  onClick
})

export const createInviteItem = (
  t,
  { handleResendInvite, isResending, handleCancelInvite, isCancelling }
) => ({
  icon: MailIcon,
  label: t('contextMenu.invite'),
  isVisible: row => row.status === UserStatus.PENDING,
  items: [
    {
      icon: Send,
      label: t('contextMenu.resend'),
      onClick: handleResendInvite,
      disabled: isResending
    },
    {
      icon: X,
      label: t('contextMenu.cancel'),
      onClick: handleCancelInvite,
      variant: 'destructive',
      disabled: isCancelling
    }
  ]
})
