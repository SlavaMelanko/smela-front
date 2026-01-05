import { useEffect, useRef } from 'react'

import { useVerifyEmail } from './useAuth'

/**
 * Handles email verification with StrictMode-safe guards.
 * Automatically handles empty token case and prevents double execution.
 */
const useVerifyEmailOnce = (
  token,
  { onEmptyToken, onSuccess, onError, onSettled }
) => {
  const { mutate: verifyEmail, isIdle } = useVerifyEmail()
  const hasHandledEmptyToken = useRef(false)

  useEffect(() => {
    // Handle empty token case (no API call needed)
    if (!token && !hasHandledEmptyToken.current) {
      hasHandledEmptyToken.current = true
      onEmptyToken?.()
    }
  }, [token, onEmptyToken])

  useEffect(() => {
    // Only verify if we have a token and mutation hasn't started yet
    if (!token || !isIdle) {
      return
    }

    verifyEmail({ data: { token } }, { onSuccess, onError, onSettled })
  }, [token, verifyEmail, isIdle, onSuccess, onError, onSettled])
}

export default useVerifyEmailOnce
