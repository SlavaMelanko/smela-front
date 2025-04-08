import './styles.scss'

import { useForm } from 'react-hook-form'

import { GoogleLoginButton, PrimaryButton } from '@/components/Button'
import { MassiveLogo } from '@/components/icons'
import { PasswordInput, TextInput } from '@/components/inputs'
import Separator from '@/components/Separator'
import {
  registerSchema,
  useYupValidationResolver
} from '@/lib/useYupValidationResolver'

const Register = () => {
  const resolver = useYupValidationResolver(registerSchema)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver,
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <div className='register-page'>
      <div className='register-page__card'>
        <div className='register-page__logo'>
          <MassiveLogo width={240} height={45} />
        </div>
        <form className='register-page__form' onSubmit={handleSubmit(onSubmit)}>
          <div className='register-page__fields'>
            <TextInput
              name='fullName'
              placeholder='John Doe'
              {...register('fullName')}
            />
            {errors.fullName && (
              <span className='register-page__error'>
                {errors.fullName.message}
              </span>
            )}
            <TextInput
              name='email'
              placeholder='example@email.com'
              {...register('email')}
            />
            {errors.email && (
              <span className='register-page__error'>
                {errors.email.message}
              </span>
            )}
            <PasswordInput name='password' {...register('password')} />
            {errors.password && (
              <span className='register-page__error'>
                {errors.password.message}
              </span>
            )}
            <PasswordInput
              name='confirmPassword'
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <span className='register-page__error'>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <PrimaryButton type='submit'>Register</PrimaryButton>
        </form>
        <div className='register-page__separator'>
          <Separator />
        </div>
        <GoogleLoginButton />
        <div className='register-page__prompts'>
          <p>
            Already have an account? <a href='/login'>Login</a>
          </p>
          <p>
            Forgot your password? <a href='/forgot-password'>Reset it</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
