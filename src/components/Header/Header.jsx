import { LogOut, MessageCircleQuestion, User } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ProfileDialog } from '@/components/dialogs'
import { Logo } from '@/components/icons'
import { LanguageDropdown } from '@/components/LanguageDropdown'
import {
  NotificationPanel,
  NotificationToggle
} from '@/components/notifications'
import { ThemeToggle } from '@/components/ThemeToggle'
import { SidebarTrigger } from '@/components/ui'
import { useCurrentUser, useLogout } from '@/hooks/useAuth'
import useModal from '@/hooks/useModal'
import useNotifications from '@/hooks/useNotifications'

import { ProfileDropdown } from './elements'

export const Header = () => {
  const { user } = useCurrentUser()
  const { mutate: logOut } = useLogout()
  const { inboxNotifications } = useNotifications()
  const { openModal } = useModal()
  const navigate = useNavigate()

  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const handleLogOut = () => {
    logOut(undefined, {
      onSuccess: () => {
        navigate('/login')
      }
    })
  }

  const openProfileDialog = () => {
    const close = openModal({
      children: <ProfileDialog profile={user} onClose={() => close()} />
    })
  }

  const menu = [
    {
      label: 'profile',
      icon: <User className='size-4' />,
      onClick: openProfileDialog
    },
    {
      label: 'support',
      icon: <MessageCircleQuestion className='size-4' />,
      onClick: () => {
        navigate('/support')
      }
    },
    {
      label: 'logout.noun',
      icon: <LogOut className='size-4 text-destructive' />,
      onClick: handleLogOut,
      separatorBefore: true,
      danger: true
    }
  ]

  return (
    <>
      <header className='flex items-center justify-between gap-4 w-full h-11 bg-sidebar md:justify-end'>
        <SidebarTrigger className='md:hidden' />
        <Logo width={130} className='md:hidden' />

        <nav className='flex items-center gap-2'>
          <NotificationToggle
            unreadCount={inboxNotifications?.length || 0}
            onClick={() => setIsPanelOpen(true)}
          />

          <div className='hidden md:flex items-center gap-2'>
            <ThemeToggle />
            <LanguageDropdown />
          </div>

          <ProfileDropdown
            firstName={user?.firstName}
            status={user?.status}
            menu={menu}
          />
        </nav>
      </header>
      <NotificationPanel open={isPanelOpen} onOpenChange={setIsPanelOpen} />
    </>
  )
}
