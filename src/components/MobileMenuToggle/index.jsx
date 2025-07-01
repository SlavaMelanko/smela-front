import './styles.scss'

import clsx from 'clsx'

import { CloseIcon, MenuIcon } from '@/components/icons'

const MobileMenuToggle = ({ isOpen, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      className={clsx('mobile-menu-toggle', {
        'mobile-menu-toggle--open': isOpen
      })}
    >
      <span className='mobile-menu-toggle__icon mobile-menu-toggle__icon--menu'>
        <MenuIcon size='md' color='primary' />
      </span>
      <span className='mobile-menu-toggle__icon mobile-menu-toggle__icon--close'>
        <CloseIcon size='md' color='primary' />
      </span>
    </button>
  )
}

export default MobileMenuToggle
