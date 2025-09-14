import './styles.scss'

import { useLocation } from 'react-router-dom'

import { useCurrentUser, useResendVerificationEmail } from '@/hooks/useAuth'
import useLocale from '@/hooks/useLocale'
import useNotifications from '@/hooks/useNotifications'
import { toTranslationKey } from '@/services/catch'

import EmailConfirmationForm from './Form'

const EmailConfirmation = () => {
  const { t } = useLocale()
  const location = useLocation()
  const { mutate: resendVerificationEmail, isPending } =
    useResendVerificationEmail()
  const { showSuccessToast, showErrorToast } = useNotifications()
  const { user } = useCurrentUser()

  const userEmail = location.state?.email || user?.email

  const handleSubmit = data => {
    if (!data.captchaToken) {
      showErrorToast(t('captcha.error'))

      return
    }

    resendVerificationEmail(data, {
      onSuccess: () => {
        showSuccessToast(t('email.confirmation.success'))
      },
      onError: err => {
        showErrorToast(t(toTranslationKey(err)))
      }
    })
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
    </div>
  )
}

export default EmailConfirmation
