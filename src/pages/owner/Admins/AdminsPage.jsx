import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

import { AdminInvitationDialog, ProfileDialog } from '@/components/dialogs'
import { SearchInput } from '@/components/inputs'
import { defaultOptions, Pagination } from '@/components/Pagination'
import { Spinner } from '@/components/Spinner'
import { ColumnVisibilityDropdown, Table } from '@/components/table'
import { Button } from '@/components/ui'
import useDebouncedSearch from '@/hooks/useDebouncedSearch'
import useLocale from '@/hooks/useLocale'
import useModal from '@/hooks/useModal'
import { useAdmins } from '@/hooks/useOwner'
import useTableParams from '@/hooks/useTableParams'

import { getAccessibleColumns } from './columns'

export const AdminsPage = () => {
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

  const { data, isPending, isError } = useAdmins(apiParams)
  const { admins = [], pagination = defaultOptions } = data ?? {}

  const columns = useMemo(
    () => getAccessibleColumns(t, formatDate),
    [t, formatDate]
  )
  const [columnVisibility, setColumnVisibility] = useState({
    id: false,
    updatedAt: false
  })
  const [sorting, setSorting] = useState([])

  const handleRowClick = useCallback(
    admin => {
      const close = openModal({
        children: <ProfileDialog profile={admin} onClose={() => close()} />
      })
    },
    [openModal]
  )

  const handleInviteClick = useCallback(() => {
    const close = openModal({
      children: <AdminInvitationDialog onClose={() => close()} />
    })
  }, [openModal])

  const handlePageChange = page => {
    setParams({ page })
  }

  const handleLimitChange = limit => {
    setParams({ limit }, { resetPage: true })
  }

  // eslint-disable-next-line react-hooks/incompatible-library
  const config = useReactTable({
    data: admins,
    columns,
    state: { sorting, columnVisibility },
    manualPagination: true,
    pageCount: pagination.totalPages,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getCoreRowModel,
    getSortedRowModel
  })

  const availableColumns = config.getAllLeafColumns().map(column => ({
    id: column.id,
    label: t(`table.users.${column.id}`),
    getIsVisible: () => column.getIsVisible(),
    toggleVisibility: () => column.toggleVisibility()
  }))

  if (isPending) {
    return (
      <div className='flex flex-col gap-2'>
        <Spinner text={t('loading')} />
      </div>
    )
  }

  if (isError) {
    return (
      <div className='flex flex-col gap-2'>
        <p>{t('error.loading')}</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4 md:gap-5'>
      <div className='flex min-h-11 items-center gap-4'>
        <SearchInput
          className='flex-1'
          placeholder={t('searchBy.users')}
          value={searchValue}
          onChange={setSearchValue}
        />
        <ColumnVisibilityDropdown
          label={t('table.column_plural')}
          columns={availableColumns}
        />
        <Button
          variant='outline'
          onClick={handleInviteClick}
          aria-label={t('invite')}
        >
          <Plus className='size-5' />
          <span className='hidden sm:inline'>{t('invite')}</span>
        </Button>
      </div>
      <Table config={config} onRowClick={handleRowClick} />
      <div className='mt-2'>
        <Pagination
          pagination={pagination}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
      </div>
    </div>
  )
}
