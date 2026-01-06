import { useNavigate } from 'react-router-dom'

import { GoogleIcon } from '@/components/icons'
import { LoginPrompt, TermsAndPrivacyPrompt } from '@/components/prompts'
import { TextSeparator } from '@/components/Separator'
import { Button } from '@/components/ui'
import {
  useUserSignupWithEmail,
  useUserSignupWithGoogle
} from '@/hooks/useAuth'
import useCaptcha from '@/hooks/useCaptcha'
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
  const { getToken, Captcha } = useCaptcha()

  const handleSignupWithEmail = async data => {
    const token = await getToken()

    if (!token) {
      showErrorToast(t('captcha.error'))

      return
    }

    const preferences = { locale, theme }

    signUpWithEmail(
      { data, captcha: { token }, preferences },
      {
        onSuccess: () => {
          navigate('/email-confirmation', { state: { email: data.email } })
        },
        onError: err => {
          showErrorToast(t(toTranslationKey(err)))
        }
      }
    )
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
    <>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-2'>
          <SignupForm
            isLoading={isEmailPending}
            onSubmit={handleSignupWithEmail}
          />

          <TextSeparator text={t('or')} />

          <div className='flex flex-col gap-4'>
            <Button
              variant='outline'
              className='w-full'
              onClick={handleSignupWithGoogle}
              disabled={isGooglePending}
            >
              <GoogleIcon />
              {t('continueWithGoogle')}
            </Button>
          </div>
        </div>

        <div className='-mt-5'>
          <TermsAndPrivacyPrompt />
        </div>

        <LoginPrompt />
      </div>

      {Captcha}
    </>
  )
}

export default Signup
