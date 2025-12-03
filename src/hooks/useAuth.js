import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { accessTokenStorage } from '@/lib/storage'
import { authService, userService } from '@/services/backend'
import { clearUser, setUser } from '@/services/errorTracker'

export const authKeys = {
  all: () => ['auth'],
  user: () => [...authKeys.all(), 'user']
}

export const useCurrentUser = () => {
  const hasAccessToken = !!accessTokenStorage.get()

  const query = useQuery({
    queryKey: authKeys.user(),
    queryFn: userService.getCurrentUser,
    select: data => data.user,
    enabled: hasAccessToken
  })

  return {
    isPending: hasAccessToken ? query.isPending : false,
    isFetching: query.isFetching,
    isError: hasAccessToken ? query.isError : false,
    error: query.error,
    isSuccess: hasAccessToken ? query.isSuccess : false,
    user: query.data ?? null,
    isAuthenticated: !!query.data
  }
}

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authService.logIn,
    onSuccess: data => {
      accessTokenStorage.set(data.accessToken)

      if (data?.user) {
        const user = data.user

        queryClient.setQueryData(authKeys.user(), { user })

        setUser(user)
      } else {
        // No user in response, fetch from /me endpoint
        queryClient.invalidateQueries({ queryKey: authKeys.user() })
      }
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

export const useUserSignupWithEmail = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authService.signUp,
    onSuccess: data => {
      accessTokenStorage.set(data.accessToken)

      if (data?.user) {
        const user = data.user

        queryClient.setQueryData(authKeys.user(), { user })

        setUser(user)
      } else {
        // No user in response, fetch from /me endpoint
        queryClient.invalidateQueries({ queryKey: authKeys.user() })
      }
    }
  })
}

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
      accessTokenStorage.remove()

      queryClient.removeQueries({ queryKey: authKeys.user() })

      clearUser()
    }
  })
}

export const useVerifyEmail = ({ onSuccess, onError, onSettled }) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authService.verifyEmail,
    onSuccess: (data, ...args) => {
      accessTokenStorage.set(data.accessToken)

      if (data?.user) {
        const user = data.user

        queryClient.setQueryData(authKeys.user(), { user })

        setUser(user)
      } else {
        // No user in response, fetch from /me endpoint
        queryClient.invalidateQueries({ queryKey: authKeys.user() })
      }

      // Call the original onSuccess callback if provided
      onSuccess?.(data, ...args)
    },
    onError,
    onSettled
  })
}

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
      queryClient.setQueryData(authKeys.user(), cachedUser => {
        if (!cachedUser) {
          return cachedUser
        }

        return {
          ...cachedUser,
          ...newUserData
        }
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
