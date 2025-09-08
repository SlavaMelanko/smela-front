import './styles.scss'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { PrimaryButton } from '@/components/buttons'
import Captcha from '@/components/Captcha'
import FormField from '@/components/form/Field'
import useLocale from '@/hooks/useLocale'

import { FieldName, getDefaultValues } from './fields'
import resolver from './resolver'

const EmailConfirmationForm = ({ onSubmit, isLoading }) => {
  const { t } = useLocale()
  const [captchaResetKey, setCaptchaResetKey] = useState(0)

  const {
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
      className='email-confirmation-form'
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <div className='email-confirmation-form__fields'>
        <FormField
          name={FieldName.CAPTCHA}
          error={errors[FieldName.CAPTCHA]}
          required
        >
          <Captcha key={captchaResetKey} setToken={setToken} />
        </FormField>
      </div>

      <PrimaryButton type='submit' disabled={isSubmitting}>
        {isSubmitting || isLoading
          ? t('processing')
          : t('email.confirmation.cta')}
      </PrimaryButton>
    </form>
  )
}

export default EmailConfirmationForm
