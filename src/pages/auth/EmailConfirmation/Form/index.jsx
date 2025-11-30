import './styles.scss'

import { useForm } from 'react-hook-form'

import { PrimaryButton } from '@/components/buttons'
import useLocale from '@/hooks/useLocale'

import { getDefaultValues } from './fields'

const EmailConfirmationForm = ({ isLoading, userEmail, onSubmit }) => {
  const { t } = useLocale()

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: getDefaultValues(userEmail)
  })

  return (
    <form
      className='email-confirmation-form'
      onSubmit={handleSubmit(data => onSubmit(data))}
    >
      <PrimaryButton type='submit' disabled={isSubmitting || isLoading}>
        {isSubmitting || isLoading
          ? t('processing')
          : t('email.confirmation.cta')}
      </PrimaryButton>
    </form>
  )
}

export default EmailConfirmationForm
