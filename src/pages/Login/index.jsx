import './styles.scss'

import { useForm } from 'react-hook-form'

import { GoogleLoginButton, PrimaryButton } from '@/components/Button'
import FormField from '@/components/form/Field'
import { PasswordInput, TextInput } from '@/components/inputs'
import Separator from '@/components/Separator'
import { useYupValidationResolver } from '@/lib/useYupValidationResolver'
import { login } from '@/lib/validation/schemas/auth'

import ForgotYourPasswordPrompt from './ForgotYourPasswordPrompt'
import SignupPrompt from './SignupPrompt'

const Login = () => {
  const resolver = useYupValidationResolver(login)

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
  // TODO: required as default? 🤔

  return (
    <div className='login-page'>
      <form className='login-page__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='login-page__fields'>
          <FormField
            label='Email'
            name='email'
            error={errors.email?.message}
            required
          >
            <TextInput
              name='email'
              placeholder='example@email.com'
              error={errors.email?.message}
              {...register('email')}
            />
          </FormField>

          <FormField
            label='Password'
            name='password'
            error={errors.password?.message}
            required
          >
            <PasswordInput
              name='password'
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
  )
}

export default Login
