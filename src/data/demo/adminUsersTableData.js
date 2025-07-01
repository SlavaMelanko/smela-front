export const users = [
  {
    id: 1,
    firstName: 'Ivan',
    lastName: 'Ivanov',
    email: 'ivan@example.com',
    status: 'active',
    createdAt: '2024-06-01'
  },
  {
    id: 2,
    firstName: 'Petro',
    lastName: 'Petrenko',
    email: 'petro@example.com',
    status: 'pending',
    createdAt: '2024-06-10'
  },
  {
    id: 3,
    firstName: 'Olena',
    lastName: 'Shevchenko',
    email: 'olena@example.com',
    status: 'blocked',
    createdAt: '2024-06-15'
  }
]

export const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 60
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: info =>
      info.row.original.firstName + ' ' + info.row.original.lastName,
    size: 180
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 220
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 100
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    size: 140
  }
]

export const initialColumnVisibility = { createdAt: false }
