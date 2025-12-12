import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { adminService } from '@/services/backend'

export const adminKeys = {
  all: () => ['admin'],
  users: () => [...adminKeys.all(), 'users'],
  users_list: params => [...adminKeys.users(), 'list', params],
  user_detail: id => [...adminKeys.users(), 'detail', id]
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
    queryKey: adminKeys.users_list(params),
    queryFn: () => adminService.getUsers(params),
    placeholderData: keepPreviousData,
    ...adminQueryOptions
  })
}

export const useUser = (id, options = {}) => {
  return useQuery({
    queryKey: adminKeys.user_detail(id),
    queryFn: () => adminService.getUserById(id),
    enabled: !!id,
    ...adminQueryOptions,
    ...options
  })
}
