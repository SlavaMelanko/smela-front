import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import Spinner from '@/components/Spinner'
import { useVerifyEmail } from '@/hooks/useAuth'
import useLocale from '@/hooks/useLocale'
import useNotifications from '@/hooks/useNotifications'

const VerifyEmail = () => {
  const { t } = useLocale()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { showSuccessToast, showErrorToast } = useNotifications()
  const {
    isPending,
    isError,
    isSuccess,
    mutate: verifyEmail
  } = useVerifyEmail()
  const hasVerified = useRef(false)

  const token = params.get('token')

  useEffect(() => {
    // Prevent double execution in StrictMode and when effect re-runs.
    if (!token || hasVerified.current || isPending) {
      return
    }

    hasVerified.current = true

    verifyEmail(token)
  }, [token, verifyEmail, isPending])

  useEffect(() => {
    if (isSuccess) {
      showSuccessToast(t('email.verification.success'))
      navigate('/')
    }

    if (isError) {
      showErrorToast(t('email.verification.error'))
      navigate('/signup')
    }
  }, [navigate, showErrorToast, showSuccessToast, isSuccess, isError, t])

  if (isPending) {
    return <Spinner centered />
  }

  if (isError) {
    return <div>{t('email.verification.error')}</div>
  }

  return <div>{t('email.verification.loading')}</div>
}

export default VerifyEmail
