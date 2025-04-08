import './styles.scss'

import { useForm } from 'react-hook-form'

import { GoogleLoginButton, PrimaryButton } from '@/components/Button'
import { MassiveLogo } from '@/components/icons'
import { PasswordInput, TextInput } from '@/components/inputs'
import Separator from '@/components/Separator'
import {
  loginSchema,
  useYupValidationResolver
} from '@/lib/useYupValidationResolver'

import ForgotYourPasswordPrompt from './ForgotYourPasswordPrompt'
import SignupPrompt from './SignupPrompt'

const Login = () => {
  const resolver = useYupValidationResolver(loginSchema)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver,
    defaultValues: {
      email: '',
      password: ''
    }
  })

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
              required={true}
              {...register('email')}
            />
            {errors.email && (
              <p className='login-page__error' hidden={!errors.email}>
                {errors.email.message}
              </p>
            )}
            <PasswordInput
              name='password'
              required={true}
              {...register('password')}
            />
            {errors.password && (
              <p className='login-page__error' hidden={!errors.password}>
                {errors.password.message}
              </p>
            )}
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
