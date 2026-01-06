import { useNavigate } from 'react-router-dom'

import { LoginPrompt } from '@/components/prompts'
import { useRequestPasswordReset, useResetPassword } from '@/hooks/useAuth'
import useCaptcha from '@/hooks/useCaptcha'
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
  const { token: urlToken } = useUrlParams(['token'])
  const { mutate: requestPasswordReset, isPending: isRequestPending } =
    useRequestPasswordReset()
  const { mutate: resetPassword, isPending: isResetPending } =
    useResetPassword()
  const { getToken, Captcha } = useCaptcha()

  const isRequest = !urlToken

  const handleRequestPasswordReset = async data => {
    const token = await getToken()

    if (!token) {
      showErrorToast(t('captcha.error'))

      return
    }

    const preferences = { locale, theme }

    requestPasswordReset(
      { data, captcha: { token }, preferences },
      {
        onSuccess: () => {
          showSuccessToast(t('password.reset.request.success'))
        },
        onError: () => {
          showErrorToast(t('error.unknown'))
        }
      }
    )
  }

  const handleResetPassword = data => {
    resetPassword(
      { data: { token: urlToken, password: data.newPassword } },
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
    <>
      <div className='flex flex-col gap-8'>
        <p className='text-base text-center text-muted-foreground'>
          {isRequest
            ? t('password.reset.request.description')
            : t('password.reset.set.description')}
        </p>

        {isRequest ? (
          <EmailForm
            isLoading={isRequestPending}
            onSubmit={handleRequestPasswordReset}
          />
        ) : (
          <PasswordForm
            isLoading={isResetPending}
            onSubmit={handleResetPassword}
          />
        )}

        <LoginPrompt question={t('password.reset.rememberYourPassword')} />
      </div>

      {Captcha}
    </>
  )
}

export default ResetPassword
