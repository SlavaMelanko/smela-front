import './styles.scss'

import { GoogleLoginButton, PrimaryButton } from '@/components/Button'
import { MassiveLogo } from '@/components/icons'
import { PasswordInput, TextInput } from '@/components/inputs'
import Separator from '@/components/Separator'

import ForgotYourPasswordPrompt from './ForgotYourPasswordPrompt'
import SignupPrompt from './SignupPrompt'

const Login = () => {
  return (
    <div className='login-page'>
      <div className='login-page__card'>
        <div className='login-page__logo'>
          <MassiveLogo width={240} height={45} />
        </div>
        <form className='login-page__form'>
          <div className='login-page__fields'>
            <TextInput name='email' placeholder='example@email.com' />
            <PasswordInput name='password' />
          </div>
          <PrimaryButton type='submit'>Login</PrimaryButton>
        </form>
        <div className='login-page__separator'>
          <Separator />
        </div>
        <GoogleLoginButton />
        <div className='login-page__prompts'>
          <SignupPrompt />
          <ForgotYourPasswordPrompt />
        </div>
      </div>
    </div>
  )
}

export default Login
