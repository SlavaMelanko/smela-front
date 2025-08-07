import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'

import AuthContext from '@/contexts/AuthContext'
import { authService, userService } from '@/services/backend'

// Context hook
const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

// Query keys
export const authKeys = {
  all: ['auth'],
  user: () => [...authKeys.all, 'user']
}

// React Query hooks
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: async () => {
      try {
        const user = await userService.getCurrentUser()

        return user
      } catch (error) {
        if (error?.status === 401) {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.user() })
    }
  })
}

export const useSignup = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userData => authService.signup(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.user() })
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
