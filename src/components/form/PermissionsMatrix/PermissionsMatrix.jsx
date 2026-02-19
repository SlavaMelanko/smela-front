import { PermissionRow } from './PermissionRow'

const DEFAULT_RESOURCES = ['users', 'teams']

export const PermissionsMatrix = ({
  control,
  resources = DEFAULT_RESOURCES
}) => (
  <>
    {resources.map(resource => (
      <PermissionRow key={resource} resource={resource} control={control} />
    ))}
  </>
)
