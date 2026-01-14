import { useForm } from 'react-hook-form'

import {
  FormField,
  FormFields,
  FormRoot,
  SubmitButton
} from '@/components/form'
import { PasswordInput } from '@/components/inputs'
import useLocale from '@/hooks/useLocale'

import { FieldName, getDefaultValues } from './fields'
import resolver from './resolver'

export const ResetPasswordForm = ({ isLoading, onSubmit }) => {
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

      <SubmitButton isLoading={isSubmitting || isLoading}>
        {t('password.reset.set.cta')}
      </SubmitButton>
    </FormRoot>
  )
}
