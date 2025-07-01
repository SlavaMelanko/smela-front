import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Spinner } from '@/components/Spinner'
import useAuth from '@/hooks/useAuth'
import useLocale from '@/hooks/useLocale'
import useNotifications from '@/hooks/useNotifications'
import useVerifyEmail from '@/hooks/useVerifyEmail'

const VerifyEmail = () => {
  const { t } = useLocale()
  const navigate = useNavigate()
  const { loading, error, status } = useVerifyEmail()
  const { showSuccessToast, showErrorToast } = useNotifications()
  const { refreshUser } = useAuth()

  useEffect(() => {
    if (status === 'success') {
      refreshUser()
      navigate('/')
      showSuccessToast(t('verifyEmail.success'))
    }

    if (error) {
      navigate('/signup')
      showErrorToast(t('verifyEmail.error.generic'))
    }
  }, [
    navigate,
    refreshUser,
    showErrorToast,
    showSuccessToast,
    status,
    error,
    t
  ])

  if (loading) {
    return <Spinner centered />
  }

  if (error) {
    return <div>{t('verifyEmail.error.generic')}</div>
  }

  return <div>{t('verifyEmail.loading')}</div>
}

export default VerifyEmail
