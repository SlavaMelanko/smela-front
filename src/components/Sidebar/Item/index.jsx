import './styles.scss'

import clsx from 'clsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ChevronDownIcon, ExternalIcon } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import useLocale from '@/hooks/useLocale'

import ActiveIndicator from '../ActiveIndicator'
import SidebarSubItem from '../SubItem'

const SidebarItem = ({ item, activeItem, setActiveItem }) => {
  const navigate = useNavigate()
  const { t } = useLocale()
  const [expanded, setExpanded] = useState(false)

  const hasSubItems = item.items?.length > 0
  const isActive = activeItem === item.title

  const toggleExpand = () => setExpanded(prev => !prev)

  const handleItemClick = () => {
    if (hasSubItems) {
      toggleExpand()

      return
    }

    if (item.external && item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer')

      return
    }

    if (item.url) {
      setActiveItem(item.title)
      navigate(item.url)
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
          aria-current={isActive ? 'page' : undefined}
        >
          <div className='sidebar-item__content-left'>
            {item.icon && <item.icon className='sidebar-item__main-icon' />}
            <span className='sidebar-item__label'>{t(item.title)}</span>
          </div>

          <div className='sidebar-item__content-right'>
            {item.badge && (
              <Badge variant='notification'>
                {item.badge > 9 ? '9+' : item.badge}
              </Badge>
            )}
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
            {item.items.map(subItem => (
              <SidebarSubItem
                key={subItem.title}
                item={subItem}
                isActive={activeItem === subItem.title}
                onClick={() => {
                  setActiveItem(subItem.title)

                  if (subItem.url) {
                    navigate(subItem.url)
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
