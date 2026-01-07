import { useForm } from 'react-hook-form'

import { FormRoot } from '@/components/form'
import { Button } from '@/components/ui'
import useLocale from '@/hooks/useLocale'

import { getDefaultValues } from './fields'
import resolver from './resolver'

const EmailConfirmationForm = ({ isLoading, email, onSubmit }) => {
  const { t } = useLocale()

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    resolver,
    defaultValues: getDefaultValues(email)
  })

  return (
    <FormRoot onSubmit={handleSubmit(data => onSubmit(data))}>
      <Button type='submit' disabled={isSubmitting || isLoading}>
        {isSubmitting || isLoading
          ? t('processing')
          : t('email.confirmation.cta')}
      </Button>
    </FormRoot>
  )
}

export default EmailConfirmationForm
