// Cross-references: public/locales/*.json
const UserStatus = {
  NEW: 'new',
  VERIFIED: 'verified',
  TRIAL: 'trial',
  ACTIVE: 'active',
  SUSPENDED: 'suspended',
  ARCHIVED: 'archived',
  PENDING: 'pending'
}

export const userActiveStatuses = [
  UserStatus.VERIFIED,
  UserStatus.TRIAL,
  UserStatus.ACTIVE
]

export const adminActiveStatuses = [UserStatus.ACTIVE]

const statusToColor = {
  [UserStatus.NEW]: 'cyan',
  [UserStatus.VERIFIED]: 'yellow',
  [UserStatus.TRIAL]: 'purple',
  [UserStatus.ACTIVE]: 'green',
  [UserStatus.SUSPENDED]: 'red',
  [UserStatus.ARCHIVED]: 'blue',
  [UserStatus.PENDING]: 'orange'
}

export const getStatusBgColor = status =>
  statusToColor[status]
    ? `bg-${statusToColor[status]}-500`
    : 'bg-muted-foreground'

export const getStatusTextColor = status =>
  statusToColor[status]
    ? `text-${statusToColor[status]}-500`
    : 'text-muted-foreground'

export default UserStatus
