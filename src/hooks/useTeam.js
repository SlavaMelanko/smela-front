import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

import { defaultOptions } from '@/components/Pagination'
import { teamApi } from '@/services/backend'
import { Status } from '@/types'

export const teamKeys = {
  all: () => ['teams'],
  list: params => [...teamKeys.all(), 'list', params],
  detail: id => [...teamKeys.all(), 'detail', id],
  members: teamId => [...teamKeys.all(), teamId, 'members'],
  member: (teamId, memberId) => [...teamKeys.all(), teamId, 'members', memberId]
}

// Team queries need fresh data for real-time collaboration visibility.
const teamQueryOptions = {
  staleTime: 0,
  gcTime: 60 * 1000,
  refetchOnWindowFocus: true
}

export const useTeams = (params = {}) => {
  return useQuery({
    queryKey: teamKeys.list(params),
    queryFn: () => teamApi.listTeams(params),
    select: data => ({
      teams: data?.teams ?? [],
      pagination: data?.pagination ?? defaultOptions
    }),
    placeholderData: keepPreviousData,
    ...teamQueryOptions
  })
}

export const useCreateTeam = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: data => teamApi.createTeam(data),
    onMutate: async newTeam => {
      await queryClient.cancelQueries({ queryKey: teamKeys.all() })

      const previousTeams = queryClient.getQueryData(teamKeys.list({}))

      queryClient.setQueryData(teamKeys.list({}), old => {
        const now = new Date().toISOString()
        const optimisticTeam = {
          ...newTeam,
          id: `temp-${now}`,
          createdAt: now,
          updatedAt: now
        }

        const teams = old?.teams ?? []

        const pagination = old?.pagination ?? defaultOptions

        return {
          teams: [optimisticTeam, ...teams],
          pagination: {
            ...pagination,
            total: pagination.total + 1
          }
        }
      })

      return { previousTeams }
    },
    onError: (_error, _newTeam, context) => {
      queryClient.setQueryData(teamKeys.list({}), context.previousTeams)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.all() })
    }
  })
}

export const useTeam = (id, options = {}) => {
  return useQuery({
    queryKey: teamKeys.detail(id),
    queryFn: () => teamApi.getTeam(id),
    select: data => data?.team,
    enabled: !!id,
    ...teamQueryOptions,
    ...options
  })
}

export const useUpdateTeam = teamId => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: data => teamApi.updateTeam(teamId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.all() })
    }
  })
}

export const useTeamMembers = (teamId, options = {}) => {
  return useQuery({
    queryKey: teamKeys.members(teamId),
    queryFn: () => teamApi.getMembers(teamId),
    select: data => data?.members ?? [],
    enabled: !!teamId,
    ...teamQueryOptions,
    ...options
  })
}

export const useTeamMember = (teamId, memberId, options = {}) => {
  return useQuery({
    queryKey: teamKeys.member(teamId, memberId),
    queryFn: () => teamApi.getMember(teamId, memberId),
    select: data => data?.member,
    enabled: !!teamId && !!memberId,
    ...teamQueryOptions,
    ...options
  })
}

export const useInviteMember = teamId => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: data => teamApi.inviteMember(teamId, data),
    onMutate: async newMember => {
      await queryClient.cancelQueries({ queryKey: teamKeys.members(teamId) })

      const previousMembers = queryClient.getQueryData(teamKeys.members(teamId))

      queryClient.setQueryData(teamKeys.members(teamId), old => {
        const optimisticMember = {
          ...newMember,
          id: `temp-${Date.now()}`,
          status: Status.PENDING
        }

        const members = old ?? []

        return [optimisticMember, ...members]
      })

      return { previousMembers }
    },
    onError: (_error, _newMember, context) => {
      queryClient.setQueryData(
        teamKeys.members(teamId),
        context.previousMembers
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.members(teamId) })
      queryClient.invalidateQueries({ queryKey: teamKeys.detail(teamId) })
    }
  })
}

export const useUpdateMember = (teamId, memberId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: data => teamApi.updateMember(teamId, memberId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: teamKeys.member(teamId, memberId)
      })

      queryClient.invalidateQueries({ queryKey: teamKeys.members(teamId) })
    }
  })
}

export const useResendInvite = teamId => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: memberId => teamApi.resendInvite(teamId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.members(teamId) })
    }
  })
}
