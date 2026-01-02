import './styles.scss'

import clsx from 'clsx'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import Copyright from '@/components/Copyright'

import SidebarItem from './Item'

const findActiveItem = (items, pathname) => {
  for (const item of items) {
    if (item.url === pathname) {
      return item.title
    }

    if (item.items) {
      const subItem = item.items.find(sub => sub.url === pathname)

      if (subItem) {
        return subItem.title
      }
    }
  }

  return items[0]?.title ?? ''
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
                key={item.title}
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
