import {
  adminActiveStatuses,
  getUserStatusBackgroundColor,
  getUserStatusTextColor,
  userActiveStatuses,
  UserStatus
} from '../userStatus'

describe('userActiveStatuses', () => {
  it('contains expected statuses', () => {
    expect(userActiveStatuses).toContain(UserStatus.VERIFIED)
    expect(userActiveStatuses).toContain(UserStatus.TRIAL)
    expect(userActiveStatuses).toContain(UserStatus.ACTIVE)
    expect(userActiveStatuses).toHaveLength(3)
  })
})

describe('adminActiveStatuses', () => {
  it('contains only ACTIVE', () => {
    expect(adminActiveStatuses).toEqual([UserStatus.ACTIVE])
    expect(adminActiveStatuses).toHaveLength(1)
  })
})

describe('getUserStatusBackgroundColor', () => {
  it.each(Object.values(UserStatus))('returns bg class for %s', status => {
    expect(getUserStatusBackgroundColor(status)).toMatch(/^bg-/)
  })

  it('returns fallback for unknown status', () => {
    expect(getUserStatusBackgroundColor('unknown')).toBe('bg-muted-foreground')
  })
})

describe('getUserStatusTextColor', () => {
  it.each(Object.values(UserStatus))('returns text class for %s', status => {
    expect(getUserStatusTextColor(status)).toMatch(/^text-/)
  })

  it('returns fallback for unknown status', () => {
    expect(getUserStatusTextColor('unknown')).toBe('text-muted-foreground')
  })
})
