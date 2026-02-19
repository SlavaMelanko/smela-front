import { useLocale } from '@/hooks/useLocale'

import { PermissionRoot, PermissionRow } from './PermissionRow'

const DEFAULT_RESOURCES = ['users', 'teams']

const PermissionHeader = () => {
  const { t } = useLocale()

  return (
    <PermissionRoot>
      <span className='justify-self-start text-base leading-normal text-muted-foreground'>
        {t('permissions.resources.name')}
      </span>
      <span className='text-base leading-normal text-muted-foreground'>
        {t('permissions.actions.values.view')}
      </span>
      <span className='text-base leading-normal text-muted-foreground'>
        {t('permissions.actions.values.manage')}
      </span>
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
