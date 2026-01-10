import { Building2, User } from 'lucide-react'

import { Role } from '@/lib/types'

const RoleIcon = ({ role }) => {
  const Icon = role === Role.ENTERPRISE ? Building2 : User

  return (
    <span className='flex items-center justify-center'>
      <Icon className='size-5' />
    </span>
  )
}

export default RoleIcon
