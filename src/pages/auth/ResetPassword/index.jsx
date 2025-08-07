import './styles.scss'

import { useNavigate, useSearchParams } from 'react-router-dom'

import { LoginPrompt } from '@/components/prompts'
import useAuth from '@/hooks/useAuth'
import useLocale from '@/hooks/useLocale'
import useNotifications from '@/hooks/useNotifications'

import EmailForm from './EmailForm'
import PasswordForm from './PasswordForm'

const ResetPassword = () => {
  const { t } = useLocale()
  const { requestPasswordReset, resetPassword } = useAuth()
  const { showSuccessToast, showErrorToast } = useNotifications()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const token = params.get('token')

  const isRequest = !token

  const handleSendResetLink = async ({ email, reset }) => {
    try {
      await requestPasswordReset(email)
      showSuccessToast(t('password.reset.request.success'))

      if (reset) {
        reset()
      }
    } catch {
      showErrorToast(t('error.unknown'))
    }
  }

  const handleCompleteReset = async ({ newPassword }) => {
    try {
      await resetPassword(token, newPassword)
      navigate('/login')

      showSuccessToast(t('password.reset.set.success'))
    } catch {
      showErrorToast(t('password.reset.set.error'))
    }
  }

  return (
    <div className='reset-password-page'>
      <p className='reset-password-page__description'>
        {isRequest
          ? t('password.reset.request.description')
          : t('password.reset.set.description')}
      </p>

      {isRequest ? (
        <EmailForm onSubmit={handleSendResetLink} />
      ) : (
        <PasswordForm onSubmit={handleCompleteReset} />
      )}

      <div className='reset-password-page__prompts'>
        <LoginPrompt question={t('password.reset.loginPrompt')} />
      </div>
    </div>
  )
}

export default ResetPassword
