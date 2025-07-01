import './styles.scss'

import clsx from 'clsx'

import { NotificationBadge } from '@/components/notifications'

import ActiveIndicator from '../ActiveIndicator'

const SidebarSubItem = ({ item, isActive, onClick }) => {
  return (
    <li
      className={clsx('sidebar-sub-item', {
        'sidebar-sub-item--active': isActive
      })}
    >
      <ActiveIndicator variant='sub-item' />

      <button
        type='button'
        onClick={onClick}
        className='sidebar-sub-item__button'
      >
        <div className='sidebar-sub-item__content-left'>
          <span className='sidebar-sub-item__label'>{item.name}</span>
        </div>

        <div className='sidebar-sub-item__content-right'>
          {item.badge && <NotificationBadge>{item.badge}</NotificationBadge>}
        </div>
      </button>
    </li>
  )
}

export default SidebarSubItem
