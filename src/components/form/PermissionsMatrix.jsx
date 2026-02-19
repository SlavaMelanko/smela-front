import { useController } from 'react-hook-form'

import { Switch } from '@/components/ui'
import { useLocale } from '@/hooks/useLocale'

const DEFAULT_RESOURCES = ['users', 'teams']
const ACTIONS = ['view', 'manage']

const PermissionRoot = ({ children }) => (
  <div className='grid grid-cols-3 items-center justify-items-center gap-4'>
    {children}
  </div>
)

const PermissionAction = ({ children }) => (
  <div className='flex items-center gap-2'>{children}</div>
)

const PermissionHeader = () => {
  const { t } = useLocale()

  return (
    <PermissionRoot>
      <span className='justify-self-start text-base leading-normal text-muted-foreground'>
        {t('permissions.resources.name')}
      </span>
      {ACTIONS.map(action => (
        <span
          key={action}
          className='text-base leading-normal text-muted-foreground'
        >
          {t(`permissions.actions.values.${action}`)}
        </span>
      ))}
    </PermissionRoot>
  )
}

const PermissionRow = ({ resource, control }) => {
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
      <div className='justify-self-start font-medium'>
        {t(`permissions.resources.values.${resource}`)}
      </div>

      {ACTIONS.map(action => (
        <PermissionAction key={action}>
          <Switch
            checked={action === 'view' ? viewField.value : manageField.value}
            onCheckedChange={
              action === 'view' ? handleViewChange : handleManageChange
            }
            aria-label={t(`permissions.actions.values.${action}`)}
          />
        </PermissionAction>
      ))}
    </PermissionRoot>
  )
}

export const PermissionsMatrix = ({
  control,
  resources = DEFAULT_RESOURCES
}) => (
  <div className='flex flex-col gap-4'>
    <PermissionHeader />
    {resources.map(resource => (
      <PermissionRow key={resource} resource={resource} control={control} />
    ))}
  </div>
)
