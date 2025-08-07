import { createContext, useCallback, useMemo } from 'react'

import {
  useCurrentUser,
  useLogin,
  useLogout,
  useRequestPasswordReset,
  useResendVerificationEmail,
  useResetPassword,
  useSignup,
  useVerifyEmail
} from '@/hooks/useAuth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const {
    data: user,
    isLoading: isUserLoading,
    error,
    refetch: refreshUser
  } = useCurrentUser()
  const loginMutation = useLogin()
  const signupMutation = useSignup()
  const logoutMutation = useLogout()
  const verifyEmailMutation = useVerifyEmail()
  const resendVerificationEmailMutation = useResendVerificationEmail()
  const requestPasswordResetMutation = useRequestPasswordReset()
  const resetPasswordMutation = useResetPassword()

  // General loading indicator for all auth operations.
  const isLoading =
    isUserLoading ||
    loginMutation.isPending ||
    signupMutation.isPending ||
    logoutMutation.isPending ||
    verifyEmailMutation.isPending ||
    resendVerificationEmailMutation.isPending ||
    requestPasswordResetMutation.isPending ||
    resetPasswordMutation.isPending

  const logIn = useCallback(
    async (email, password) => {
      await loginMutation.mutateAsync({ email, password })
    },
    [loginMutation]
  )

  const logInWithGoogle = useCallback(async () => {
    throw new Error('Google login not implemented for backend API yet')
  }, [])

  const signUp = useCallback(
    async userData => {
      await signupMutation.mutateAsync(userData)
    },
    [signupMutation]
  )

  const signUpWithGoogle = useCallback(async () => {
    throw new Error('Google signup not implemented for backend API yet')
  }, [])

  const logOut = useCallback(async () => {
    await logoutMutation.mutateAsync()
  }, [logoutMutation])

  const verifyEmail = useCallback(
    async token => {
      await verifyEmailMutation.mutateAsync(token)
    },
    [verifyEmailMutation]
  )

  const resendVerificationEmail = useCallback(async () => {
    await resendVerificationEmailMutation.mutateAsync(user?.email)
  }, [resendVerificationEmailMutation, user])

  const requestPasswordReset = useCallback(
    async email => {
      await requestPasswordResetMutation.mutateAsync(email)
    },
    [requestPasswordResetMutation]
  )

  const resetPassword = useCallback(
    async (token, password) => {
      await resetPasswordMutation.mutateAsync({ token, password })
    },
    [resetPasswordMutation]
  )

  const value = useMemo(
    () => ({
      user,
      isLoading,
      error,
      isAuthenticated: !!user,
      logIn,
      logInWithGoogle,
      signUp,
      signUpWithGoogle,
      logOut,
      refreshUser,
      verifyEmail,
      resendVerificationEmail,
      requestPasswordReset,
      resetPassword
    }),
    [
      user,
      isLoading,
      error,
      logIn,
      logInWithGoogle,
      signUp,
      signUpWithGoogle,
      logOut,
      refreshUser,
      verifyEmail,
      resendVerificationEmail,
      requestPasswordReset,
      resetPassword
    ]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
