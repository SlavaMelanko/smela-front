import { LocaleProvider } from '@/contexts/LocaleContext'
import { Role, UserStatus } from '@/lib/types'

import UsersTable from './index'

const users = [
  {
    id: 1,
    firstName: 'Rachel',
    lastName: 'Green',
    email: 'rachel@mail.com',
    status: UserStatus.NEW,
    role: Role.USER,
    createdAt: '2024-06-01'
  },
  {
    id: 2,
    firstName: 'Ross',
    lastName: 'Geller',
    email: 'ross@thegellers.com',
    status: UserStatus.VERIFIED,
    role: Role.ENTERPRISE,
    createdAt: '2024-06-05'
  },
  {
    id: 3,
    firstName: 'Monica',
    lastName: 'Geller',
    email: 'monica@thegellers.com',
    status: UserStatus.TRIAL,
    role: Role.ADMIN,
    createdAt: '2024-06-08'
  },
  {
    id: 4,
    firstName: 'Chandler',
    lastName: 'Bing',
    email: 'chandler@mail.com',
    status: UserStatus.ACTIVE,
    role: Role.USER,
    createdAt: '2024-06-10'
  },
  {
    id: 5,
    firstName: 'Joey',
    lastName: 'Tribbiani',
    email: 'joey@mail.com',
    status: UserStatus.SUSPENDED,
    role: Role.ENTERPRISE,
    createdAt: '2024-06-12'
  },
  {
    id: 6,
    firstName: 'Phoebe',
    lastName: 'Buffay',
    email: 'phoebe@mail.com',
    status: UserStatus.ARCHIVED,
    role: Role.USER,
    createdAt: '2024-06-15'
  }
]

export default {
  title: 'UsersTable',
  component: UsersTable,
  parameters: {
    layout: 'top'
  },
  decorators: [
    Story => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    )
  ]
}

export const Default = {
  render: () => (
    <LocaleProvider>
      <UsersTable data={users} />
    </LocaleProvider>
  )
}
