import './styles.scss'

import { useForm } from 'react-hook-form'

import FormField from '@/components/form/Field'
import { TextInput } from '@/components/inputs'
import { Button } from '@/components/ui/button'
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
    <form
      className='reset-password-email-form'
      onSubmit={handleSubmit(data => onSubmit(data))}
    >
      <div className='reset-password-email-form__fields'>
        <FormField
          name={FieldName.EMAIL}
          error={errors[FieldName.EMAIL]}
          required
        >
          <TextInput
            placeholder={t('email.example')}
            {...register(FieldName.EMAIL)}
          />
        </FormField>
      </div>

      <Button type='submit' disabled={isSubmitting || isLoading}>
        {isSubmitting || isLoading
          ? t('processing')
          : t('password.reset.request.cta')}
      </Button>
    </form>
  )
}

export default ResetPasswordForm
