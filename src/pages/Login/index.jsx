import './styles.scss'

import { useForm } from 'react-hook-form'

import { GoogleLoginButton, PrimaryButton } from '@/components/Button'
import { MassiveLogo } from '@/components/icons'
import { PasswordInput, TextInput } from '@/components/inputs'
import FormField from '@/components/inputs/Form'
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
            <FormField label='Email' name='email' error={errors.email?.message}>
              <TextInput
                name='email'
                placeholder='example@email.com'
                required={true}
                error={errors.email?.message}
                {...register('email')}
              />
            </FormField>

            <FormField
              label='Password'
              name='password'
              error={errors.password?.message}
            >
              <PasswordInput
                name='password'
                required={true}
                error={errors.password?.message}
                {...register('password')}
              />
            </FormField>
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
