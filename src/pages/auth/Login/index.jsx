import './styles.scss'

import { useNavigate } from 'react-router-dom'

import { GoogleOAuthButton } from '@/components/buttons'
import { ForgotYourPasswordPrompt, SignupPrompt } from '@/components/prompts'
import Separator from '@/components/Separator'
import { Spinner } from '@/components/Spinner'
import useAuth from '@/hooks/useAuth'
import useLocale from '@/hooks/useLocale'
import useNotifications from '@/hooks/useNotifications'
import { toTranslationKey } from '@/services/catch'

import LoginForm from './Form'

const Login = () => {
  const { t } = useLocale()
  const navigate = useNavigate()
  const { loading, logIn, logInWithGoogle } = useAuth()
  const { showErrorToast } = useNotifications()

  const handleLogin = async ({ email, password }) => {
    try {
      await logIn(email, password)

      navigate('/')
    } catch (err) {
      console.error(err)
      showErrorToast(t(toTranslationKey(err)))
    }
  }

  const handleLoginWithGoogle = async () => {
    try {
      await logInWithGoogle()

      navigate('/')
    } catch (err) {
      console.error(err)
      showErrorToast(t(toTranslationKey(err)))
    }
  }

  if (loading) {
    return <Spinner centered />
  }

  return (
    <div className='login-page'>
      <LoginForm onSubmit={handleLogin} />
      <div className='login-page__separator'>
        <Separator text={t('or')} />
      </div>
      <GoogleOAuthButton
        text={t('continueWithGoogle')}
        onClick={handleLoginWithGoogle}
      />
      <div className='login-page__prompts'>
        <SignupPrompt />
        <ForgotYourPasswordPrompt />
      </div>
    </div>
  )
}

export default Login
