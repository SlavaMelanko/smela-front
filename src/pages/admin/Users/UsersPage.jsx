import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { PencilIcon } from 'lucide-react'
import { useState } from 'react'

import { ProfileDialog } from '@/components/dialogs'
import { defaultOptions, Pagination } from '@/components/Pagination'
import { Spinner } from '@/components/Spinner'
import { ErrorState } from '@/components/states'
import { Table } from '@/components/table'
import { useUsers } from '@/hooks/useAdmin'
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch'
import { useLocale } from '@/hooks/useLocale'
import { useModal } from '@/hooks/useModal'
import { useTableParams } from '@/hooks/useTableParams'
import { PageContent } from '@/pages/Page'

import { defaultHiddenColumns, getColumns } from './columns'
import { Filters } from './Filters'
import { Toolbar } from './Toolbar'

const coreRowModel = getCoreRowModel()
const filteredRowModel = getFilteredRowModel()
const sortedRowModel = getSortedRowModel()

export const UsersPage = () => {
  const { t, te, formatDate } = useLocale()
  const { openModal } = useModal()

  const { params, apiParams, setParams } = useTableParams()

  const handleSearch = value =>
    setParams({ search: value || null }, { resetPage: true })
  const { searchValue, setSearchValue } = useDebouncedSearch(
    params.search,
    handleSearch
  )

  const { data, isPending, isError, error, refetch } = useUsers(apiParams)
  const { users = [], pagination = defaultOptions } = data ?? {}

  const columns = getColumns(t, formatDate)
  const [columnVisibility, setColumnVisibility] = useState(defaultHiddenColumns)
  const [sorting, setSorting] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  const toggleFilters = () => setShowFilters(prev => !prev)

  const openUserProfile = user => {
    const close = openModal({
      children: <ProfileDialog profile={user} onClose={() => close()} />
    })
  }

  const contextMenu = [
    {
      icon: PencilIcon,
      label: t('contextMenu.edit'),
      onClick: openUserProfile
    }
  ]

  const changePage = page => {
    setParams({ page })
  }

  const changeLimit = limit => {
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

  if (isError) {
    return <ErrorState text={te(error)} onRetry={refetch} />
  }

  if (isPending && !data) {
    return <Spinner />
  }

  return (
    <PageContent>
      {/* Wrapper prevents PageContent gap when Filters is collapsed */}
      <div>
        <Toolbar
          columns={availableColumns}
          showFilters={showFilters}
          onToggleFilters={toggleFilters}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />
        <Filters isShow={showFilters} params={params} setParams={setParams} />
      </div>

      <Table
        config={config}
        onRowClick={openUserProfile}
        contextMenu={contextMenu}
      />
      <Pagination
        pagination={pagination}
        onPageChange={changePage}
        onLimitChange={changeLimit}
      />
    </PageContent>
  )
}
