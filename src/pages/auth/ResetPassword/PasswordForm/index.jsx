import { useForm } from 'react-hook-form'

import { FormContainer, FormField, FormFields } from '@/components/form'
import { Button } from '@/components/ui/button'
import { PasswordInput } from '@/components/ui/password-input'
import useLocale from '@/hooks/useLocale'

import { FieldName, getDefaultValues } from './fields'
import resolver from './resolver'

const SetNewPasswordForm = ({ isLoading, onSubmit }) => {
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
        <FormField
          name={FieldName.NEW_PASSWORD}
          error={errors[FieldName.NEW_PASSWORD]}
        >
          <PasswordInput
            placeholder={t('password.placeholder.new')}
            {...register(FieldName.NEW_PASSWORD)}
          />
        </FormField>
      </FormFields>

      <Button type='submit' disabled={isSubmitting || isLoading}>
        {isSubmitting || isLoading
          ? t('processing')
          : t('password.reset.set.cta')}
      </Button>
    </FormContainer>
  )
}

export default SetNewPasswordForm
