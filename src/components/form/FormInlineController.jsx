import { Controller } from 'react-hook-form'

/**
 * Inline form field wrapper for controlled components.
 * Places the control and label on the same horizontal line.
 * Use with: Switch, Checkbox
 *
 * @example
 * <FormInlineController
 *   name="canView"
 *   label={t('permission.view')}
 *   control={control}
 *   render={({ field }) => (
 *     <Switch checked={field.value} onCheckedChange={field.onChange} />
 *   )}
 * />
 */
export const FormInlineController = ({
  name,
  label,
  control,
  defaultValue,
  rules,
  render
}) => (
  <div className='flex items-center gap-2'>
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => render({ field })}
    />
    {label && <label htmlFor={name}>{label}</label>}
  </div>
)
