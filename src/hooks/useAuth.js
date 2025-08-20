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

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ email, password }) => authService.logIn(email, password),
    onSuccess: ({ user }) => {
      if (user) {
        queryClient.setQueryData(authKeys.user(), user)
      }

      queryClient.invalidateQueries({ queryKey: authKeys.user() })
    }
  })
}

export const useLoginWithGoogle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      // Temporary implementation until Google OAuth is implemented
      throw new Error('Google login not implemented for backend API yet')
    },
    onSuccess: ({ user }) => {
      // When implemented, this will set the user data and invalidate queries
      if (user) {
        queryClient.setQueryData(authKeys.user(), user)
      }

      queryClient.invalidateQueries({ queryKey: authKeys.user() })
    }
  })
}

export const useSignup = () => {
  return useMutation({
    mutationFn: userData => authService.signUp(userData),
    onSuccess: () => {
      // Do not set user data immediately - user must verify email first.
      // The backend /api/v1/me endpoint requires verified status.
      // No invalidation needed - user must verify email before accessing /me endpoint.
    }
  })
}

export const useSignupWithGoogle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      // Temporary implementation until Google OAuth is implemented
      throw new Error('Google signup not implemented for backend API yet')
    },
    onSuccess: ({ user }) => {
      // When implemented, this will set the user data and invalidate queries
      if (user) {
        queryClient.setQueryData(authKeys.user(), user)
      }

      queryClient.invalidateQueries({ queryKey: authKeys.user() })
    }
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authService.logOut,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.user(), null)
      queryClient.invalidateQueries({ queryKey: authKeys.all() })
    }
  })
}

export const useVerifyEmail = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: token => authService.verifyEmail(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.user() })
    }
  })
}

export const useResendVerificationEmail = () => {
  return useMutation({
    mutationFn: email => authService.resendVerificationEmail(email)
  })
}

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: email => authService.requestPasswordReset(email)
  })
}

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ token, password }) =>
      authService.resetPassword(token, password)
  })
}
