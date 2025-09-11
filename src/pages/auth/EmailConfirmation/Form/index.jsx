import './styles.scss'

import { useForm } from 'react-hook-form'

import { PrimaryButton } from '@/components/buttons'
import useLocale from '@/hooks/useLocale'
import useReCaptcha from '@/hooks/useReCaptcha'

import { FieldName, getDefaultValues } from './fields'

const EmailConfirmationForm = ({ onSubmit, isLoading }) => {
  const { t } = useLocale()
  const { executeReCaptcha } = useReCaptcha()

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: getDefaultValues()
  })

  const handleSubmitForm = async data => {
    const captchaToken = await executeReCaptcha('email_confirmation')

    await onSubmit({
      ...data,
      [FieldName.CAPTCHA_TOKEN]: captchaToken
    })
  }

  return (
    <form
      className='email-confirmation-form'
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <PrimaryButton type='submit' disabled={isSubmitting}>
        {isSubmitting || isLoading
          ? t('processing')
          : t('email.confirmation.cta')}
      </PrimaryButton>
    </form>
  )
}

export default EmailConfirmationForm
