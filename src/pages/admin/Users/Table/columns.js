import { getFullName } from '@/lib/format/user'

const defaultColumns = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 60
  },
  {
    accessorKey: 'name',
    header: 'Name',
    accessorFn: row => getFullName(row),
    cell: info => getFullName(info.row.original),
    sortingFn: 'alphanumeric',
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

export { defaultColumns }
