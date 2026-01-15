import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Plus } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

import { AdminInvitationDialog, ProfileDialog } from '@/components/dialogs'
import { defaultOptions, Pagination } from '@/components/Pagination'
import { Spinner } from '@/components/Spinner'
import { Table } from '@/components/Table'
import { Button } from '@/components/ui'
import useLocale from '@/hooks/useLocale'
import useModal from '@/hooks/useModal'
import { useAdmins } from '@/hooks/useOwner'
import useTableParams from '@/hooks/useTableParams'

import { getAccessibleColumns } from './columns'

export const AdminsPage = () => {
  const { t, formatDate } = useLocale()
  const { openModal } = useModal()

  const { apiParams, setParams } = useTableParams()

  const { data, isPending, isError } = useAdmins(apiParams)
  const { admins = [], pagination = defaultOptions } = data ?? {}

  const columns = useMemo(
    () => getAccessibleColumns(t, formatDate),
    [t, formatDate]
  )
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
    state: { sorting },
    manualPagination: true,
    pageCount: pagination.totalPages,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

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
      <div className='flex justify-end'>
        <Button variant='outline' onClick={handleInviteClick}>
          <Plus className='size-5' />
          {t('admin.invite.title')}
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
