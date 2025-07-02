import { getFullName } from '@/lib/format/user'

const COLUMNS = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 60
  },
  {
    accessorKey: 'name',
    header: 'Name',
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

const getColumns = (baseColumns = []) =>
  baseColumns.map(column => {
    if (column.accessorKey === 'name') {
      return {
        ...column,
        accessorFn: row => getFullName(row),
        cell: info => getFullName(info.row.original),
        sortingFn: 'alphanumeric'
      }
    }

    return column
  })

export { COLUMNS, getColumns }
