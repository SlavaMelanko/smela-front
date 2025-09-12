import './styles.scss'

import { useRef } from 'react'
import { useForm } from 'react-hook-form'

import { PrimaryButton } from '@/components/buttons'
import InvisibleReCaptcha2 from '@/components/InvisibleReCaptcha2'
import useLocale from '@/hooks/useLocale'

import { FieldName, getDefaultValues } from './fields'

const EmailConfirmationForm = ({ onSubmit, isLoading }) => {
  const { t } = useLocale()
  const recaptchaRef = useRef(null)

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: getDefaultValues()
  })

  const handleSubmitForm = async data => {
    const captchaToken = await recaptchaRef.current?.executeAsync()

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

      <InvisibleReCaptcha2 ref={recaptchaRef} />
    </form>
  )
}

export default EmailConfirmationForm
