import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useCallback, useMemo, useState } from 'react'

import { Error } from '@/components/alerts'
import { ProfileDialog } from '@/components/dialogs'
import { defaultOptions, Pagination } from '@/components/Pagination'
import { Spinner } from '@/components/Spinner'
import { Table } from '@/components/table'
import { useUsers } from '@/hooks/useAdmin'
import useDebouncedSearch from '@/hooks/useDebouncedSearch'
import useLocale from '@/hooks/useLocale'
import useModal from '@/hooks/useModal'
import useTableParams from '@/hooks/useTableParams'

import { getAccessibleColumns } from './columns'
import { Filters } from './Filters'
import { Toolbar } from './Toolbar'

const coreRowModel = getCoreRowModel()
const filteredRowModel = getFilteredRowModel()
const sortedRowModel = getSortedRowModel()

export const UsersPage = () => {
  const { t, formatDate } = useLocale()
  const { openModal } = useModal()

  const { params, apiParams, setParams } = useTableParams()

  const handleSearch = useCallback(
    value => setParams({ search: value || null }, { resetPage: true }),
    [setParams]
  )
  const { searchValue, setSearchValue } = useDebouncedSearch(
    params.search,
    handleSearch
  )

  const { data, isPending, isError } = useUsers(apiParams)
  const { users = [], pagination = defaultOptions } = data ?? {}

  const columns = useMemo(
    () => getAccessibleColumns(t, formatDate),
    [t, formatDate]
  )
  const [columnVisibility, setColumnVisibility] = useState({
    id: false,
    updatedAt: false
  })
  const [sorting, setSorting] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  const toggleFilters = () => setShowFilters(prev => !prev)

  const handleRowClick = useCallback(
    user => {
      const close = openModal({
        children: <ProfileDialog profile={user} onClose={() => close()} />
      })
    },
    [openModal]
  )

  const handlePageChange = page => {
    setParams({ page })
  }

  const handleLimitChange = limit => {
    setParams({ limit }, { resetPage: true })
  }

  // TanStack Table uses interior mutability which is incompatible with React Compiler's memoization.
  // See: https://react.dev/reference/eslint-plugin-react-hooks/lints/incompatible-library
  // eslint-disable-next-line react-hooks/incompatible-library
  const config = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
      columnVisibility
    },
    manualPagination: true,
    pageCount: pagination.totalPages,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getCoreRowModel: coreRowModel,
    getFilteredRowModel: filteredRowModel,
    getSortedRowModel: sortedRowModel
  })

  const availableColumns = config.getAllLeafColumns().map(column => ({
    id: column.id,
    label: t(`table.users.${column.id}`),
    getIsVisible: () => column.getIsVisible(),
    toggleVisibility: () => column.toggleVisibility()
  }))

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <Error text={t('error.loading')} />
  }

  return (
    <div className='flex flex-col gap-2'>
      <Toolbar
        columns={availableColumns}
        showFilters={showFilters}
        onToggleFilters={toggleFilters}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />

      <Filters isShow={showFilters} params={params} setParams={setParams} />

      <Table config={config} onRowClick={handleRowClick} />
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </div>
  )
}
