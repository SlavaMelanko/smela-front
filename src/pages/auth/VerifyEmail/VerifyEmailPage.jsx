import { useNavigate } from 'react-router-dom'

import { Spinner } from '@/components/Spinner'
import useLocale from '@/hooks/useLocale'
import useToast from '@/hooks/useToast'
import useUrlParams from '@/hooks/useUrlParams'
import useVerifyEmailOnce from '@/hooks/useVerifyEmailOnce'
import { toTranslationKey } from '@/services/catch'

export const VerifyEmailPage = () => {
  const { t } = useLocale()
  const { showErrorToast, showSuccessToast } = useToast()
  const navigate = useNavigate()
  const { token } = useUrlParams(['token'])

  useVerifyEmailOnce(token, {
    onSettled: (data, error) => {
      if (data?.user) {
        showSuccessToast(t('email.verification.success'))
      }

      if (error) {
        showErrorToast(t(toTranslationKey(error)))
      }

      navigate('/')
    }
  })

  return <Spinner />
}
