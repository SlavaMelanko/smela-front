import './styles.scss'

import { GoogleLoginButton, PrimaryButton } from '@/components/Button'
import { PasswordInput, TextInput } from '@/components/inputs'
import Separator from '@/components/Separator'

import ForgotYourPasswordPrompt from './ForgotYourPasswordPrompt'
import SignupPrompt from './SignupPrompt'

const Login = () => {
  return (
    <div className='login-page'>
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
  )
}

export default Login
