import { LocaleProvider } from '@/contexts/LocaleContext'
import { UserStatus } from '@/lib/types'

import UsersTable from './UsersTable'

const users = [
  {
    id: 1,
    firstName: 'Rachel',
    lastName: 'Green',
    email: 'rachel@mail.com',
    status: UserStatus.NEW,
    createdAt: '2024-06-01'
  },
  {
    id: 2,
    firstName: 'Ross',
    lastName: 'Geller',
    email: 'ross@thegellers.com',
    status: UserStatus.VERIFIED,
    createdAt: '2024-06-05'
  },
  {
    id: 3,
    firstName: 'Monica',
    lastName: 'Geller',
    email: 'monica@thegellers.com',
    status: UserStatus.TRIAL,
    createdAt: '2024-06-08'
  },
  {
    id: 4,
    firstName: 'Chandler',
    lastName: 'Bing',
    email: 'chandler@mail.com',
    status: UserStatus.ACTIVE,
    createdAt: '2024-06-10'
  },
  {
    id: 5,
    firstName: 'Joey',
    lastName: 'Tribbiani',
    email: 'joey@mail.com',
    status: UserStatus.SUSPENDED,
    createdAt: '2024-06-12'
  },
  {
    id: 6,
    firstName: 'Phoebe',
    lastName: 'Buffay',
    email: 'phoebe@mail.com',
    status: UserStatus.ARCHIVED,
    createdAt: '2024-06-15'
  }
]

export default {
  title: 'UsersTable',
  component: UsersTable,
  parameters: {
    layout: 'centered'
  }
}

export const Default = {
  render: () => (
    <LocaleProvider>
      <UsersTable data={users} />
    </LocaleProvider>
  )
}
