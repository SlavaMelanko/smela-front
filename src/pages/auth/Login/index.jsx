import './styles.scss'

import { useNavigate } from 'react-router-dom'

import { GoogleOAuthButton } from '@/components/buttons'
import { ForgotYourPasswordPrompt, SignupPrompt } from '@/components/prompts'
import Separator from '@/components/Separator'
import { useLogin, useLoginWithGoogle } from '@/hooks/useAuth'
import useCaptcha from '@/hooks/useCaptcha'
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
  const { getToken, Captcha } = useCaptcha()

  const handleLogin = async data => {
    const token = await getToken()

    if (!token) {
      showErrorToast(t('captcha.error'))

      return
    }

    logInWithEmail(
      { data, captcha: { token } },
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

  return (
    <div className='login-page'>
      <LoginForm isLoading={isEmailPending} onSubmit={handleLogin} />

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

      {Captcha}
    </div>
  )
}

export default Login
