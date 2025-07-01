import { getFullName } from '@/lib/format/user'

export function getUsersColumns(baseColumns = []) {
  return baseColumns.map(column => {
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
}
