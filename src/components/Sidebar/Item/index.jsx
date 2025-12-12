import './styles.scss'

import clsx from 'clsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ChevronDownIcon, ExternalIcon } from '@/components/icons'
import { NotificationBadge } from '@/components/notifications'
import useLocale from '@/hooks/useLocale'

import ActiveIndicator from '../ActiveIndicator'
import SidebarSubItem from '../SubItem'

const SidebarItem = ({ item, activeItem, setActiveItem }) => {
  const navigate = useNavigate()
  const { t } = useLocale()
  const [expanded, setExpanded] = useState(false)

  const hasSubItems = item.subItems?.length > 0
  const isActive = activeItem === item.name
  const displayName = t(item.name)

  const toggleExpand = () => setExpanded(prev => !prev)

  const handleItemClick = () => {
    if (hasSubItems) {
      toggleExpand()

      return
    }

    if (item.external && item.href) {
      window.open(item.href, '_blank', 'noopener,noreferrer')

      return
    }

    if (item.path) {
      setActiveItem(item.name)
      navigate(item.path)
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
            <span className='sidebar-item__label'>{displayName}</span>
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
                onClick={() => {
                  setActiveItem(subItem.name)

                  if (subItem.path) {
                    navigate(subItem.path)
                  }
                }}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  )
}

export default SidebarItem
