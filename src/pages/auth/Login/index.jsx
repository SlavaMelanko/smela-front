import { useNavigate } from 'react-router-dom'

import { GoogleIcon } from '@/components/icons'
import { InvisibleReCaptcha } from '@/components/InvisibleReCaptcha'
import { ForgotYourPasswordPrompt, SignupPrompt } from '@/components/prompts'
import { TextSeparator } from '@/components/Separator'
import { Button } from '@/components/ui'
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
  const { captchaRef, getCaptchaToken } = useCaptcha()

  const handleLogin = async data => {
    const token = await getCaptchaToken()

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
    <>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-2'>
          <LoginForm isLoading={isEmailPending} onSubmit={handleLogin} />

          <TextSeparator text={t('or')} />

          <div className='flex flex-col gap-4'>
            <Button
              variant='outline'
              className='w-full'
              onClick={handleLoginWithGoogle}
              disabled={isGooglePending}
            >
              <GoogleIcon />
              {t('continueWithGoogle')}
            </Button>
          </div>
        </div>

        <SignupPrompt />

        <ForgotYourPasswordPrompt />
      </div>

      <InvisibleReCaptcha ref={captchaRef} />
    </>
  )
}

export default Login
