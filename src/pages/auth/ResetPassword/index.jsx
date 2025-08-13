import './styles.scss'

import { useNavigate, useSearchParams } from 'react-router-dom'

import { LoginPrompt } from '@/components/prompts'
import { useRequestPasswordReset, useResetPassword } from '@/hooks/useAuth'
import useLocale from '@/hooks/useLocale'
import useNotifications from '@/hooks/useNotifications'

import EmailForm from './EmailForm'
import PasswordForm from './PasswordForm'

const ResetPassword = () => {
  const { t } = useLocale()
  const { showSuccessToast, showErrorToast } = useNotifications()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const { mutate: requestPasswordReset, isPending: isRequestPending } =
    useRequestPasswordReset()
  const { mutate: resetPassword, isPending: isResetPending } =
    useResetPassword()

  const token = params.get('token')
  const isRequest = !token

  const handleRequestPasswordReset = ({ email, reset }) => {
    requestPasswordReset(email, {
      onSuccess: () => {
        showSuccessToast(t('password.reset.request.success'))

        if (reset) {
          reset()
        }
      },
      onError: () => {
        showErrorToast(t('error.unknown'))
      }
    })
  }

  const handleResetPassword = ({ newPassword }) => {
    resetPassword(
      { token, password: newPassword },
      {
        onSuccess: () => {
          showSuccessToast(t('password.reset.set.success'))
          navigate('/login')
        },
        onError: () => {
          showErrorToast(t('password.reset.set.error'))
        }
      }
    )
  }

  return (
    <div className='reset-password-page'>
      <p className='reset-password-page__description'>
        {isRequest
          ? t('password.reset.request.description')
          : t('password.reset.set.description')}
      </p>

      {isRequest ? (
        <EmailForm
          onSubmit={handleRequestPasswordReset}
          isLoading={isRequestPending}
        />
      ) : (
        <PasswordForm
          onSubmit={handleResetPassword}
          isLoading={isResetPending}
        />
      )}

      <div className='reset-password-page__prompts'>
        <LoginPrompt question={t('password.reset.loginPrompt')} />
      </div>
    </div>
  )
}

export default ResetPassword
