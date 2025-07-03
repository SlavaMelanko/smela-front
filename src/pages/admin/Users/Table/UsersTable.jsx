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
import Table from '@/components/Table'
import TableToolbar from '@/components/TableToolbar'

import { defaultColumns } from './columns'

const UsersTable = ({ data }) => {
  const [columns] = useState(() => [...defaultColumns])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [sorting, setSorting] = useState([])

  const config = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility
    },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  const columnsMenu = config.getAllLeafColumns().map(column => ({
    label: column.id,
    icon: (
      <CheckIcon color={column.getIsVisible() ? 'green' : 'none'} size='xs' />
    ),
    onClick: () => {
      column.toggleVisibility()
    }
  }))

  return (
    <div className='table-container'>
      <TableToolbar columnsMenu={columnsMenu} />
      <Table config={config} />
    </div>
  )
}

export default UsersTable
