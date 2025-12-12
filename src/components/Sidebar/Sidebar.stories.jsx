import { MemoryRouter } from 'react-router-dom'

import {
  BookOpenIcon,
  HomeIcon,
  ProxyIcon,
  SettingsIcon
} from '@/components/icons'
import { LocaleProvider } from '@/contexts/LocaleContext'

import AppSidebar, { adminMenuItems, userMenuItems } from './index'

// Demo items for Storybook (plain strings, no i18n keys)
const demoMenuItems = [
  {
    name: 'Home',
    path: '/home',
    icon: HomeIcon,
    badge: '1'
  },
  {
    name: 'Proxies',
    icon: ProxyIcon,
    subItems: [
      { name: 'Residential', path: '/proxies/residential', badge: '2' },
      { name: 'ISP', path: '/proxies/isp' },
      { name: 'SERP API', path: '/proxies/serp-api' }
    ]
  },
  {
    name: 'Documentation',
    icon: BookOpenIcon,
    external: true,
    href: 'https://docs.example.com'
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: SettingsIcon
  }
]

export default {
  title: 'Components/Sidebar',
  component: AppSidebar,
  decorators: [
    Story => (
      <MemoryRouter initialEntries={['/home']}>
        <LocaleProvider>
          <div style={{ height: '100vh', display: 'flex' }}>
            <Story />
          </div>
        </LocaleProvider>
      </MemoryRouter>
    )
  ],
  parameters: {
    layout: 'fullscreen'
  }
}

export const Default = () => <AppSidebar isOpen items={demoMenuItems} />

export const UserMenu = () => <AppSidebar isOpen items={userMenuItems} />

export const AdminMenu = () => <AppSidebar isOpen items={adminMenuItems} />

export const Collapsed = () => (
  <AppSidebar isOpen={false} items={demoMenuItems} />
)
