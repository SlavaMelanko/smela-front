import { Key, User, Users } from 'lucide-react'

export const ProfileTab = {
  PROFILE: 'profile',
  MEMBERSHIP: 'membership',
  PERMISSIONS: 'permissions'
}

export const getAdminTabs = t => [
  {
    value: ProfileTab.PROFILE,
    icon: User,
    label: () => t('profile.title')
  },
  {
    value: ProfileTab.PERMISSIONS,
    icon: Key,
    label: () => t('permissions.name')
  }
]

export const getAdminTabValues = () => getAdminTabs(null).map(tab => tab.value)

export const getUserTabs = (hasMembership, t) => {
  const tabs = [
    {
      value: ProfileTab.PROFILE,
      icon: User,
      label: () => t('profile.title')
    }
  ]

  if (hasMembership) {
    tabs.push({
      value: ProfileTab.MEMBERSHIP,
      icon: Users,
      label: () => t('membership')
    })
  }

  return tabs
}

export const getUserTabValues = hasMembership =>
  getUserTabs(hasMembership, null).map(tab => tab.value)
