import { useLocation } from 'react-router-dom'

import { InvisibleReCaptcha } from '@/components/InvisibleReCaptcha'
import { EmailLink } from '@/components/links'
import { useCurrentUser, useResendVerificationEmail } from '@/hooks/useAuth'
import useCaptcha from '@/hooks/useCaptcha'
import useLocale from '@/hooks/useLocale'
import useTheme from '@/hooks/useTheme'
import useToast from '@/hooks/useToast'
import { toTranslationKey } from '@/services/catch'

import { Description, Title } from '../components'
import { AuthHeader, AuthRoot } from '../containers'
import { EmailConfirmationForm } from './Form'

export const EmailConfirmationPage = () => {
  const { t, locale } = useLocale()
  const { theme } = useTheme()
  const location = useLocation()
  const { mutate: resendVerificationEmail, isPending } =
    useResendVerificationEmail()
  const { showSuccessToast, showErrorToast } = useToast()
  const { user } = useCurrentUser()
  const { captchaRef, getCaptchaToken } = useCaptcha()

  const email = location.state?.email || user?.email

  const handleSubmit = async data => {
    const token = await getCaptchaToken()

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
    <>
      <AuthRoot>
        <AuthHeader>
          <Title>{t('email.confirmation.title')}</Title>
          <Description>
            {t('email.confirmation.description.start')}{' '}
            {email ? (
              <EmailLink email={email} />
            ) : (
              t('email.confirmation.yourEmail')
            )}
            . {t('email.confirmation.description.end')}
          </Description>
        </AuthHeader>

        <EmailConfirmationForm
          isLoading={isPending}
          email={email}
          onSubmit={handleSubmit}
        />
      </AuthRoot>

      <InvisibleReCaptcha ref={captchaRef} />
    </>
  )
}
