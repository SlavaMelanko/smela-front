import { ShieldCheck, User } from 'lucide-react'

import { Role } from '@/lib/types'

export const getRoleIcon = role => {
  if (role === Role.ADMIN) {
    return ShieldCheck
  }

  return User
}
