import { StatusBadge } from '@/components/badges'
import { getFullName } from '@/lib/format/user'

export const getAccessibleColumns = (t, formatDate) => {
  const label = key => t(`table.users.${key}`)

  return [
    {
      accessorKey: 'id',
      header: label('id'),
      size: 60
    },
    {
      accessorKey: 'name',
      header: label('name'),
      accessorFn: row => getFullName(row),
      cell: info => getFullName(info.row.original),
      sortingFn: 'alphanumeric',
      size: 180
    },
    {
      accessorKey: 'email',
      header: label('email'),
      size: 220
    },
    {
      accessorKey: 'status',
      header: label('status'),
      size: 100,
      cell: info => <StatusBadge status={info.getValue()} />
    },
    {
      accessorKey: 'createdAt',
      header: label('createdAt'),
      size: 140,
      cell: info => formatDate(info.getValue())
    },
    {
      accessorKey: 'updatedAt',
      header: label('updatedAt'),
      size: 140,
      cell: info => formatDate(info.getValue())
    }
  ]
}
