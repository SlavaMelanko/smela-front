import './styles.scss'

import clsx from 'clsx'

import { DropdownList } from '@/components/dropdowns'
import { ChevronToggle } from '@/components/icons/animated'
import useOutsideClick from '@/hooks/useOutsideClick'

import Avatar from './Avatar'

const ProfileDropdown = ({ className = '', name, menu }) => {
  const { ref, isActive, setIsActive } = useOutsideClick()

  const toggle = () => setIsActive(prev => !prev)

  const normalizedMenu = menu.map(item => ({
    ...item,
    onClick: () => {
      item.onClick?.()
      setIsActive(false)
    }
  }))

  return (
    <div className={clsx('profile-dropdown', className)} ref={ref}>
      <button
        className='profile-dropdown__button'
        aria-label='Profile dropdown'
        onClick={toggle}
      >
        <Avatar className='profile-dropdown__avatar' />
        <span className='profile-dropdown__name'>{name}</span>
        <ChevronToggle isOpen={isActive} />
      </button>
      <DropdownList menu={normalizedMenu} isOpen={isActive} />
    </div>
  )
}

export default ProfileDropdown
