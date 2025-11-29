import './styles.scss'

import { useRef } from 'react'
import { useForm } from 'react-hook-form'

import { PrimaryButton } from '@/components/buttons'
import FormField from '@/components/form/Field'
import { TextInput } from '@/components/inputs'
import InvisibleReCaptcha2 from '@/components/InvisibleReCaptcha2'
import useLocale from '@/hooks/useLocale'

import { FieldName, getDefaultValues } from './fields'
import resolver from './resolver'

const ResetPasswordForm = ({ isLoading, preferences, onSubmit }) => {
  const { t } = useLocale()
  const recaptchaRef = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver,
    defaultValues: getDefaultValues()
  })

  const submitForm = async data => {
    const captchaToken = await recaptchaRef.current?.executeAsync()

    await onSubmit({
      data,
      captcha: { token: captchaToken },
      preferences
    })
  }

  return (
    <form
      className='reset-password-email-form'
      /* eslint-disable-next-line react-hooks/refs -- React Hook Form pattern is safe */
      onSubmit={handleSubmit(submitForm)}
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
      </div>

      <PrimaryButton type='submit' disabled={isSubmitting || isLoading}>
        {isSubmitting || isLoading
          ? t('processing')
          : t('password.reset.request.cta')}
      </PrimaryButton>

      <InvisibleReCaptcha2 ref={recaptchaRef} />
    </form>
  )
}

export default ResetPasswordForm
