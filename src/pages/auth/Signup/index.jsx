import './styles.scss'

import { useNavigate } from 'react-router-dom'

import { GoogleOAuthButton } from '@/components/buttons'
import { LoginPrompt } from '@/components/prompts'
import Separator from '@/components/Separator'
import { useSignup, useSignupWithGoogle } from '@/hooks/useAuth'
import useLocale from '@/hooks/useLocale'
import useNotifications from '@/hooks/useNotifications'
import { toTranslationKey } from '@/services/catch'

import SignupForm from './Form'

const Signup = () => {
  const { t } = useLocale()
  const navigate = useNavigate()
  const { showErrorToast } = useNotifications()
  const { mutate: signUpWithEmail, isPending: isEmailPending } = useSignup()
  const { mutate: signUpWithGoogle, isPending: isGooglePending } =
    useSignupWithGoogle()

  const handleSignupWithEmail = data => {
    signUpWithEmail(data, {
      onSuccess: () => {
        navigate('/email-confirmation')
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
      <SignupForm onSubmit={handleSignupWithEmail} isLoading={isEmailPending} />
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
        <LoginPrompt />
      </div>
    </div>
  )
}

export default Signup
