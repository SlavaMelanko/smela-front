import { Crown, Shield, User } from 'lucide-react'

import { Role } from '@/lib/types'

const iconMap = {
  [Role.USER]: User,
  [Role.ADMIN]: Shield,
  [Role.OWNER]: Crown
}

export const RoleIcon = ({ role, className = 'size-5' }) => {
  const Icon = iconMap[role] || User

  return (
    <span className='flex items-center justify-center'>
      <Icon className={className} />
    </span>
  )
}
