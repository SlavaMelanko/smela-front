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

const statusToBgColor = {
  [UserStatus.NEW]: 'bg-sky-500',
  [UserStatus.VERIFIED]: 'bg-amber-500',
  [UserStatus.TRIAL]: 'bg-violet-500',
  [UserStatus.ACTIVE]: 'bg-green-500',
  [UserStatus.SUSPENDED]: 'bg-red-500',
  [UserStatus.ARCHIVED]: 'bg-slate-500',
  [UserStatus.PENDING]: 'bg-amber-500'
}

export const getStatusBgColor = status =>
  statusToBgColor[status] ?? 'bg-muted-foreground'

const statusToTextColor = {
  [UserStatus.NEW]: 'text-sky-500',
  [UserStatus.VERIFIED]: 'text-amber-500',
  [UserStatus.TRIAL]: 'text-violet-500',
  [UserStatus.ACTIVE]: 'text-green-500',
  [UserStatus.SUSPENDED]: 'text-red-500',
  [UserStatus.ARCHIVED]: 'text-slate-500',
  [UserStatus.PENDING]: 'text-amber-500'
}

export const getStatusTextColor = status =>
  statusToTextColor[status] ?? 'text-muted-foreground'

export default UserStatus
