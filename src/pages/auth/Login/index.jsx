import './styles.scss'

import { useNavigate } from 'react-router-dom'

import { GoogleOAuthButton } from '@/components/buttons'
import { ForgotYourPasswordPrompt, SignupPrompt } from '@/components/prompts'
import Separator from '@/components/Separator'
import Spinner from '@/components/Spinner'
import { useLogin, useLoginWithGoogle } from '@/hooks/useAuth'
import useLocale from '@/hooks/useLocale'
import useNotifications from '@/hooks/useNotifications'
import { toTranslationKey } from '@/services/catch'

import LoginForm from './Form'

const Login = () => {
  const { t } = useLocale()
  const navigate = useNavigate()
  const { mutate: logInWithEmail, isPending: isEmailPending } = useLogin()
  const { mutate: logInWithGoogle, isPending: isGooglePending } =
    useLoginWithGoogle()
  const { showErrorToast } = useNotifications()

  const handleLogin = ({ email, password }) => {
    logInWithEmail(
      { email, password },
      {
        onSuccess: () => {
          navigate('/')
        },
        onError: err => {
          showErrorToast(t(toTranslationKey(err)))
        }
      }
    )
  }

  const handleLoginWithGoogle = () => {
    logInWithGoogle(undefined, {
      onSuccess: () => {
        navigate('/')
      },
      onError: err => {
        showErrorToast(t(toTranslationKey(err)))
      }
    })
  }

  if (isEmailPending || isGooglePending) {
    return <Spinner centered />
  }

  return (
    <div className='login-page'>
      <LoginForm onSubmit={handleLogin} isLoading={isEmailPending} />
      <div className='login-page__separator'>
        <Separator text={t('or')} />
      </div>
      <GoogleOAuthButton
        className='login-page__oauth-button'
        text={t('continueWithGoogle')}
        onClick={handleLoginWithGoogle}
        disabled={isGooglePending}
      />
      <div className='login-page__prompts'>
        <SignupPrompt />
        <ForgotYourPasswordPrompt />
      </div>
    </div>
  )
}

export default Login
