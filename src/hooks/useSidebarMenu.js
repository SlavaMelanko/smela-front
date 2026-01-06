import { menuByRole, userMenuItems } from '@/components/Sidebar/menu'
import { useCurrentUser } from '@/hooks/useAuth'

const useSidebarMenu = () => {
  const { user } = useCurrentUser()

  const items = user?.role ? (menuByRole[user.role] ?? userMenuItems) : []

  return { items }
}

export default useSidebarMenu
