import { Logo } from '@/components/icons'
import { LanguageDropdown } from '@/components/LanguageDropdown'
import { NotificationToggle } from '@/components/notifications'
import { ThemeToggle } from '@/components/ThemeToggle'
import { SidebarTrigger } from '@/components/ui'
import { useCurrentUser } from '@/hooks/useAuth'
import useNotifications from '@/hooks/useNotifications'

import { UserProfileDropdown } from './elements'

export const Header = () => {
  const { user } = useCurrentUser()
  const { inboxNotifications, openNotificationPanel } = useNotifications()

  return (
    <header className='flex items-center justify-between gap-4 w-full h-11 bg-sidebar md:justify-end'>
      <SidebarTrigger className='md:hidden' />
      <Logo width={130} className='md:hidden' />

      <nav className='flex items-center gap-2'>
        <NotificationToggle
          unreadCount={inboxNotifications?.length || 0}
          onClick={openNotificationPanel}
        />

        <div className='hidden md:flex items-center gap-2'>
          <ThemeToggle />
          <LanguageDropdown />
        </div>

        <UserProfileDropdown user={user} />
      </nav>
    </header>
  )
}
