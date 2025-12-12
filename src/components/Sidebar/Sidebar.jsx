import './styles.scss'

import clsx from 'clsx'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import Copyright from '@/components/Copyright'

import SidebarItem from './Item'

const findActiveItem = (items, pathname) => {
  for (const item of items) {
    if (item.path === pathname) {
      return item.name
    }

    if (item.subItems) {
      const subItem = item.subItems.find(sub => sub.path === pathname)

      if (subItem) {
        return subItem.name
      }
    }
  }

  return items[0]?.name ?? ''
}

const AppSidebar = ({ isOpen, items }) => {
  const location = useLocation()
  const [activeItem, setActiveItem] = useState(() =>
    findActiveItem(items, location.pathname)
  )

  return (
    <div className={clsx('app-sidebar', { 'app-sidebar--collapsed': !isOpen })}>
      <div className='app-sidebar__inner'>
        <nav className='app-sidebar__nav'>
          <ul className='app-sidebar__list'>
            {items.map(item => (
              <SidebarItem
                key={item.name}
                item={item}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            ))}
          </ul>
          <div className='app-sidebar__footer'>
            <Copyright />
          </div>
        </nav>
      </div>
    </div>
  )
}

export default AppSidebar
