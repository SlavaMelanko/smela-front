import { useForm } from 'react-hook-form'

import {
  FormField,
  FormFields,
  FormGroup,
  FormRoot,
  SubmitButton
} from '@/components/form'
import { Input } from '@/components/ui'
import { useLocale } from '@/hooks/useLocale'

import { PermissionsMatrix } from '../PermissionsMatrix'
import { defaultConfig, FieldName, getDefaultValues, resolver } from './schema'

export const UserInvitationForm = ({
  isLoading,
  onSubmit,
  customConfig = {}
}) => {
  const { t } = useLocale()
  const config = { ...defaultConfig, ...customConfig }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver,
    defaultValues: getDefaultValues()
  })

  const submit = data => {
    const result = { ...data }

    Object.entries(config).forEach(([key, visible]) => {
      if (!visible) {
        delete result[key]
      }
    })

    return onSubmit(result)
  }

  return (
    <FormRoot onSubmit={handleSubmit(submit)}>
      <FormGroup legend={t('personalDetails')}>
        <FormFields>
          <FormField
            label={t('firstName.label')}
            name={FieldName.FIRST_NAME}
            error={errors[FieldName.FIRST_NAME]}
          >
            <Input {...register(FieldName.FIRST_NAME)} />
          </FormField>

          <FormField
            label={t('lastName.label')}
            name={FieldName.LAST_NAME}
            error={errors[FieldName.LAST_NAME]}
            optional
          >
            <Input {...register(FieldName.LAST_NAME)} />
          </FormField>

          <FormField
            label={t('email.label')}
            name={FieldName.EMAIL}
            error={errors[FieldName.EMAIL]}
          >
            <Input {...register(FieldName.EMAIL)} />
          </FormField>

          {config[FieldName.POSITION] && (
            <FormField
              label={t('position.label')}
              name={FieldName.POSITION}
              error={errors[FieldName.POSITION]}
              optional
            >
              <Input {...register(FieldName.POSITION)} />
            </FormField>
          )}
        </FormFields>
      </FormGroup>

      {config.permissions && (
        <FormGroup legend={t('permissions.name')}>
          <PermissionsMatrix control={control} />
        </FormGroup>
      )}

      <SubmitButton isLoading={isSubmitting || isLoading}>
        {t('invite.send.cta')}
      </SubmitButton>
    </FormRoot>
  )
}
