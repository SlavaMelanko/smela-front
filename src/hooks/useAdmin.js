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
  companies: () => [...adminKeys.all(), 'companies'],
  companiesList: params => [...adminKeys.companies(), 'list', params],
  companyDetail: id => [...adminKeys.companies(), 'detail', id]
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

export const useCompanies = (params = {}) => {
  return useQuery({
    queryKey: adminKeys.companiesList(params),
    queryFn: () => adminApi.getCompanies(params),
    select: data => ({
      companies: data?.companies ?? [],
      pagination: data?.pagination ?? defaultOptions
    }),
    placeholderData: keepPreviousData,
    ...adminQueryOptions
  })
}

export const useCompany = (id, options = {}) => {
  return useQuery({
    queryKey: adminKeys.companyDetail(id),
    queryFn: () => adminApi.getCompanyById(id),
    enabled: !!id,
    ...adminQueryOptions,
    ...options
  })
}

export const useCreateCompany = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: data => adminApi.createCompany(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.companies() })
    }
  })
}

export const useUpdateCompany = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => adminApi.updateCompany(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: adminKeys.companies() })
      queryClient.invalidateQueries({ queryKey: adminKeys.companyDetail(id) })
    }
  })
}

export const useDeleteCompany = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: id => adminApi.deleteCompany(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.companies() })
    }
  })
}
