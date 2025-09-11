import './styles.scss'

import { useNavigate } from 'react-router-dom'

import { LoginPrompt } from '@/components/prompts'
import { useRequestPasswordReset, useResetPassword } from '@/hooks/useAuth'
import useLocale from '@/hooks/useLocale'
import useNotifications from '@/hooks/useNotifications'
import useUrlParams from '@/hooks/useUrlParams'

import EmailForm from './EmailForm'
import PasswordForm from './PasswordForm'

const ResetPassword = () => {
  const { t } = useLocale()
  const { showSuccessToast, showErrorToast } = useNotifications()
  const navigate = useNavigate()
  const { token } = useUrlParams(['token'])
  const { mutate: requestPasswordReset, isPending: isRequestPending } =
    useRequestPasswordReset()
  const { mutate: resetPassword, isPending: isResetPending } =
    useResetPassword()

  const isRequest = !token

  const handleRequestPasswordReset = data => {
    requestPasswordReset(data, {
      onSuccess: () => {
        showSuccessToast(t('password.reset.request.success'))
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
