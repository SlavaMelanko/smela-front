import { useForm } from 'react-hook-form'

import { FormField, FormFields, FormRoot } from '@/components/form'
import { PasswordInput } from '@/components/inputs'
import { Button } from '@/components/ui'
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
    <FormRoot onSubmit={handleSubmit(data => onSubmit(data))}>
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
    </FormRoot>
  )
}

export default SetNewPasswordForm
