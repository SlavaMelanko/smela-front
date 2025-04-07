import './styles.scss'

import { useForm } from 'react-hook-form'

import { GoogleLoginButton, PrimaryButton } from '@/components/Button'
import { MassiveLogo } from '@/components/icons'
import { PasswordInput, TextInput } from '@/components/inputs'
import Separator from '@/components/Separator'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

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
              register={register}
            />
            {errors.fullName && (
              <span className='error'>{errors.fullName.message}</span>
            )}
            <TextInput
              name='email'
              placeholder='example@email.com'
              register={register}
            />
            {errors.email && (
              <span className='error'>{errors.email.message}</span>
            )}
            <PasswordInput name='password' register={register} />
            {errors.password && (
              <span className='error'>{errors.password.message}</span>
            )}
            <PasswordInput name='confirmPassword' register={register} />
            {errors.confirmPassword && (
              <span className='error'>{errors.confirmPassword.message}</span>
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
