import {
  BookOpenIcon,
  DashboardIcon,
  HomeIcon,
  ProxyIcon,
  SettingsIcon,
  UsersIcon
} from '@/components/icons'
import Role from '@/lib/types/user/role'

export const userMenuItems = [
  {
    name: 'sidebar.home',
    path: '/home',
    icon: HomeIcon
  },
  {
    name: 'sidebar.proxies',
    icon: ProxyIcon,
    subItems: [
      { name: 'sidebar.residential', path: '/proxies/residential' },
      { name: 'sidebar.isp', path: '/proxies/isp' },
      { name: 'sidebar.serpApi', path: '/proxies/serp-api' }
    ]
  },
  {
    name: 'sidebar.documentation',
    icon: BookOpenIcon,
    external: true,
    href: 'https://docs.smela.com'
  },
  {
    name: 'sidebar.settings',
    path: '/settings',
    icon: SettingsIcon
  }
]

export const adminMenuItems = [
  {
    name: 'sidebar.dashboard',
    path: '/admin/dashboard',
    icon: DashboardIcon
  },
  {
    name: 'sidebar.users',
    path: '/admin/users',
    icon: UsersIcon
  },
  {
    name: 'sidebar.settings',
    path: '/settings',
    icon: SettingsIcon
  }
]

export const menuByRole = {
  [Role.USER]: userMenuItems,
  [Role.ENTERPRISE]: userMenuItems,
  [Role.ADMIN]: adminMenuItems,
  [Role.OWNER]: adminMenuItems,
  [Role.GUEST]: []
}
