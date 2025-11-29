import './styles.scss'

import { useForm } from 'react-hook-form'

import { PrimaryButton } from '@/components/buttons'
import FormField from '@/components/form/Field'
import { PasswordInput } from '@/components/inputs'
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

  const submitForm = data => onSubmit({ data })

  return (
    <form
      className='reset-password-password-form'
      onSubmit={handleSubmit(submitForm)}
    >
      <div className='reset-password-password-form__fields'>
        <FormField
          name={FieldName.NEW_PASSWORD}
          error={errors[FieldName.NEW_PASSWORD]}
          required
        >
          <PasswordInput
            placeholder={t('password.placeholder.new')}
            {...register(FieldName.NEW_PASSWORD)}
          />
        </FormField>
      </div>

      <PrimaryButton type='submit' disabled={isSubmitting || isLoading}>
        {isSubmitting || isLoading
          ? t('processing')
          : t('password.reset.set.cta')}
      </PrimaryButton>
    </form>
  )
}

export default SetNewPasswordForm
