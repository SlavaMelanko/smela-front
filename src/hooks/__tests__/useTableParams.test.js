import { act, renderHook } from '@testing-library/react'
import { useSearchParams } from 'react-router-dom'

import { Limit } from '@/components/Pagination'

import useTableParams from '../useTableParams'

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn()
}))

describe('useTableParams', () => {
  let mockSearchParams
  let mockSetSearchParams

  beforeEach(() => {
    mockSearchParams = new URLSearchParams()
    mockSetSearchParams = jest.fn(updater => {
      if (typeof updater === 'function') {
        mockSearchParams = updater(mockSearchParams)
      } else {
        mockSearchParams = updater
      }
    })

    useSearchParams.mockReturnValue([mockSearchParams, mockSetSearchParams])
  })

  it('returns default values when URL has no params (Admins table scenario)', () => {
    const { result } = renderHook(() => useTableParams())

    expect(result.current.params).toEqual({
      search: '',
      statuses: [],
      page: 1,
      limit: Limit.SM
    })

    expect(result.current.apiParams).toEqual({
      page: 1,
      limit: Limit.SM
    })
  })

  it('parses all params from URL (Users table scenario)', () => {
    mockSearchParams = new URLSearchParams(
      'search=john&statuses=active,pending&page=2&limit=50'
    )

    useSearchParams.mockReturnValue([mockSearchParams, mockSetSearchParams])

    const { result } = renderHook(() => useTableParams())

    expect(result.current.params).toEqual({
      search: 'john',
      statuses: ['active', 'pending'],
      page: 2,
      limit: 50
    })

    expect(result.current.apiParams).toEqual({
      search: 'john',
      statuses: 'active,pending',
      page: 2,
      limit: 50
    })
  })

  it('updates page param without resetting (pagination)', () => {
    const { result } = renderHook(() => useTableParams())

    act(() => {
      result.current.setParams({ page: 3 })
    })

    expect(mockSetSearchParams).toHaveBeenCalledTimes(1)
    expect(mockSearchParams.get('page')).toBe('3')
  })

  it('resets page when resetPage option is true (filter change)', () => {
    mockSearchParams = new URLSearchParams('page=5&statuses=active')
    useSearchParams.mockReturnValue([mockSearchParams, mockSetSearchParams])

    const { result } = renderHook(() => useTableParams())

    act(() => {
      result.current.setParams({ statuses: ['pending'] }, { resetPage: true })
    })

    expect(mockSearchParams.get('page')).toBeNull()
    expect(mockSearchParams.get('statuses')).toBe('pending')
  })

  it('removes empty values from URL', () => {
    mockSearchParams = new URLSearchParams('search=test&statuses=active')
    useSearchParams.mockReturnValue([mockSearchParams, mockSetSearchParams])

    const { result } = renderHook(() => useTableParams())

    act(() => {
      result.current.setParams({ search: '', statuses: [] })
    })

    expect(mockSearchParams.get('search')).toBeNull()
    expect(mockSearchParams.get('statuses')).toBeNull()
  })
})
