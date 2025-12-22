import './styles.scss'

import { useForm } from 'react-hook-form'

import { FormField } from '@/components/form'
import { PasswordInput } from '@/components/inputs'
import { Button } from '@/components/ui/button'
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
    <form
      className='reset-password-password-form'
      onSubmit={handleSubmit(data => onSubmit(data))}
    >
      <div className='reset-password-password-form__fields'>
        <FormField
          name={FieldName.NEW_PASSWORD}
          error={errors[FieldName.NEW_PASSWORD]}
        >
          <PasswordInput
            placeholder={t('password.placeholder.new')}
            {...register(FieldName.NEW_PASSWORD)}
          />
        </FormField>
      </div>

      <Button type='submit' disabled={isSubmitting || isLoading}>
        {isSubmitting || isLoading
          ? t('processing')
          : t('password.reset.set.cta')}
      </Button>
    </form>
  )
}

export default SetNewPasswordForm
