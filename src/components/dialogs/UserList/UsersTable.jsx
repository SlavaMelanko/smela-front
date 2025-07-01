import './styles.scss'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useState } from 'react'

import { PrimaryButton } from '@/components/buttons'
import Input from '@/components/inputs/Input'
import { TableCell, TableHeader, TableRow } from '@/components/Table'

import { getUsersColumns } from './usersColumns'

const UsersTable = ({ data, columns, initialColumnVisibility }) => {
  const [columnVisibility, setColumnVisibility] = useState(
    initialColumnVisibility || {}
  )
  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')

  const processedColumns = getUsersColumns(columns)

  const table = useReactTable({
    data,
    columns: processedColumns,
    state: {
      sorting,
      globalFilter,
      columnVisibility
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  return (
    <div className='user-list'>
      <div className='user-list__controls'>
        <Input
          className='user-list__search-input'
          value={globalFilter || ''}
          onChange={event => setGlobalFilter(event.target.value)}
          placeholder='Search...'
        />
        <PrimaryButton
          className='user-list__toggle-btn'
          onClick={() =>
            setColumnVisibility(visibility => ({
              ...visibility,
              createdAt: !visibility.createdAt
            }))
          }
        >
          Toggle Created At
        </PrimaryButton>
      </div>
      <table className='table' style={{ width: '100%' }}>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableCell
                  key={header.id}
                  header
                  style={{ width: header.getSize?.() }}
                  onClick={header.column.getToggleSortingHandler?.()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted()
                    ? header.column.getIsSorted() === 'asc'
                      ? ' 🔼'
                      : ' 🔽'
                    : ''}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </table>
      <div className='user-list__pagination'>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default UsersTable
