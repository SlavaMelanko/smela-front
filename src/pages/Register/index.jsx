import './styles.scss'

import { useForm } from 'react-hook-form'

import { GoogleLoginButton, PrimaryButton } from '@/components/Button'
import { MassiveLogo } from '@/components/icons'
import { PasswordInput, TextInput } from '@/components/inputs'
import FormField from '@/components/inputs/Form'
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
            <FormField
              label='Full Name'
              name='fullName'
              error={errors.fullName?.message}
            >
              <TextInput
                name='fullName'
                placeholder='John Doe'
                required={true}
                {...register('fullName')}
              />
            </FormField>

            <FormField label='Email' name='email' error={errors.email?.message}>
              <TextInput
                name='email'
                placeholder='example@email.com'
                required={true}
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
                {...register('password')}
              />
            </FormField>

            <FormField
              label='Confirm Password'
              name='confirmPassword'
              error={errors.confirmPassword?.message}
            >
              <PasswordInput
                name='confirmPassword'
                required={true}
                {...register('confirmPassword')}
              />
            </FormField>
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
