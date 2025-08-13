import './styles.scss'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { PrimaryButton } from '@/components/buttons'
import Captcha from '@/components/Captcha'
import FormField from '@/components/form/Field'
import { TextInput } from '@/components/inputs'
import useLocale from '@/hooks/useLocale'

import { FieldName, getDefaultValues } from './fields'
import resolver from './resolver'

const ResetPasswordForm = ({ onSubmit, isLoading = false }) => {
  const { t } = useLocale()
  const [captchaResetKey, setCaptchaResetKey] = useState(0)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver,
    defaultValues: getDefaultValues()
  })

  const setToken = token => {
    setValue(FieldName.CAPTCHA, token, { shouldValidate: true })
  }

  const resetFormAndCaptcha = () => {
    setCaptchaResetKey(prev => prev + 1)

    reset()
  }

  const handleSubmitForm = async data => {
    await onSubmit({
      ...data,
      reset: resetFormAndCaptcha
    })
  }

  return (
    <form
      className='reset-password-email-form'
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <div className='reset-password-email-form__fields'>
        <FormField
          name={FieldName.EMAIL}
          error={errors[FieldName.EMAIL]}
          required
        >
          <TextInput
            placeholder={t('email.example')}
            {...register(FieldName.EMAIL)}
          />
        </FormField>

        <FormField
          name={FieldName.CAPTCHA}
          error={errors[FieldName.CAPTCHA]}
          required
        >
          <Captcha key={captchaResetKey} setToken={setToken} />
        </FormField>
      </div>

      <PrimaryButton type='submit' disabled={isSubmitting || isLoading}>
        {isSubmitting || isLoading
          ? t('processing')
          : t('password.reset.request.cta')}
      </PrimaryButton>
    </form>
  )
}

export default ResetPasswordForm
