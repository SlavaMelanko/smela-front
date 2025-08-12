import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import Spinner from '@/components/Spinner'
import useAuth from '@/hooks/useAuth'
import useLocale from '@/hooks/useLocale'
import useNotifications from '@/hooks/useNotifications'
import useVerifyEmail from '@/hooks/useVerifyEmail'
import { verifyEmail } from '@/services/firebase'

const VerifyEmail = () => {
  const { t } = useLocale()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { showSuccessToast, showErrorToast } = useNotifications()
  const { refreshUser } = useAuth()

  const oobCode = searchParams.get('oobCode')
  const { isLoading, isError, isSuccess } = useVerifyEmail(() =>
    verifyEmail(oobCode)
  )

  useEffect(() => {
    if (isSuccess) {
      refreshUser()
      navigate('/')
      showSuccessToast(t('email.verification.success'))
    }

    if (isError) {
      navigate('/signup')
      showErrorToast(t('email.verification.error'))
    }
  }, [
    navigate,
    refreshUser,
    showErrorToast,
    showSuccessToast,
    isSuccess,
    isError,
    t
  ])

  if (isLoading) {
    return <Spinner centered />
  }

  if (isError) {
    return <div>{t('email.verification.error')}</div>
  }

  return <div>{t('email.verification.loading')}</div>
}

export default VerifyEmail
