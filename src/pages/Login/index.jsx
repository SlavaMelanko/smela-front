import './styles.scss'

import { useForm } from 'react-hook-form'

import { GoogleLoginButton, PrimaryButton } from '@/components/Button'
import { MassiveLogo } from '@/components/icons'
import { PasswordInput, TextInput } from '@/components/inputs'
import Separator from '@/components/Separator'

import ForgotYourPasswordPrompt from './ForgotYourPasswordPrompt'
import SignupPrompt from './SignupPrompt'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <div className='login-page'>
      <div className='login-page__card'>
        <div className='login-page__logo'>
          <MassiveLogo width={240} height={45} />
        </div>
        <form className='login-page__form' onSubmit={handleSubmit(onSubmit)}>
          <div className='login-page__fields'>
            <TextInput
              name='email'
              placeholder='example@email.com'
              register={register}
            />
            <PasswordInput name='password' register={register} />
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
