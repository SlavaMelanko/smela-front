import './styles.scss'

import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { PrimaryButton } from '@/components/buttons'
import Captcha from '@/components/Captcha'
import FormField from '@/components/form/Field'
import { TextInput } from '@/components/inputs'
import {
  resetPasswordSchema,
  useYupValidationResolver
} from '@/lib/useYupValidationResolver'

import LoginPrompt from '../Register/LoginPrompt'

const ForgotYourPassword = () => {
  const { t } = useTranslation()
  const resolver = useYupValidationResolver(resetPasswordSchema)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver,
    defaultValues: {
      email: '',
      captcha: ''
    }
  })

  const setToken = token => {
    console.log(token)
  }

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <div className='forgot-password-page'>
      <form
        className='forgot-password-page__form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='forgot-password-page__fields'>
          <FormField name='email' error={errors.email?.message} required>
            <TextInput placeholder='Current email' {...register('email')} />
          </FormField>
        </div>

        <div className='forgot-password-page__fields'>
          <FormField name='captcha' error={errors.captcha?.message} required>
            <Captcha setToken={setToken} />
          </FormField>
        </div>

        <PrimaryButton type='submit' disabled={isSubmitting}>
          {isSubmitting ? t('common.processing') : t('auth.reset')}
        </PrimaryButton>
      </form>

      <div className='forgot-password-page__prompt'>
        <LoginPrompt />
      </div>
    </div>
  )
}

export default ForgotYourPassword
