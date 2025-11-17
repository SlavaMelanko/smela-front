import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

import { accessTokenStorage } from '@/lib/storage'
import { authService, userService } from '@/services/backend'

export const authKeys = {
  all: () => ['auth'],
  user: () => [...authKeys.all(), 'user']
}

export const getCurrentUserQueryOptions = () =>
  queryOptions({
    queryKey: authKeys.user(),
    queryFn: userService.getCurrentUser
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
    mutationFn: authService.logIn,
    onSuccess: response => {
      const {
        data: { accessToken }
      } = response

      if (accessToken) {
        accessTokenStorage.set(accessToken)
      }

      queryClient.invalidateQueries({ queryKey: authKeys.user() })
    }
  })
}

export const useLoginWithGoogle = () =>
  useMutation({
    mutationFn: async () => {
      // Temporary implementation until Google OAuth is implemented
      throw new Error('Google login not implemented for backend API yet')
    },
    meta: {
      // When implemented, this will invalidate queries to refetch user data
      invalidatesQueries: authKeys.user()
    }
  })

export const useUserSignupWithEmail = () =>
  useMutation({
    mutationFn: authService.signUp,
    onSuccess: response => {
      const {
        data: { accessToken }
      } = response

      if (accessToken) {
        accessTokenStorage.set(accessToken)
      }
    }
  })

export const useUserSignupWithGoogle = () =>
  useMutation({
    mutationFn: async () => {
      // Temporary implementation until Google OAuth is implemented
      throw new Error('Google signup not implemented for backend API yet')
    },
    meta: {
      // When implemented, this will invalidate queries to refetch user data
      invalidatesQueries: authKeys.user()
    }
  })

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authService.logOut,
    meta: {
      invalidatesQueries: authKeys.all()
    },
    onSuccess: () => {
      accessTokenStorage.clear()
      // Set user data to null for immediate UI update
      queryClient.setQueryData(authKeys.user(), null)
      // Also remove the query entirely to prevent cached 401 errors
      queryClient.removeQueries({ queryKey: authKeys.user() })
    }
  })
}

export const useVerifyEmail = ({ onSuccess, onError, onSettled }) =>
  useMutation({
    mutationFn: authService.verifyEmail,
    onSuccess: (data, variables, context) => {
      const { accessToken } = data

      if (accessToken) {
        accessTokenStorage.set(accessToken)
      }

      onSuccess?.(data, variables, context)
    },
    onError,
    onSettled,
    meta: {
      invalidatesQueries: authKeys.user()
    }
  })

export const useResendVerificationEmail = () =>
  useMutation({
    mutationFn: authService.resendVerificationEmail
  })

export const useRequestPasswordReset = () =>
  useMutation({
    mutationFn: authService.requestPasswordReset
  })

export const useResetPassword = () =>
  useMutation({
    mutationFn: authService.resetPassword
  })

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userService.updateUser,
    onMutate: async newUserData => {
      // Cancel any in-flight queries for the user
      await queryClient.cancelQueries({ queryKey: authKeys.user() })

      // Snapshot the previous user data
      const previousUser = queryClient.getQueryData(authKeys.user())

      // Optimistically update the user data
      queryClient.setQueryData(authKeys.user(), data => {
        if (!data) {
          return data
        }

        // Handle both direct user object and wrapped response
        const currentUser = data.user || data
        const updatedUser = {
          ...currentUser,
          ...newUserData
        }

        // Maintain the same structure as the original data
        return data.user ? { ...data, user: updatedUser } : updatedUser
      })

      // Return context with snapshot for potential rollback
      return { previousUser }
    },
    onError: (_error, _newUserData, context) => {
      // Rollback to the previous user data on error
      if (context?.previousUser) {
        queryClient.setQueryData(authKeys.user(), context.previousUser)
      }
    },
    meta: {
      invalidatesQueries: authKeys.user()
    }
  })
}
