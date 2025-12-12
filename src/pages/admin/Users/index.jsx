import './styles.scss'

import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useState } from 'react'

import { ProfileModal } from '@/components/dialogs/ProfileModal'
import { CheckIcon } from '@/components/icons'
import Pagination from '@/components/Pagination'
import Spinner from '@/components/Spinner'
import Table from '@/components/Table'
import TableToolbar from '@/components/TableToolbar'
import { useUsers } from '@/hooks/useAdmin'
import useLocale from '@/hooks/useLocale'
import useModal from '@/hooks/useModal'

import { getAccessibleColumns } from './columns'
import Filters from './Filters'
import useUsersTableParams from './hooks/useUsersTableParams'

const UsersTable = () => {
  const { t, formatDate } = useLocale()
  const { openModal } = useModal()

  const { params, apiParams, setParams } = useUsersTableParams()
  const { data, isPending, isError } = useUsers(apiParams)

  const users = data?.users ?? []
  const pagination = data?.pagination ?? {
    page: 1,
    limit: 25,
    total: 0,
    totalPages: 0
  }

  const [columns] = useState(() => [...getAccessibleColumns(t, formatDate)])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [sorting, setSorting] = useState([])

  const [showFilters, setShowFilters] = useState(false)

  const toggleFilters = () => setShowFilters(prev => !prev)

  const handleRowClick = user => {
    const close = openModal({
      children: <ProfileModal profile={user} onClose={() => close()} />
    })
  }

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
      />
      <Filters isShow={showFilters} params={params} setParams={setParams} />
      <Table config={config} onRowClick={handleRowClick} />
      <div className='table-container__pagination'>
        <Pagination
          page={pagination.page}
          limit={params.limit}
          total={pagination.total}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
      </div>
    </div>
  )
}

export default UsersTable
