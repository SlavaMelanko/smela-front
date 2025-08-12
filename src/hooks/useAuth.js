import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { StatusCodes } from 'http-status-codes'
import { useContext } from 'react'

import AuthContext from '@/contexts/AuthContext'
import { authService, userService } from '@/services/backend'

// Context hook.
const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

// Query keys.
export const authKeys = {
  all: ['auth'],
  user: () => [...authKeys.all, 'user']
}

// React Query hooks.
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: async () => {
      try {
        const { user } = await userService.getCurrentUser()

        return user
      } catch (error) {
        if (error?.status === StatusCodes.UNAUTHORIZED) {
          return null
        }

        throw error
      }
    }
  })
}

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ email, password }) => authService.login(email, password),
    onSuccess: ({ user }) => {
      // If login returns user data, set it immediately.
      if (user) {
        queryClient.setQueryData(authKeys.user(), user)
      }

      // Still invalidate to ensure fresh data.
      queryClient.invalidateQueries({ queryKey: authKeys.user() })
    }
  })
}

export const useSignup = () => {
  return useMutation({
    mutationFn: userData => authService.signup(userData),
    onSuccess: () => {
      // Do not set user data immediately - user must verify email first.
      // The backend /api/v1/me endpoint requires verified status.
      // No invalidation needed - user must verify email before accessing /me endpoint.
    }
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.user(), null)
      queryClient.invalidateQueries({ queryKey: authKeys.all })
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

export default useAuth
