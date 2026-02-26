import { useForm } from 'react-hook-form'

import {
  FormField,
  FormFields,
  FormGroup,
  FormRoot,
  PermissionsMatrix,
  SubmitButton
} from '@/components/form'
import { Input } from '@/components/ui'
import { useLocale } from '@/hooks/useLocale'

import {
  defaultFieldsConfig,
  FieldName,
  getDefaultValues,
  resolver
} from './schema'

export const InviteForm = ({ isLoading, onSubmit, fieldsConfig = {} }) => {
  const { t } = useLocale()
  const fields = { ...defaultFieldsConfig, ...fieldsConfig }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver,
    defaultValues: getDefaultValues()
  })

  const removeHiddenFields = data => {
    const result = { ...data }

    Object.entries(fields).forEach(([key, visible]) => {
      if (!visible) {
        delete result[key]
      }
    })

    return result
  }

  const submit = data => onSubmit(removeHiddenFields(data))

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

          {fields[FieldName.POSITION] && (
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

      {fields[FieldName.PERMISSIONS] && (
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
