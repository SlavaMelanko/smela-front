import { Controller } from 'react-hook-form'

import useLocale from '@/hooks/useLocale'

import Container from '../components/Container'
import Error from '../components/Error'
import InputWrapper from '../components/InputWrapper'
import Label from '../components/Label'

/**
 * Form field wrapper for controlled components using Controller.
 * Use with: Select, Switch, DatePicker, Multiselect
 *
 * For native inputs (Input, Textarea, Checkbox), use FormField with register().
 *
 * @example
 * <FormController
 *   name="role"
 *   label={t('role.name')}
 *   control={control}
 *   error={errors.role}
 *   render={({ field }) => (
 *     <Select {...field} options={roleOptions} />
 *   )}
 * />
 */
const FormController = ({
  name,
  label,
  optional,
  control,
  error,
  defaultValue,
  rules,
  render
}) => {
  const { t } = useLocale()

  return (
    <Container hasError={!!error}>
      {label && (
        <Label htmlFor={name} optional={optional}>
          {label}
        </Label>
      )}
      <InputWrapper>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          rules={rules}
          render={({ field }) => render({ field, error })}
        />
      </InputWrapper>
      {/* Always rendered for smooth enter/exit CSS transitions */}
      <Error message={error?.message ? t(error.message) : null} />
    </Container>
  )
}

export default FormController
