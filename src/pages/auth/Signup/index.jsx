import './styles.scss'

import { useNavigate } from 'react-router-dom'

import { GoogleOAuthButton } from '@/components/buttons'
import { LoginPrompt } from '@/components/prompts'
import Separator from '@/components/Separator'
import useAuth from '@/hooks/useAuth'
import useLocale from '@/hooks/useLocale'
import useNotifications from '@/hooks/useNotifications'
import { toTranslationKey } from '@/services/catch'

import SignupForm from './Form'

const Signup = () => {
  const { t } = useLocale()
  const navigate = useNavigate()
  const { signUp, signUpWithGoogle } = useAuth()
  const { showErrorToast } = useNotifications()

  const handleSignUp = async data => {
    try {
      await signUp(data)

      navigate('/email-confirmation')
    } catch (err) {
      console.error(err)
      showErrorToast(t(toTranslationKey(err)))
    }
  }

  const handleSignupWithGoogle = async () => {
    try {
      await signUpWithGoogle()

      navigate('/')
    } catch (err) {
      console.error(err)
      showErrorToast(t(toTranslationKey(err)))
    }
  }

  return (
    <div className='signup-page'>
      <SignupForm onSubmit={handleSignUp} />
      <div className='signup-page__separator'>
        <Separator text={t('or')} />
      </div>
      <GoogleOAuthButton
        text={t('continueWithGoogle')}
        onClick={handleSignupWithGoogle}
        disabled
      />
      <div className='signup-page__prompts'>
        <LoginPrompt />
      </div>
    </div>
  )
}

export default Signup
