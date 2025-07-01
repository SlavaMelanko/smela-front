import './styles.scss'

import clsx from 'clsx'
import { useState } from 'react'

import Copyright from '@/components/Copyright'
import {
  CreditCardIcon,
  HomeIcon,
  ProxyIcon,
  UserIcon
} from '@/components/icons'

import SidebarItem from './Item'

const menuItems = [
  {
    name: 'Home',
    icon: HomeIcon,
    badge: '1'
  },
  {
    icon: ProxyIcon,
    name: 'Proxies',
    subItems: [
      { name: 'Residential', badge: '1' },
      { name: 'ISP' },
      { name: 'SERP API' }
    ]
  },
  {
    name: 'Documentation',
    icon: CreditCardIcon,
    external: true
  },
  {
    name: 'User settings & preferences',
    icon: UserIcon,
    badge: '1',
    external: true
  }
]

const AppSidebar = ({ isOpen }) => {
  const [activeItem, setActiveItem] = useState(menuItems[0].name)

  return (
    <div className={clsx('app-sidebar', { 'app-sidebar--collapsed': !isOpen })}>
      <div className='app-sidebar__inner'>
        <nav className='app-sidebar__nav'>
          <ul className='app-sidebar__list'>
            {menuItems.map(item => (
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
