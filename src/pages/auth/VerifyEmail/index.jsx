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
    onEmptyToken: () => {
      showErrorToast(t('email.verification.error.invalidToken'))
      navigate('/')
    },
    onSuccess: () => showSuccessToast(t('email.verification.success')),
    onError: err => showErrorToast(t(toTranslationKey(err))),
    onSettled: () => navigate('/')
  })

  return <Spinner />
}

export default VerifyEmail
