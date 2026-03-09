import { PermissionsSection } from '@/components/profile'
import {
  useAdminPermissions,
  useUpdateAdminPermissions
} from '@/hooks/useOwner'

export const PermissionsTab = ({ adminId }) => {
  const { data: permissions, isPending: isLoading } =
    useAdminPermissions(adminId)
  const { mutate: update, isPending: isUpdating } =
    useUpdateAdminPermissions(adminId)

  return (
    <PermissionsSection
      permissions={permissions}
      isLoading={isLoading}
      update={update}
      isUpdating={isUpdating}
    />
  )
}
