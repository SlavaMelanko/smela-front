import { StatusBadge } from '@/components/badges'
import { getFullName } from '@/lib/format/user'

export const getColumns = (t, formatDate) => {
  const label = key => t(`table.members.${key}`)

  return [
    {
      accessorKey: 'id',
      header: label('id')
    },
    {
      accessorKey: 'name',
      header: label('name'),
      accessorFn: row => getFullName(row),
      cell: info => getFullName(info.row.original)
    },
    {
      accessorKey: 'email',
      header: label('email')
    },
    {
      accessorKey: 'status',
      header: label('status'),
      cell: info => <StatusBadge status={info.getValue()} />
    },
    {
      accessorKey: 'position',
      header: label('position')
    },
    {
      accessorKey: 'invitedBy',
      header: label('invitedBy'),
      cell: info => info.getValue() ?? ''
    },
    {
      accessorKey: 'joinedAt',
      header: label('joinedAt'),
      cell: info => formatDate(info.getValue())
    }
  ]
}

export const defaultHiddenColumns = {
  id: false,
  invitedBy: false
}
