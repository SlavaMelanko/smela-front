import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'

import { InviteButton } from '@/components/buttons'
import { ProfileDialog } from '@/components/dialogs'
import { Spinner } from '@/components/Spinner'
import { EmptyState, ErrorState } from '@/components/states'
import { ColumnVisibilityDropdown, Table } from '@/components/table'
import { useLocale } from '@/hooks/useLocale'
import { useModal } from '@/hooks/useModal'
import { useTeamMembers } from '@/hooks/useTeam'

import { defaultHiddenColumns, getColumns } from './columns'
import { useInvite } from './useInvite'

const coreRowModel = getCoreRowModel()

const Toolbar = ({ children }) => (
  <div className='flex min-h-11 justify-end gap-4'>{children}</div>
)

export const Members = ({ teamId }) => {
  const { t, formatDate, te } = useLocale()
  const { openModal } = useModal()
  const {
    data: members,
    isPending,
    isError,
    error,
    refetch
  } = useTeamMembers(teamId)
  const { openInviteDialog } = useInvite(teamId)

  const openUserProfile = member => {
    const close = openModal({
      children: <ProfileDialog profile={member} onClose={() => close()} />
    })
  }

  const columns = getColumns(t, formatDate)
  const [columnVisibility, setColumnVisibility] = useState(defaultHiddenColumns)

  // eslint-disable-next-line react-hooks/incompatible-library
  const config = useReactTable({
    data: members ?? [],
    columns,
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: coreRowModel
  })

  if (isPending && !members) {
    return <Spinner />
  }

  if (isError) {
    return <ErrorState text={te(error)} onRetry={refetch} />
  }

  const isEmpty = members.length === 0

  if (isEmpty) {
    return (
      <EmptyState text={t('team.members.empty')}>
        <InviteButton
          label={t('invite.cta')}
          onClick={openInviteDialog}
          hideTextOnMobile={false}
        />
      </EmptyState>
    )
  }

  return (
    <div className='flex flex-col gap-4'>
      <Toolbar>
        <ColumnVisibilityDropdown
          config={config}
          createLabel={id => t(`table.members.${id}`)}
        />
        <InviteButton label={t('invite.cta')} onClick={openInviteDialog} />
      </Toolbar>

      <Table config={config} onRowClick={openUserProfile} />
    </div>
  )
}
