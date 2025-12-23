import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ProfileModal } from '@/components/dialogs'
import { LanguageDropdown } from '@/components/dropdowns'
import { HelpIcon, Logo, LogoutIcon, UserIcon } from '@/components/icons'
import MobileMenuToggle from '@/components/MobileMenuToggle'
import {
  NotificationPanel,
  NotificationToggle
} from '@/components/notifications'
import ThemeToggle from '@/components/ThemeToggle'
import { useCurrentUser, useLogout } from '@/hooks/useAuth'
import useModal from '@/hooks/useModal'
import useNotifications from '@/hooks/useNotifications'

import { ProfileDropdown } from './components'

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  const { user } = useCurrentUser()
  const { mutate: logOut } = useLogout()
  const { inboxNotifications } = useNotifications()
  const { openModal } = useModal()
  const navigate = useNavigate()
  const notificationToggleRef = useRef(null)

  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const togglePanel = () => {
    setIsPanelOpen(prev => !prev)
  }

  const handleLogOut = () => {
    logOut(undefined, {
      onSuccess: () => {
        navigate('/login')
      }
    })
  }

  // TODO: extract.
  const openProfileModal = () => {
    const close = openModal({
      children: <ProfileModal profile={user} onClose={() => close()} />,
      size: 'md',
      centered: true,
      closeOnOverlayClick: true,
      closeOnEsc: true,
      preserveScrollBarGap: true
    })
  }

  const menu = [
    {
      label: 'profile',
      icon: <UserIcon size='xs' />,
      onClick: openProfileModal
    },
    {
      label: 'support',
      icon: <HelpIcon size='xs' />,
      onClick: () => {
        navigate('/support')
      }
    },
    {
      label: 'logout.noun',
      icon: <LogoutIcon size='xs' color='red' />,
      onClick: handleLogOut,
      separatorBefore: true,
      danger: true
    }
  ]

  return (
    <>
      <header className='flex items-center justify-between gap-4 w-full bg-sidebar'>
        <div className='flex items-center h-full w-[calc(var(--sidebar-width)-3rem)] md:w-auto'>
          <Logo width={130} />
        </div>

        <nav className='flex items-center gap-2'>
          <NotificationToggle
            unreadCount={inboxNotifications?.length || 0}
            onClick={togglePanel}
            ref={notificationToggleRef}
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

          <div className='lg:hidden'>
            <MobileMenuToggle isOpen={isSidebarOpen} onToggle={toggleSidebar} />
          </div>
        </nav>
      </header>
      <NotificationPanel
        isOpen={isPanelOpen}
        onToggle={togglePanel}
        toggleButtonRef={notificationToggleRef}
      />
    </>
  )
}

export default Header
