import { act, renderHook } from '@testing-library/react'

import useUsersTableParams from '../useUsersTableParams'

let mockSearchParams = new URLSearchParams()
const mockSetSearchParams = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => [mockSearchParams, mockSetSearchParams]
}))

jest.mock('@/components/Pagination', () => ({
  isValidLimit: value => [25, 50, 100].includes(value),
  Limit: { SM: 25, MD: 50, LG: 100 }
}))

describe('useUsersTableParams', () => {
  beforeEach(() => {
    mockSearchParams = new URLSearchParams()
    mockSetSearchParams.mockClear()
  })

  it('returns default params when URL is empty', () => {
    const { result } = renderHook(() => useUsersTableParams())

    expect(result.current.params).toEqual({
      search: '',
      roles: [],
      statuses: [],
      page: 1,
      limit: 25
    })
  })

  it('parses URL params correctly', () => {
    mockSearchParams.set('search', 'john')
    mockSearchParams.set('roles', 'admin,user')
    mockSearchParams.set('statuses', 'active')
    mockSearchParams.set('page', '3')
    mockSearchParams.set('limit', '50')

    const { result } = renderHook(() => useUsersTableParams())

    expect(result.current.params).toEqual({
      search: 'john',
      roles: ['admin', 'user'],
      statuses: ['active'],
      page: 3,
      limit: 50
    })
  })

  it('falls back to defaults for invalid page and limit', () => {
    mockSearchParams.set('page', 'invalid')
    mockSearchParams.set('limit', '999')

    const { result } = renderHook(() => useUsersTableParams())

    expect(result.current.params.page).toBe(1)
    expect(result.current.params.limit).toBe(25)
  })

  it('updates URL params with setParams', () => {
    const { result } = renderHook(() => useUsersTableParams())

    act(() => {
      result.current.setParams({ search: 'test', roles: ['admin'] })
    })

    expect(mockSetSearchParams).toHaveBeenCalledTimes(1)

    const updateFn = mockSetSearchParams.mock.calls[0][0]
    const next = updateFn(new URLSearchParams())

    expect(next.get('search')).toBe('test')
    expect(next.get('roles')).toBe('admin')
  })

  it('returns apiParams formatted for backend', () => {
    mockSearchParams.set('search', 'john')
    mockSearchParams.set('roles', 'admin,user')
    mockSearchParams.set('page', '2')
    mockSearchParams.set('limit', '50')

    const { result } = renderHook(() => useUsersTableParams())

    expect(result.current.apiParams).toEqual({
      search: 'john',
      roles: 'admin,user',
      page: 2,
      limit: 50
    })
  })
})
