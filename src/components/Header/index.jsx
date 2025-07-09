import './styles.scss'

import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ProfileModal } from '@/components/dialogs'
import { LanguageSelector, ProfileDropdown } from '@/components/dropdowns'
import { HelpIcon, Logo, LogoutIcon, UserIcon } from '@/components/icons'
import MobileMenuToggle from '@/components/MobileMenuToggle'
import {
  NotificationPanel,
  NotificationToggle
} from '@/components/notifications'
import ThemeToggle from '@/components/ThemeToggle'
import useAuth from '@/hooks/useAuth'
import useModal from '@/hooks/useModal'
import useNotifications from '@/hooks/useNotifications'

const Header = ({ isSidebarOpen, toggleSidebar }) => {
  const { profile, logOut } = useAuth()
  const { inboxNotifications } = useNotifications()
  const { openModal } = useModal()
  const navigate = useNavigate()
  const notificationToggleRef = useRef(null)

  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const togglePanel = () => {
    setIsPanelOpen(prev => !prev)
  }

  const handleLogOut = async () => {
    await logOut()
    navigate('/login')
  }

  // TODO: extract
  const openProfileModal = () => {
    const close = openModal({
      children: <ProfileModal profile={profile} onClose={() => close()} />,
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
      <header className='header'>
        <div className='header__logo'>
          <Logo width={160} />
        </div>

        <nav className='header__nav'>
          <NotificationToggle
            unreadCount={inboxNotifications?.length || 0}
            onClick={togglePanel}
            ref={notificationToggleRef}
          />

          <div className='header__toggle'>
            <ThemeToggle />
          </div>

          <div className='header__language'>
            <LanguageSelector />
          </div>

          <div className='header__profile'>
            <ProfileDropdown name={profile?.firstName} menu={menu} />
          </div>

          <div className='header__mobile-menu-toggle'>
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
