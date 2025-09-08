// Cross-references:
//   - src/components/StatusBadge/styles.scss
//   - src/locales/*.json
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

export default UserStatus
