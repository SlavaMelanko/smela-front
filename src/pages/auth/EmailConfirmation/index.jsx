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
  const { user } = useCurrentUser()
  const { mutate: resendVerificationEmail, isPending } =
    useResendVerificationEmail()
  const { showSuccessToast, showErrorToast } = useNotifications()

  // Get email from navigation state (from signup) or from user if already authenticated.
  const userEmail = location.state?.email || user?.email

  const handleSubmit = ({ reset }) => {
    resendVerificationEmail(userEmail, {
      onSuccess: () => {
        showSuccessToast(t('email.confirmation.success'))

        if (reset) {
          reset()
        }
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

        <p className='email-confirmation-page__message'>
          {t('email.confirmation.description', {
            email: userEmail || t('email.confirmation.yourEmail')
          })}
        </p>
      </div>

      {userEmail && (
        <EmailConfirmationForm onSubmit={handleSubmit} isLoading={isPending} />
      )}
    </div>
  )
}

export default EmailConfirmation
