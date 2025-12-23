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

const statusColors = {
  [UserStatus.NEW]: 'cyan',
  [UserStatus.VERIFIED]: 'yellow',
  [UserStatus.TRIAL]: 'purple',
  [UserStatus.ACTIVE]: 'green',
  [UserStatus.SUSPENDED]: 'red',
  [UserStatus.ARCHIVED]: 'blue',
  [UserStatus.PENDING]: 'orange'
}

const getStatusColor = (status, prefix) =>
  statusColors[status]
    ? `${prefix}-${statusColors[status]}`
    : `${prefix}-muted-foreground`

export const getStatusBgColor = status => getStatusColor(status, 'bg')
export const getStatusTextColor = status => getStatusColor(status, 'text')

export default UserStatus
