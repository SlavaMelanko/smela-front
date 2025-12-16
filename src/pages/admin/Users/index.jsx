import './styles.scss'

import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useCallback, useMemo, useState } from 'react'

import { ProfileModal } from '@/components/dialogs/ProfileModal'
import { CheckIcon } from '@/components/icons'
import Pagination, { defaultOptions } from '@/components/Pagination'
import Spinner from '@/components/Spinner'
import Table from '@/components/Table'
import TableToolbar from '@/components/TableToolbar'
import { useUsers } from '@/hooks/useAdmin'
import useLocale from '@/hooks/useLocale'
import useModal from '@/hooks/useModal'

import { getAccessibleColumns } from './columns'
import Filters from './Filters'
import useDebouncedSearch from './hooks/useDebouncedSearch'
import useUsersTableParams from './hooks/useUsersTableParams'

const UsersTable = () => {
  const { t, formatDate } = useLocale()
  const { openModal } = useModal()

  const { params, apiParams, setParams } = useUsersTableParams()
  const [searchValue, setSearchValue] = useDebouncedSearch(
    params.search,
    value => setParams({ search: value || null }, { resetPage: true })
  )
  const { data, isPending, isError } = useUsers(apiParams)
  const { users = [], pagination = defaultOptions } = data ?? {}

  const columns = useMemo(
    () => getAccessibleColumns(t, formatDate),
    [t, formatDate]
  )
  const [columnVisibility, setColumnVisibility] = useState({})
  const [sorting, setSorting] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  const toggleFilters = () => setShowFilters(prev => !prev)

  const handleRowClick = useCallback(
    user => {
      const close = openModal({
        children: <ProfileModal profile={user} onClose={() => close()} />
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

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table known limitation
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
    columnResizeDirection: 'ltl',
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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

  if (isPending) {
    return (
      <div className='table-container table-container--loading'>
        <Spinner centered text={t('loading')} />
      </div>
    )
  }

  if (isError) {
    return (
      <div className='table-container table-container--error'>
        <p>{t('error.loading')}</p>
      </div>
    )
  }

  return (
    <div className='table-container'>
      <TableToolbar
        columns={availableColumns}
        showFilters={showFilters}
        onToggleFilters={toggleFilters}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      />
      <Filters isShow={showFilters} params={params} setParams={setParams} />
      <Table config={config} onRowClick={handleRowClick} />
      <div className='table-container__pagination'>
        <Pagination
          pagination={pagination}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
      </div>
    </div>
  )
}

export default UsersTable
