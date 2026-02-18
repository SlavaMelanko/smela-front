import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { MailIcon, Send, User, X } from 'lucide-react'
import { useState } from 'react'

import { InviteButton } from '@/components/buttons'
import { ProfileDialog } from '@/components/dialogs'
import { SearchInput } from '@/components/inputs'
import { Pagination } from '@/components/Pagination'
import { Spinner } from '@/components/Spinner'
import { ErrorState } from '@/components/states'
import { ColumnVisibilityDropdown, Table } from '@/components/table'
import { useLocale } from '@/hooks/useLocale'
import { useModal } from '@/hooks/useModal'
import { useAdmins } from '@/hooks/useOwner'
import { useTableState } from '@/hooks/useTableState'
import { UserStatus } from '@/lib/types'
import { PageContent } from '@/pages/Page'

import { defaultHiddenColumns, getColumns } from './columns'
import { useInvite } from './useInvite'

const coreRowModel = getCoreRowModel()
const sortedRowModel = getSortedRowModel()

const Toolbar = ({ children }) => (
  <div className='flex min-h-11 items-center gap-4'>{children}</div>
)

export const AdminsPage = () => {
  const { t, te, formatDate } = useLocale()
  const { openModal } = useModal()

  const { apiParams, setParams, searchValue, setSearchValue } = useTableState()
  const { admins, pagination, isPending, isError, error, refetch } =
    useAdmins(apiParams)
  const {
    openInviteDialog,
    handleResendInvite,
    isResending,
    handleCancelInvite,
    isCancelling
  } = useInvite()

  const columns = getColumns(t, formatDate)
  const [columnVisibility, setColumnVisibility] = useState(defaultHiddenColumns)
  const [sorting, setSorting] = useState([])

  const openAdminProfile = admin => {
    const close = openModal({
      children: <ProfileDialog profile={admin} onClose={() => close()} />
    })
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
          onClick: handleCancelInvite,
          variant: 'destructive',
          disabled: isCancelling
        }
      ]
    }
  ]

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

  const changeLimit = limit => {
    setParams({ limit }, { resetPage: true })
  }

  const changePage = page => {
    setParams({ page })
  }

  if (isError) {
    return <ErrorState text={te(error)} onRetry={refetch} />
  }

  if (isPending && !admins.length) {
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
          config={config}
          createLabel={id => t(`table.users.${id}`)}
        />
        <InviteButton label={t('invite.cta')} onClick={openInviteDialog} />
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
