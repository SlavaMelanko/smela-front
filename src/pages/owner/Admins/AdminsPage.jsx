import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { MailIcon, Send, User, X } from 'lucide-react'
import { useState } from 'react'

import { InviteButton } from '@/components/buttons'
import { CreateAdminDialog, ProfileDialog } from '@/components/dialogs'
import { SearchInput } from '@/components/inputs'
import { defaultOptions, Pagination } from '@/components/Pagination'
import { Spinner } from '@/components/Spinner'
import { ErrorState } from '@/components/states'
import { ColumnVisibilityDropdown, Table } from '@/components/table'
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch'
import { useLocale } from '@/hooks/useLocale'
import { useModal } from '@/hooks/useModal'
import { useAdmins, useResendAdminInvite } from '@/hooks/useOwner'
import { useTableParams } from '@/hooks/useTableParams'
import { useToast } from '@/hooks/useToast'
import { UserStatus } from '@/lib/types'
import { PageContent } from '@/pages/Page'

import { defaultHiddenColumns, getColumns } from './columns'

const coreRowModel = getCoreRowModel()
const sortedRowModel = getSortedRowModel()

const Toolbar = ({ children }) => (
  <div className='flex min-h-11 items-center gap-4'>{children}</div>
)

export const AdminsPage = () => {
  const { t, te, formatDate } = useLocale()
  const { openModal } = useModal()
  const { showSuccessToast, showErrorToast } = useToast()
  const { mutate: resendInvite, isPending: isResending } =
    useResendAdminInvite()

  const { params, apiParams, setParams } = useTableParams()

  const handleSearch = value =>
    setParams({ search: value || null }, { resetPage: true })
  const { searchValue, setSearchValue } = useDebouncedSearch(
    params.search,
    handleSearch
  )

  const { data, isPending, isError, error, refetch } = useAdmins(apiParams)
  const { admins = [], pagination = defaultOptions } = data ?? {}

  const columns = getColumns(t, formatDate)
  const [columnVisibility, setColumnVisibility] = useState(defaultHiddenColumns)
  const [sorting, setSorting] = useState([])

  const openCreateAdminDialog = () => {
    const close = openModal({
      children: <CreateAdminDialog onClose={() => close()} />
    })
  }

  const openAdminProfile = admin => {
    const close = openModal({
      children: <ProfileDialog profile={admin} onClose={() => close()} />
    })
  }

  const handleResendInvite = admin => {
    resendInvite(admin.id, {
      onSuccess: () => {
        showSuccessToast(t('invite.resend.success'))
      },
      onError: error => {
        showErrorToast(te(error))
      }
    })
  }

  const handleCancelInvitation = () => {
    // TODO: Implement cancel invitation
  }

  const contextMenu = [
    {
      icon: User,
      label: t('contextMenu.open'),
      onClick: openAdminProfile
    },
    {
      icon: MailIcon,
      label: t('contextMenu.invite'),
      isVisible: admin => admin.status === UserStatus.PENDING,
      items: [
        {
          icon: Send,
          label: t('contextMenu.resend'),
          onClick: handleResendInvite,
          disabled: isResending
        },
        {
          icon: X,
          label: t('contextMenu.cancel'),
          onClick: handleCancelInvitation,
          variant: 'destructive'
        }
      ]
    }
  ]

  const changePage = page => {
    setParams({ page })
  }

  const changeLimit = limit => {
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
    getCoreRowModel: coreRowModel,
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
      <Toolbar>
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
        <InviteButton label={t('invite.cta')} onClick={openCreateAdminDialog} />
      </Toolbar>

      <Table
        config={config}
        onRowClick={openAdminProfile}
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
