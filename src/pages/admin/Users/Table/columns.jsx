import { getFullName } from '@/lib/format/user'

import StatusBadge from './StatusBadge'

const getDefaultColumns = (t, formatDate) => [
  {
    accessorKey: 'id',
    header: t('table.users.id'),
    size: 60
  },
  {
    accessorKey: 'name',
    header: t('table.users.name'),
    accessorFn: row => getFullName(row),
    cell: info => getFullName(info.row.original),
    sortingFn: 'alphanumeric',
    size: 180
  },
  {
    accessorKey: 'email',
    header: t('table.users.email'),
    size: 220
  },
  {
    accessorKey: 'status',
    header: t('table.users.status'),
    size: 100,
    cell: info => <StatusBadge status={info.row.original.status} />
  },
  {
    accessorKey: 'createdAt',
    header: t('table.users.createdAt'),
    size: 140,
    cell: info => formatDate(info.getValue())
  }
]

export { getDefaultColumns }
