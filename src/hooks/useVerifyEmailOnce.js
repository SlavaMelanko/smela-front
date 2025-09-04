import { useEffect, useRef } from 'react'

import { useVerifyEmail } from './useAuth'

const useVerifyEmailOnce = (token, options) => {
  const hasVerified = useRef(false)
  const verifyEmailMutation = useVerifyEmail()
  const { mutate: verifyEmail } = verifyEmailMutation

  useEffect(() => {
    if (hasVerified.current || !token) {
      return
    }

    hasVerified.current = true

    verifyEmail(token, options)
  }, [token, verifyEmail, options])

  return {
    isPending: verifyEmailMutation.isPending,
    isError: verifyEmailMutation.isError,
    isSuccess: verifyEmailMutation.isSuccess,
    error: verifyEmailMutation.error,
    data: verifyEmailMutation.data
  }
}

export default useVerifyEmailOnce
