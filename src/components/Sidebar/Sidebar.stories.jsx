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
    title: 'Home',
    url: '/home',
    icon: HomeIcon,
    badge: '1'
  },
  {
    title: 'Proxies',
    icon: ProxyIcon,
    items: [
      { title: 'Residential', url: '/proxies/residential', badge: '2' },
      { title: 'ISP', url: '/proxies/isp' },
      { title: 'SERP API', url: '/proxies/serp-api' }
    ]
  },
  {
    title: 'Documentation',
    icon: BookOpenIcon,
    external: true,
    url: 'https://docs.example.com'
  },
  {
    title: 'Settings',
    url: '/settings',
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
