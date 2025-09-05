import { useEffect, useRef } from 'react'

import { useVerifyEmail } from './useAuth'

const useVerifyEmailOnce = (token, options) => {
  const hasVerified = useRef(false)
  const { mutate: verifyEmail } = useVerifyEmail(options)

  useEffect(() => {
    if (hasVerified.current || !token) {
      return
    }

    hasVerified.current = true

    verifyEmail(token)
  }, [token, verifyEmail])
}

export default useVerifyEmailOnce
