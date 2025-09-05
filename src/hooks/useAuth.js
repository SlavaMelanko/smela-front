import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'

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

export const useLogin = () =>
  useMutation({
    mutationFn: ({ email, password }) => authService.logIn(email, password),
    meta: {
      invalidatesQueries: authKeys.user()
    }
  })

export const useLoginWithGoogle = () =>
  useMutation({
    mutationFn: async () => {
      // Temporary implementation until Google OAuth is implemented.
      throw new Error('Google login not implemented for backend API yet')
    },
    meta: {
      // When implemented, this will invalidate queries to refetch user data.
      invalidatesQueries: authKeys.user()
    }
  })

export const useSignup = () =>
  useMutation({
    mutationFn: userData => authService.signUp(userData)
  })

export const useSignupWithGoogle = () =>
  useMutation({
    mutationFn: async () => {
      // Temporary implementation until Google OAuth is implemented.
      throw new Error('Google signup not implemented for backend API yet')
    },
    meta: {
      // When implemented, this will invalidate queries to refetch user data.
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
      // Set user data to null for immediate UI update.
      queryClient.setQueryData(authKeys.user(), null)
      // Also remove the query entirely to prevent cached 401 errors.
      queryClient.removeQueries({ queryKey: authKeys.user() })
    }
  })
}

export const useVerifyEmail = ({ onSuccess, onError, onSettled }) =>
  useMutation({
    mutationFn: token => authService.verifyEmail(token),
    onSuccess,
    onError,
    onSettled,
    meta: {
      invalidatesQueries: authKeys.user()
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

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userData => userService.updateUser(userData),
    onMutate: async newUserData => {
      // Cancel any in-flight queries for the user.
      await queryClient.cancelQueries({ queryKey: authKeys.user() })

      // Snapshot the previous user data.
      const previousUser = queryClient.getQueryData(authKeys.user())

      // Optimistically update the user data.
      queryClient.setQueryData(authKeys.user(), data => {
        if (!data) {
          return data
        }

        // Handle both direct user object and wrapped response.
        const currentUser = data.user || data
        const updatedUser = {
          ...currentUser,
          ...newUserData
        }

        // Maintain the same structure as the original data.
        return data.user ? { ...data, user: updatedUser } : updatedUser
      })

      // Return context with snapshot for potential rollback.
      return { previousUser }
    },
    onError: (_error, _newUserData, context) => {
      // Rollback to the previous user data on error.
      if (context?.previousUser) {
        queryClient.setQueryData(authKeys.user(), context.previousUser)
      }
    },
    meta: {
      invalidatesQueries: authKeys.user()
    }
  })
}
