import { menuByRole, userMenuItems } from '@/components/Sidebar'
import { useCurrentUser } from '@/hooks/useAuth'

export const useSidebarMenu = () => {
  const { user } = useCurrentUser()

  const items = user?.role ? (menuByRole[user.role] ?? userMenuItems) : []

  return { items }
}
