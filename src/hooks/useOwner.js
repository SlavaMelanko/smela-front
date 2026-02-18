import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

import { defaultOptions } from '@/components/Pagination'
import { UserStatus } from '@/lib/types'
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
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ownerKeys.adminsList(params),
    queryFn: () => ownerApi.getAdmins(params),
    select: data => ({
      admins: data?.admins ?? [],
      pagination: data?.pagination ?? defaultOptions
    }),
    placeholderData: keepPreviousData,
    ...ownerQueryOptions
  })

  return {
    admins: data?.admins ?? [],
    pagination: data?.pagination ?? defaultOptions,
    isPending,
    isError,
    error,
    refetch
  }
}

export const useCreateAdmin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ownerApi.createAdmin,
    onMutate: async newAdmin => {
      await queryClient.cancelQueries({ queryKey: ownerKeys.admins() })

      const previousQueries = queryClient.getQueriesData({
        queryKey: ownerKeys.admins()
      })

      queryClient.setQueriesData({ queryKey: ownerKeys.admins() }, old => {
        const now = new Date().toISOString()
        const optimisticAdmin = {
          ...newAdmin,
          id: '...',
          status: UserStatus.PENDING,
          createdAt: now,
          updatedAt: now
        }

        return {
          ...old,
          admins: [optimisticAdmin, ...(old.admins ?? [])]
        }
      })

      return { previousQueries }
    },
    onError: (_error, _newAdmin, context) => {
      for (const [queryKey, data] of context.previousQueries) {
        queryClient.setQueryData(queryKey, data)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ownerKeys.admins() })
    }
  })
}

export const useResendAdminInvite = () => {
  return useMutation({
    mutationFn: ownerApi.resendAdminInvite
  })
}

export const useCancelAdminInvite = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ownerApi.cancelAdminInvite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ownerKeys.admins() })
    }
  })
}
