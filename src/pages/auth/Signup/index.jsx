import './styles.scss'

import { useNavigate } from 'react-router-dom'

import { GoogleOAuthButton } from '@/components/buttons'
import { LoginPrompt, TermsAndPrivacyPrompt } from '@/components/prompts'
import Separator from '@/components/Separator'
import {
  useUserSignupWithEmail,
  useUserSignupWithGoogle
} from '@/hooks/useAuth'
import useLocale from '@/hooks/useLocale'
import useNotifications from '@/hooks/useNotifications'
import useTheme from '@/hooks/useTheme'
import { toTranslationKey } from '@/services/catch'

import SignupForm from './Form'

const Signup = () => {
  const { t, locale } = useLocale()
  const { theme } = useTheme()
  const navigate = useNavigate()
  const { showErrorToast } = useNotifications()
  const { mutate: signUpWithEmail, isPending: isEmailPending } =
    useUserSignupWithEmail()
  const { mutate: signUpWithGoogle, isPending: isGooglePending } =
    useUserSignupWithGoogle()

  const preferences = { locale, theme }

  const handleSignupWithEmail = data => {
    if (!data.captchaToken) {
      showErrorToast(t('captcha.error'))

      return
    }

    signUpWithEmail(data, {
      onSuccess: () => {
        navigate('/email-confirmation', { state: { email: data.email } })
      },
      onError: err => {
        showErrorToast(t(toTranslationKey(err)))
      }
    })
  }

  const handleSignupWithGoogle = () => {
    signUpWithGoogle(undefined, {
      onSuccess: () => {
        navigate('/')
      },
      onError: err => {
        showErrorToast(t(toTranslationKey(err)))
      }
    })
  }

  return (
    <div className='signup-page'>
      <SignupForm
        isLoading={isEmailPending}
        preferences={preferences}
        onSubmit={handleSignupWithEmail}
      />
      <div className='signup-page__separator'>
        <Separator text={t('or')} />
      </div>
      <GoogleOAuthButton
        className='signup-page__oauth-button'
        text={t('continueWithGoogle')}
        onClick={handleSignupWithGoogle}
        disabled={isGooglePending}
      />
      <div className='signup-page__prompts'>
        <TermsAndPrivacyPrompt />
        <LoginPrompt />
      </div>
    </div>
  )
}

export default Signup
