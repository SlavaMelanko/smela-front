import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useState } from 'react'

import Table from '@/components/Table'

import { COLUMNS, getColumns } from './columns'

const UsersTable = ({ data }) => {
  const [sorting, setSorting] = useState([])

  const processedColumns = getColumns(COLUMNS)

  const config = useReactTable({
    data,
    columns: processedColumns,
    state: {
      sorting
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  return <Table config={config} />
}

export default UsersTable
