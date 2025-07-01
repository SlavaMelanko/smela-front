import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { verifyEmail } from '@/services/firebase'

/**
 * Custom hook to handle email verification process
 * Uses Firebase's email verification system with an oobCode (out-of-band code)
 *
 * @returns {Object} Object containing:
 *   - loading: boolean indicating if verification is in progress
 *   - error: boolean indicating if verification failed
 *   - status: string ('pending' | 'success' | 'error') indicating current verification state
 */
export const useVerifyEmail = () => {
  const [searchParams] = useSearchParams()
  const oobCode = searchParams.get('oobCode')

  const [status, setStatus] = useState('pending')

  // useRef is used here for two purposes:
  // 1. hasRun: prevents multiple verification attempts by persisting across re-renders
  //    Unlike state, changing ref doesn't trigger re-render
  // 2. isMounted: tracks component mount state to prevent state updates after unmount
  //    This prevents memory leaks and "setState on unmounted component" warnings
  // Link to the problem: https://stackoverflow.com/q/72601834
  const hasRun = useRef(false)
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true

    const runValidation = async () => {
      if (!oobCode) {
        if (isMounted.current) {
          setStatus('error')
        }

        return
      }

      try {
        const response = await verifyEmail(oobCode)

        if (response.success && isMounted.current) {
          setStatus('success')
        } else if (isMounted.current) {
          setStatus('error')
        }
      } catch (error) {
        console.error('[verifyEmail] Error during verification:', error)

        if (isMounted.current) {
          setStatus('error')
        }
      }
    }

    runValidation()
  }, [oobCode])

  const loading = status === 'pending'
  const error = status === 'error'

  return { loading, error, status }
}

export default useVerifyEmail
