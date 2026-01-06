import { useForm } from 'react-hook-form'

import { FormContainer, FormField, FormFields } from '@/components/form'
import { Button, Input } from '@/components/ui'
import useLocale from '@/hooks/useLocale'

import { FieldName, getDefaultValues } from './fields'
import resolver from './resolver'

const ResetPasswordForm = ({ isLoading, onSubmit }) => {
  const { t } = useLocale()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver,
    defaultValues: getDefaultValues()
  })

  return (
    <FormContainer onSubmit={handleSubmit(data => onSubmit(data))}>
      <FormFields>
        <FormField name={FieldName.EMAIL} error={errors[FieldName.EMAIL]}>
          <Input
            placeholder={t('email.example')}
            {...register(FieldName.EMAIL)}
          />
        </FormField>
      </FormFields>

      <Button type='submit' disabled={isSubmitting || isLoading}>
        {isSubmitting || isLoading
          ? t('processing')
          : t('password.reset.request.cta')}
      </Button>
    </FormContainer>
  )
}

export default ResetPasswordForm
