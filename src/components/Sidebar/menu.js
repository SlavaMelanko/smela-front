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
    title: 'sidebar.home',
    url: '/home',
    icon: HomeIcon
  },
  {
    title: 'sidebar.proxies',
    icon: ProxyIcon,
    items: [
      { title: 'sidebar.residential', url: '/proxies/residential' },
      { title: 'sidebar.isp', url: '/proxies/isp' },
      { title: 'sidebar.serpApi', url: '/proxies/serp-api' }
    ]
  },
  {
    title: 'sidebar.documentation',
    icon: BookOpenIcon,
    external: true,
    url: 'https://docs.smela.com'
  },
  {
    title: 'sidebar.settings',
    url: '/settings',
    icon: SettingsIcon
  }
]

export const adminMenuItems = [
  {
    title: 'sidebar.dashboard',
    url: '/admin/dashboard',
    icon: DashboardIcon
  },
  {
    title: 'sidebar.users',
    url: '/admin/users',
    icon: UsersIcon
  },
  {
    title: 'sidebar.settings',
    url: '/settings',
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
