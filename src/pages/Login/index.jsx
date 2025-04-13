import './styles.scss'

import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { GoogleOAuthButton, PrimaryButton } from '@/components/buttons'
import FormField from '@/components/form/Field'
import { PasswordInput, TextInput } from '@/components/inputs'
import Separator from '@/components/Separator'
import {
  loginSchema,
  useYupValidationResolver
} from '@/lib/useYupValidationResolver'

import ForgotYourPasswordPrompt from './ForgotYourPasswordPrompt'
import SignupPrompt from './SignupPrompt'

const Login = () => {
  const { t } = useTranslation()
  const resolver = useYupValidationResolver(loginSchema)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
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
      <form className='login-page__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='login-page__fields'>
          <FormField name='email' error={errors.email?.message} required>
            <TextInput placeholder='example@email.com' {...register('email')} />
          </FormField>

          <FormField name='password' error={errors.password?.message} required>
            <PasswordInput {...register('password')} />
          </FormField>
        </div>

        <PrimaryButton type='submit' disabled={isSubmitting}>
          {isSubmitting ? t('common.processing') : t('auth.login')}
        </PrimaryButton>
      </form>

      <div className='login-page__separator'>
        <Separator text={t('common.or')} />
      </div>

      <GoogleOAuthButton text={t('auth.continueWithGoogle')} />

      <div className='login-page__prompts'>
        <SignupPrompt />
        <ForgotYourPasswordPrompt />
      </div>
    </div>
  )
}

export default Login
