import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Spinner from '@/components/Spinner'
import useLocale from '@/hooks/useLocale'
import useNotifications from '@/hooks/useNotifications'
import useUrlParams from '@/hooks/useUrlParams'
import useVerifyEmailOnce from '@/hooks/useVerifyEmailOnce'
import { toTranslationKey } from '@/services/catch'

const VerifyEmail = () => {
  const { t } = useLocale()
  const { showErrorToast, showSuccessToast } = useNotifications()
  const navigate = useNavigate()
  const { token } = useUrlParams(['token'])

  useVerifyEmailOnce(token, {
    onSuccess: () => {
      showSuccessToast(t('email.verification.success'))
    },
    onError: error => {
      showErrorToast(t(toTranslationKey(error)))
    },
    onSettled: () => {
      navigate('/')
    }
  })

  useEffect(() => {
    if (!token) {
      showErrorToast(t('email.verification.error.invalidToken'))
      navigate('/')
    }
  }, [token, showErrorToast, t, navigate])

  return <Spinner centered />
}

export default VerifyEmail
