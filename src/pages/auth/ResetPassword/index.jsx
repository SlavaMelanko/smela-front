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
      await confirmNewPassword(oobCode, newPassword)
      navigate('/login')

      showSuccessToast(t('password.reset.set.success'))
    } catch {
      showErrorToast(t('password.reset.set.error'))
    }
  }

  return (
    <div className='reset-password-page'>
      <p className='reset-password-page__description'>
        {isStarting
          ? t('password.reset.request.description')
          : t('password.reset.set.description')}
      </p>

      {isStarting ? (
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
