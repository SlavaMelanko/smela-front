import { useEffect, useRef } from 'react'

import { useVerifyEmail } from './useAuth'

const useVerifyEmailOnce = (token, options) => {
  const hasVerified = useRef(false)
  const {
    isPending,
    isError,
    error,
    isSuccess,
    data,
    mutate: verifyEmail
  } = useVerifyEmail(options)

  useEffect(() => {
    if (hasVerified.current || !token) {
      return
    }

    hasVerified.current = true

    verifyEmail(token)
  }, [token, verifyEmail])

  return {
    isPending,
    isError,
    error,
    isSuccess,
    data
  }
}

export default useVerifyEmailOnce
