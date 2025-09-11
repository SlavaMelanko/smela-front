import './styles.scss'

import { useForm } from 'react-hook-form'

import { PrimaryButton } from '@/components/buttons'
import FormField from '@/components/form/Field'
import { TextInput } from '@/components/inputs'
import useLocale from '@/hooks/useLocale'
import useReCaptcha from '@/hooks/useReCaptcha'

import { FieldName, getDefaultValues } from './fields'
import resolver from './resolver'

const ResetPasswordForm = ({ onSubmit, isLoading = false }) => {
  const { t } = useLocale()
  const { executeReCaptcha } = useReCaptcha()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver,
    defaultValues: getDefaultValues()
  })

  const handleSubmitForm = async data => {
    const captchaToken = await executeReCaptcha('reset_password')

    await onSubmit({
      ...data,
      [FieldName.CAPTCHA_TOKEN]: captchaToken
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
