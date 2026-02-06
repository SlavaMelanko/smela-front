import { LogOut, MessageCircleQuestion, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { ProfileDialog } from '@/components/dialogs'
import { useLogout } from '@/hooks/useAuth'
import { useModal } from '@/hooks/useModal'

import { ProfileDropdown } from './ProfileDropdown'

export const UserProfileDropdown = ({ user }) => {
  const navigate = useNavigate()
  const { mutate: logOut } = useLogout()
  const { openModal } = useModal()

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
    <ProfileDropdown
      firstName={user?.firstName}
      status={user?.status}
      menu={menu}
    />
  )
}
