import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { defaultOptions } from '@/components/Pagination'
import { adminApi } from '@/services/backend'

export const adminKeys = {
  all: () => ['admin'],
  users: () => [...adminKeys.all(), 'users'],
  usersList: params => [...adminKeys.users(), 'list', params],
  userDetail: id => [...adminKeys.users(), 'detail', id]
}

// Admin queries need fresh data — new registrations or user updates
// should be visible immediately, not cached for minutes
const adminQueryOptions = {
  staleTime: 0,
  gcTime: 60 * 1000, // 1 minute
  refetchOnWindowFocus: true
}

export const useUsers = (params = {}) => {
  return useQuery({
    queryKey: adminKeys.usersList(params),
    queryFn: () => adminApi.getUsers(params),
    select: data => ({
      users: data?.users ?? [],
      pagination: data?.pagination ?? defaultOptions
    }),
    placeholderData: keepPreviousData,
    ...adminQueryOptions
  })
}

export const useUser = (id, options = {}) => {
  return useQuery({
    queryKey: adminKeys.userDetail(id),
    queryFn: () => adminApi.getUserById(id),
    enabled: !!id,
    ...adminQueryOptions,
    ...options
  })
}
