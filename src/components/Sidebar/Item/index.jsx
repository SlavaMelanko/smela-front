import './styles.scss'

import clsx from 'clsx'
import { useState } from 'react'

import { ChevronDownIcon, ExternalIcon } from '@/components/icons'
import { NotificationBadge } from '@/components/notifications'

import ActiveIndicator from '../ActiveIndicator'
import SidebarSubItem from '../SubItem'

const SidebarItem = ({ item, activeItem, setActiveItem }) => {
  const [expanded, setExpanded] = useState(false)

  const hasSubItems = item.subItems && item.subItems.length > 0
  const isActive = activeItem === item.name

  const toggleExpand = () => setExpanded(prev => !prev)

  const handleItemClick = () => {
    if (setActiveItem && !hasSubItems && !item.external) {
      setActiveItem(item.name)
    }

    if (hasSubItems) {
      toggleExpand()
    }
  }

  return (
    <li className='sidebar-item'>
      <div
        className={clsx('sidebar-item__main', {
          'sidebar-item__main--active': isActive
        })}
      >
        <ActiveIndicator variant='item' />

        <button
          type='button'
          onClick={handleItemClick}
          className='sidebar-item__button'
        >
          <div className='sidebar-item__content-left'>
            {item.icon && <item.icon className='sidebar-item__main-icon' />}
            <span className='sidebar-item__label'>{item.name}</span>
          </div>

          <div className='sidebar-item__content-right'>
            {item.badge && <NotificationBadge>{item.badge}</NotificationBadge>}
            {hasSubItems && (
              <ChevronDownIcon
                className={clsx('sidebar-item__additional-icon', {
                  'sidebar-item__additional-icon--expanded': expanded
                })}
              />
            )}
            {item.external && (
              <ExternalIcon className='sidebar-item__additional-icon' />
            )}
          </div>
        </button>
      </div>

      {hasSubItems && (
        <div
          className={clsx('sidebar-item__submenu', {
            'sidebar-item__submenu--open': expanded
          })}
        >
          <ul className='sidebar-item__sublist'>
            {item.subItems.map(subItem => (
              <SidebarSubItem
                key={subItem.name}
                item={subItem}
                isActive={activeItem === subItem.name}
                onClick={() => setActiveItem(subItem.name)}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}

export default SidebarItem
