import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

import { defaultOptions } from '@/components/Pagination'
import { ownerApi } from '@/services/backend'

export const ownerKeys = {
  all: () => ['owner'],
  admins: () => [...ownerKeys.all(), 'admins'],
  adminsList: params => [...ownerKeys.admins(), 'list', params]
}

// Owner queries need fresh data — new registrations or user updates
// should be visible immediately, not cached for minutes
const ownerQueryOptions = {
  staleTime: 0,
  gcTime: 60 * 1000, // 1 minute
  refetchOnWindowFocus: true
}

export const useAdmins = (params = {}) => {
  return useQuery({
    queryKey: ownerKeys.adminsList(params),
    queryFn: () => ownerApi.getAdmins(params),
    select: data => ({
      admins: data?.admins ?? [],
      pagination: data?.pagination ?? defaultOptions
    }),
    placeholderData: keepPreviousData,
    ...ownerQueryOptions
  })
}

export const useInviteAdmin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ownerApi.inviteAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ownerKeys.admins() })
    }
  })
}

export const useResendAdminInvitation = () => {
  return useMutation({
    mutationFn: ownerApi.resendAdminInvitation
  })
}
