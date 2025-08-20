import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import { StatusCodes } from 'http-status-codes'

import { authService, userService } from '@/services/backend'

export const authKeys = {
  all: () => ['auth'],
  user: () => [...authKeys.all(), 'user']
}

export const getCurrentUserQueryOptions = () =>
  queryOptions({
    queryKey: authKeys.user(),
    queryFn: async () => {
      try {
        return userService.getCurrentUser()
      } catch (error) {
        if (error?.status === StatusCodes.UNAUTHORIZED) {
          return null
        }

        throw error
      }
    }
  })

export const useCurrentUser = () => {
  const query = useQuery({
    ...getCurrentUserQueryOptions(),
    select: data => data?.user || data || null
  })

  return {
    isPending: query.isPending,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    isSuccess: query.isSuccess,
    user: query.data,
    isAuthenticated: !!query.data
  }
}

export const useLogin = () =>
  useMutation({
    mutationFn: ({ email, password }) => authService.logIn(email, password),
    meta: {
      invalidatesQueries: [authKeys.user()]
    }
  })

export const useLoginWithGoogle = () =>
  useMutation({
    mutationFn: async () => {
      // Temporary implementation until Google OAuth is implemented
      throw new Error('Google login not implemented for backend API yet')
    },
    meta: {
      // When implemented, this will invalidate queries to refetch user data
      invalidatesQueries: [authKeys.user()]
    }
  })

export const useSignup = () =>
  useMutation({
    mutationFn: userData => authService.signUp(userData)
  })

export const useSignupWithGoogle = () =>
  useMutation({
    mutationFn: async () => {
      // Temporary implementation until Google OAuth is implemented
      throw new Error('Google signup not implemented for backend API yet')
    },
    meta: {
      // When implemented, this will invalidate queries to refetch user data
      invalidatesQueries: [authKeys.user()]
    }
  })

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authService.logOut,
    meta: {
      invalidatesQueries: [authKeys.all()]
    },
    onSuccess: () => {
      // Set user data to null for immediate UI update.
      queryClient.setQueryData(authKeys.user(), null)
    }
  })
}

export const useVerifyEmail = () =>
  useMutation({
    mutationFn: token => authService.verifyEmail(token),
    meta: {
      invalidatesQueries: [authKeys.user()]
    }
  })

export const useResendVerificationEmail = () =>
  useMutation({
    mutationFn: email => authService.resendVerificationEmail(email)
  })

export const useRequestPasswordReset = () =>
  useMutation({
    mutationFn: email => authService.requestPasswordReset(email)
  })

export const useResetPassword = () =>
  useMutation({
    mutationFn: ({ token, password }) =>
      authService.resetPassword(token, password)
  })
