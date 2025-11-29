import './styles.scss'

import { useNavigate } from 'react-router-dom'

import { LoginPrompt } from '@/components/prompts'
import { useRequestPasswordReset, useResetPassword } from '@/hooks/useAuth'
import useLocale from '@/hooks/useLocale'
import useNotifications from '@/hooks/useNotifications'
import useTheme from '@/hooks/useTheme'
import useUrlParams from '@/hooks/useUrlParams'

import EmailForm from './EmailForm'
import PasswordForm from './PasswordForm'

const ResetPassword = () => {
  const { t, locale } = useLocale()
  const { theme } = useTheme()
  const { showSuccessToast, showErrorToast } = useNotifications()
  const navigate = useNavigate()
  const { token } = useUrlParams(['token'])
  const { mutate: requestPasswordReset, isPending: isRequestPending } =
    useRequestPasswordReset()
  const { mutate: resetPassword, isPending: isResetPending } =
    useResetPassword()

  const isRequest = !token
  const preferences = { locale, theme }

  const handleRequestPasswordReset = payload => {
    if (!payload.captcha?.token) {
      showErrorToast(t('captcha.error'))

      return
    }

    requestPasswordReset(payload, {
      onSuccess: () => {
        showSuccessToast(t('password.reset.request.success'))
      },
      onError: () => {
        showErrorToast(t('error.unknown'))
      }
    })
  }

  const handleResetPassword = payload => {
    resetPassword(
      { data: { token, password: payload.data.newPassword } },
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
          isLoading={isRequestPending}
          preferences={preferences}
          onSubmit={handleRequestPasswordReset}
        />
      ) : (
        <PasswordForm
          isLoading={isResetPending}
          onSubmit={handleResetPassword}
        />
      )}

      <div className='reset-password-page__prompts'>
        <LoginPrompt question={t('password.reset.loginPrompt')} />
      </div>
    </div>
  )
}

export default ResetPassword
