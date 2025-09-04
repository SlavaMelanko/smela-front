import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import Spinner from '@/components/Spinner'
import useLocale from '@/hooks/useLocale'
import useNotifications from '@/hooks/useNotifications'
import useVerifyEmailOnce from '@/hooks/useVerifyEmailOnce'

const VerifyEmail = () => {
  const { t } = useLocale()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { showErrorToast } = useNotifications()

  const token = params.get('token')

  const { isPending } = useVerifyEmailOnce(token)

  useEffect(() => {
    if (!token) {
      showErrorToast(t('email.verification.error.invalidToken'))

      const timeoutId = setTimeout(() => {
        navigate('/')
      }, 1500)

      return () => clearTimeout(timeoutId)
    }
  }, [token, showErrorToast, t, navigate])

  if (isPending) {
    return <Spinner centered />
  }

  return <Spinner centered />
}

export default VerifyEmail
