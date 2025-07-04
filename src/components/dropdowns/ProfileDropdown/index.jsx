import './styles.scss'

import clsx from 'clsx'

import { ChevronDownIcon } from '@/components/icons'
import useOutsideClick from '@/hooks/useOutsideClick'

import Avatar from './Avatar'
import Dropdown from './Dropdown'

const ProfileDropdown = ({ className = '', name, menu }) => {
  const { ref, isActive, setIsActive } = useOutsideClick()

  const toggle = () => setIsActive(prev => !prev)

  const handleSelect = ({ onClick }) => {
    if (onClick) {
      onClick()
    }

    setIsActive(false)
  }

  return (
    <div className={clsx('profile-dropdown', className)} ref={ref}>
      <button
        className='profile-dropdown__button'
        aria-label='Profile dropdown'
        onClick={toggle}
      >
        <Avatar className='profile-dropdown__avatar' />
        <span className='profile-dropdown__name'>{name}</span>
        <ChevronDownIcon
          className={clsx(
            'profile-dropdown__chevron',
            isActive && 'profile-dropdown__chevron--open'
          )}
          size='xs'
        />
      </button>
      <Dropdown
        className={clsx(isActive && 'profile-dropdown__dropdown--open')}
        menu={menu}
        onSelect={handleSelect}
      />
    </div>
  )
}

export default ProfileDropdown
