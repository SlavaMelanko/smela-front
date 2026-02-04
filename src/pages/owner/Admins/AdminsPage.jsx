import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { MailIcon, PencilIcon } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

import { AddButton } from '@/components/buttons'
import { AdminInvitationDialog, ProfileDialog } from '@/components/dialogs'
import { SearchInput } from '@/components/inputs'
import { defaultOptions, Pagination } from '@/components/Pagination'
import { Spinner } from '@/components/Spinner'
import { ErrorState } from '@/components/states'
import { ColumnVisibilityDropdown, Table } from '@/components/table'
import useDebouncedSearch from '@/hooks/useDebouncedSearch'
import useLocale from '@/hooks/useLocale'
import useModal from '@/hooks/useModal'
import { useAdmins, useResendAdminInvitation } from '@/hooks/useOwner'
import useTableParams from '@/hooks/useTableParams'
import useToast from '@/hooks/useToast'
import { UserStatus } from '@/lib/types'

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
  const { mutate: resendInvitation, isPending: isResending } =
    useResendAdminInvitation()

  const { params, apiParams, setParams } = useTableParams()

  const handleSearch = useCallback(
    value => setParams({ search: value || null }, { resetPage: true }),
    [setParams]
  )
  const { searchValue, setSearchValue } = useDebouncedSearch(
    params.search,
    handleSearch
  )

  const { data, isPending, isError, error, refetch } = useAdmins(apiParams)
  const { admins = [], pagination = defaultOptions } = data ?? {}

  const columns = useMemo(() => getColumns(t, formatDate), [t, formatDate])
  const [columnVisibility, setColumnVisibility] = useState(defaultHiddenColumns)
  const [sorting, setSorting] = useState([])

  const handleInviteClick = useCallback(() => {
    const close = openModal({
      children: <AdminInvitationDialog onClose={() => close()} />
    })
  }, [openModal])

  const handleRowClick = useCallback(
    admin => {
      const close = openModal({
        children: <ProfileDialog profile={admin} onClose={() => close()} />
      })
    },
    [openModal]
  )

  const handleResendInvitation = useCallback(
    admin => {
      resendInvitation(admin.id, {
        onSuccess: () => {
          showSuccessToast(t('invitation.resend.success'))
        },
        onError: error => {
          showErrorToast(te(error))
        }
      })
    },
    [resendInvitation, showSuccessToast, showErrorToast, t, te]
  )

  const contextMenu = useMemo(
    () => [
      {
        icon: PencilIcon,
        label: t('contextMenu.edit'),
        onClick: handleRowClick
      },
      {
        icon: MailIcon,
        label: t('contextMenu.resendInvitation'),
        onClick: handleResendInvitation,
        isVisible: admin => admin.status === UserStatus.PENDING,
        disabled: isResending
      }
    ],
    [t, handleRowClick, handleResendInvitation, isResending]
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
    <div className='flex flex-col gap-4 md:gap-5'>
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
        <AddButton label={t('invite')} onClick={handleInviteClick} />
      </Toolbar>

      <Table
        config={config}
        onRowClick={handleRowClick}
        contextMenu={contextMenu}
      />
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
        onLimitChange={handleLimitChange}
      />
    </div>
  )
}
