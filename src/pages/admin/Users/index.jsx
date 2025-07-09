import './styles.scss'

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useState } from 'react'

import { CheckIcon } from '@/components/icons'
import Pagination from '@/components/Pagination'
import Table from '@/components/Table'
import TableToolbar from '@/components/TableToolbar'
import useLocale from '@/hooks/useLocale'

import { getAccessibleColumns } from './columns'
import Filters from './Filters'

const UsersTable = ({ data = [] }) => {
  const { t, formatDate } = useLocale()

  const [columns] = useState(() => [...getAccessibleColumns(t, formatDate)])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [sorting, setSorting] = useState([])

  const [showFilters, setShowFilters] = useState(false)

  const toggleFilters = () => setShowFilters(prev => !prev)

  const config = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility
    },
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltl',
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  const availableColumns = config.getAllLeafColumns().map(column => ({
    label: t(`table.users.${column.id}`),
    icon: (
      <CheckIcon color={column.getIsVisible() ? 'green' : 'none'} size='xs' />
    ),
    onClick: () => {
      column.toggleVisibility()
    }
  }))

  return (
    <div className='table-container'>
      <TableToolbar
        columns={availableColumns}
        showFilters={showFilters}
        onToggleFilters={toggleFilters}
      />
      <Filters isShow={showFilters} />
      <Table config={config} />
      <div className='table-container__pagination'>
        <Pagination />
      </div>
    </div>
  )
}

export default UsersTable
