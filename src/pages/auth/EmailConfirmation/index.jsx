import './styles.scss'

import useAuth from '@/hooks/useAuth'
import useLocale from '@/hooks/useLocale'
import useNotifications from '@/hooks/useNotifications'
import { toTranslationKey } from '@/services/catch'

import EmailConfirmationForm from './Form'

const EmailConfirmation = () => {
  const { t } = useLocale()
  const { user, resendVerificationEmail } = useAuth()
  const { showSuccessToast, showErrorToast } = useNotifications()

  const handleSubmit = async ({ reset }) => {
    try {
      await resendVerificationEmail()

      showSuccessToast(t('email.confirmation.success'))

      if (reset) {
        reset()
      }
    } catch (err) {
      console.error(err)
      showErrorToast(t(toTranslationKey(err)))
    }
  }

  return (
    <div className='email-confirmation-page'>
      <div className='email-confirmation-page__content'>
        <h1 className='email-confirmation-page__title'>
          {t('email.confirmation.title')}
        </h1>

        <p className='email-confirmation-page__message'>
          {t('email.confirmation.description', {
            email: user?.email || t('email.confirmation.yourEmail')
          })}
        </p>
      </div>

      <EmailConfirmationForm onSubmit={handleSubmit} />
    </div>
  )
}

export default EmailConfirmation
