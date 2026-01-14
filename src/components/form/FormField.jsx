import { cloneElement } from 'react'

import useLocale from '@/hooks/useLocale'

import { Error, FieldWrapper, InputWrapper, Label } from './elements'

/**
 * Form field wrapper for native inputs using register().
 * Use with: Input, Textarea, Checkbox
 *
 * For controlled components (Select, Switch, DatePicker), use FormController.
 *
 * @example
 * <FormField name="email" label={t('email.label')} error={errors.email}>
 *   <TextInput placeholder={t('email.placeholder')} {...register('email')} />
 * </FormField>
 */
export const FormField = ({ name, label, optional, children, error }) => {
  const { t } = useLocale()

  const wrappedChild = cloneElement(children, {
    ...children.props,
    name,
    id: name,
    error
  })

  return (
    <FieldWrapper hasError={!!error}>
      {label && (
        <Label htmlFor={name} optional={optional}>
          {label}
        </Label>
      )}
      <InputWrapper>{wrappedChild}</InputWrapper>
      {/* Always rendered for smooth enter/exit CSS transitions */}
      <Error message={error?.message ? t(error.message) : null} />
    </FieldWrapper>
  )
}
