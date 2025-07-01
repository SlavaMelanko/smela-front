import './styles.scss'

import { useNavigate, useSearchParams } from 'react-router-dom'

import { LoginPrompt } from '@/components/prompts'
import useLocale from '@/hooks/useLocale'
import useNotifications from '@/hooks/useNotifications'
import { confirmNewPassword, sendPasswordResetLink } from '@/services/firebase'

import EmailForm from './EmailForm'
import PasswordForm from './PasswordForm'

const ResetPassword = () => {
  const { t } = useLocale()
  const { showSuccessToast, showErrorToast } = useNotifications()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const oobCode = params.get('oobCode')

  const isStarting = !oobCode

  const handleSendResetLink = async ({ email, reset }) => {
    try {
      await sendPasswordResetLink(email)
      showSuccessToast(t('resetPassword.success'))

      if (reset) {
        reset()
      }
    } catch {
      showErrorToast(t('error.unknown'))
    }
  }

  const handleCompleteReset = async ({ newPassword }) => {
    try {
      await confirmNewPassword(oobCode, newPassword)
      navigate('/login')

      showSuccessToast(t('resetPassword.resetSuccess'))
    } catch {
      showErrorToast(t('resetPassword.error'))
    }
  }

  return (
    <div className='reset-password-page'>
      <p className='reset-password-page__description'>
        {isStarting
          ? t('resetPassword.description')
          : t('resetPassword.newPassword')}
      </p>

      {isStarting ? (
        <EmailForm onSubmit={handleSendResetLink} />
      ) : (
        <PasswordForm onSubmit={handleCompleteReset} />
      )}

      <div className='reset-password-page__prompts'>
        <LoginPrompt question={t('resetPassword.loginPrompt')} />
      </div>
    </div>
  )
}

export default ResetPassword
