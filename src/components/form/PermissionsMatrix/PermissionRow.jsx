import { useController } from 'react-hook-form'

import { Switch } from '@/components/ui'
import { useLocale } from '@/hooks/useLocale'

export const PermissionRoot = ({ children }) => (
  <div className='grid grid-cols-3 items-center gap-4 py-2'>{children}</div>
)

const PermissionAction = ({ children }) => (
  <div className='flex items-center gap-2'>{children}</div>
)

export const PermissionRow = ({ resource, control }) => {
  const { t } = useLocale()

  const { field: viewField } = useController({
    name: `permissions.${resource}.view`,
    control
  })

  const { field: manageField } = useController({
    name: `permissions.${resource}.manage`,
    control
  })

  const handleViewChange = checked => {
    viewField.onChange(checked)

    // If view is disabled, disable manage too
    if (!checked && manageField.value) {
      manageField.onChange(false)
    }
  }

  const handleManageChange = checked => {
    manageField.onChange(checked)

    // If manage is enabled, enable view too
    if (checked && !viewField.value) {
      viewField.onChange(true)
    }
  }

  return (
    <PermissionRoot>
      <div className='font-medium'>
        {t(`permissions.resources.values.${resource}`)}
      </div>

      <PermissionAction>
        <Switch
          checked={viewField.value}
          onCheckedChange={handleViewChange}
          aria-label={t('permissions.actions.values.view')}
        />
      </PermissionAction>

      <PermissionAction>
        <Switch
          checked={manageField.value}
          onCheckedChange={handleManageChange}
          aria-label={t('permissions.actions.values.manage')}
        />
      </PermissionAction>
    </PermissionRoot>
  )
}
