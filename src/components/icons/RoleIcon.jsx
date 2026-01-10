import { Building2, Crown, Shield, User, UserX } from 'lucide-react'

import { Role } from '@/lib/types'

const iconMap = {
  [Role.USER]: User,
  [Role.ENTERPRISE]: Building2,
  [Role.ADMIN]: Shield,
  [Role.OWNER]: Crown,
  [Role.GUEST]: UserX
}

export const RoleIcon = ({ role, className = 'size-5' }) => {
  const Icon = iconMap[role] || User

  return (
    <span className='flex items-center justify-center'>
      <Icon className={className} />
    </span>
  )
}
