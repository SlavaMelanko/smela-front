import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import Spinner from '@/components/Spinner'
import { useVerifyEmail } from '@/hooks/useAuth'
import useLocale from '@/hooks/useLocale'
import useNotifications from '@/hooks/useNotifications'
import { toTranslationKey } from '@/services/catch'

const VerifyEmail = () => {
  const { t } = useLocale()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { showSuccessToast, showErrorToast } = useNotifications()
  const { mutate: verifyEmail } = useVerifyEmail()
  const hasVerified = useRef(false)

  useEffect(() => {
    if (hasVerified.current) {
      return
    }

    hasVerified.current = true

    const token = params.get('token')

    verifyEmail(token, {
      onSuccess: () => {
        showSuccessToast(t('email.verification.success'))
        navigate('/')
      },
      onError: err => {
        showErrorToast(t(toTranslationKey(err)))
        navigate('/signup')
      }
    })
  }, [params, verifyEmail, showSuccessToast, showErrorToast, t, navigate])

  return <Spinner centered />
}

export default VerifyEmail
