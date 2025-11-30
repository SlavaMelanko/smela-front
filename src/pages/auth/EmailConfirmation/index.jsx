import './styles.scss'

import { useLocation } from 'react-router-dom'

import { useCurrentUser, useResendVerificationEmail } from '@/hooks/useAuth'
import useCaptcha from '@/hooks/useCaptcha'
import useLocale from '@/hooks/useLocale'
import useNotifications from '@/hooks/useNotifications'
import useTheme from '@/hooks/useTheme'
import { toTranslationKey } from '@/services/catch'

import EmailConfirmationForm from './Form'

const EmailConfirmation = () => {
  const { t, locale } = useLocale()
  const { theme } = useTheme()
  const location = useLocation()
  const { mutate: resendVerificationEmail, isPending } =
    useResendVerificationEmail()
  const { showSuccessToast, showErrorToast } = useNotifications()
  const { user } = useCurrentUser()
  const { getToken, Captcha } = useCaptcha()

  const userEmail = location.state?.email || user?.email

  const handleSubmit = async data => {
    const token = await getToken()

    if (!token) {
      showErrorToast(t('captcha.error'))

      return
    }

    const preferences = { locale, theme }

    resendVerificationEmail(
      { data, captcha: { token }, preferences },
      {
        onSuccess: () => {
          showSuccessToast(t('email.confirmation.success'))
        },
        onError: err => {
          showErrorToast(t(toTranslationKey(err)))
        }
      }
    )
  }

  return (
    <div className='email-confirmation-page'>
      <div className='email-confirmation-page__content'>
        <h1 className='email-confirmation-page__title'>
          {t('email.confirmation.title')}
        </h1>

        <p className='email-confirmation-page__description'>
          {t('email.confirmation.description', {
            email: userEmail || t('email.confirmation.yourEmail')
          })}
        </p>
      </div>

      <EmailConfirmationForm
        isLoading={isPending}
        userEmail={userEmail}
        onSubmit={handleSubmit}
      />

      {Captcha}
    </div>
  )
}

export default EmailConfirmation
