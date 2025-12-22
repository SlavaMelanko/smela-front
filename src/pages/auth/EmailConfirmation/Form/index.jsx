import { useForm } from 'react-hook-form'

import { FormContainer } from '@/components/form'
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
    <FormContainer onSubmit={handleSubmit(data => onSubmit(data))}>
      <Button type='submit' disabled={isSubmitting || isLoading}>
        {isSubmitting || isLoading
          ? t('processing')
          : t('email.confirmation.cta')}
      </Button>
    </FormContainer>
  )
}

export default EmailConfirmationForm
