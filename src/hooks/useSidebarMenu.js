import { useMemo } from 'react'

import { menuByRole, userMenuItems } from '@/components/Sidebar'
import { useCurrentUser } from '@/hooks/useAuth'

const useSidebarMenu = () => {
  const { user } = useCurrentUser()

  const role = user?.role

  const items = useMemo(() => {
    if (!role) {
      return []
    }

    return menuByRole[role] ?? userMenuItems
  }, [role])

  return { items }
}

export default useSidebarMenu
