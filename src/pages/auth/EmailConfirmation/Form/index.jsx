import './styles.scss'

import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
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
      <Button type='submit' disabled={isSubmitting || isLoading}>
        {isSubmitting || isLoading
          ? t('processing')
          : t('email.confirmation.cta')}
      </Button>
    </form>
  )
}

export default EmailConfirmationForm
