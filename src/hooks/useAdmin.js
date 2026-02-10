import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

import { defaultOptions } from '@/components/Pagination'
import { adminApi } from '@/services/backend'

export const adminKeys = {
  all: () => ['admin'],
  users: () => [...adminKeys.all(), 'users'],
  usersList: params => [...adminKeys.users(), 'list', params],
  userDetail: id => [...adminKeys.users(), 'detail', id],
  teams: () => [...adminKeys.all(), 'teams'],
  teamsList: params => [...adminKeys.teams(), 'list', params],
  teamDetail: id => [...adminKeys.teams(), 'detail', id]
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

export const useTeams = (params = {}) => {
  return useQuery({
    queryKey: adminKeys.teamsList(params),
    queryFn: () => adminApi.getTeams(params),
    select: data => ({
      teams: data?.teams ?? [],
      pagination: data?.pagination ?? defaultOptions
    }),
    placeholderData: keepPreviousData,
    ...adminQueryOptions
  })
}

export const useTeam = (id, options = {}) => {
  return useQuery({
    queryKey: adminKeys.teamDetail(id),
    queryFn: () => adminApi.getTeamById(id),
    select: data => data?.team,
    enabled: !!id,
    ...adminQueryOptions,
    ...options
  })
}

export const useCreateTeam = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: data => adminApi.createTeam(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.teams() })
    }
  })
}

export const useUpdateTeam = id => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: data => adminApi.updateTeam(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.teams() })
      queryClient.invalidateQueries({ queryKey: adminKeys.teamDetail(id) })
    }
  })
}

export const useDeleteTeam = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: id => adminApi.deleteTeam(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.teams() })
    }
  })
}

export const useCreateTeamMember = teamId => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: data => adminApi.createTeamMember(teamId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.teamDetail(teamId)
      })
    }
  })
}

export const useResendTeamMemberInvite = teamId => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: memberId => adminApi.resendTeamMemberInvite(teamId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminKeys.teamDetail(teamId)
      })
    }
  })
}
