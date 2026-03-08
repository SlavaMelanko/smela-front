import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'

import { InviteButton } from '@/components/buttons'
import { ProfileDialog } from '@/components/dialogs'
import { Spinner } from '@/components/Spinner'
import { EmptyState, ErrorState } from '@/components/states'
import { ColumnVisibilityDropdown, Table } from '@/components/table'
import {
  createInviteItem,
  createOpenItem
} from '@/components/table/contextMenuItems'
import { useLocale } from '@/hooks/useLocale'
import { useModal } from '@/hooks/useModal'
import { useTeamMembers } from '@/hooks/useTeam'

import { defaultHiddenColumns, getColumns } from './columns'
import { useInvite } from './useTeamMembersInvite'

const coreRowModel = getCoreRowModel()

const TeamMembersRoot = ({ children }) => (
  <div className='flex flex-col gap-4'>{children}</div>
)

const TeamMembersToolbar = ({ children }) => (
  <div className='flex min-h-11 justify-end gap-4'>{children}</div>
)

export const TeamMembers = ({ teamId }) => {
  const { t, formatDate, te } = useLocale()
  const { openModal } = useModal()
  const {
    data: members,
    isPending,
    isError,
    error,
    refetch
  } = useTeamMembers(teamId)
  const {
    openInviteDialog,
    handleResendInvite,
    isResending,
    handleCancelInvite,
    isCancelling
  } = useInvite(teamId)

  const openMemberProfile = member => {
    const close = openModal({
      children: <ProfileDialog profile={member} onClose={() => close()} />
    })
  }

  const contextMenu = [
    createOpenItem(t, openMemberProfile),
    createInviteItem(t, {
      handleResendInvite,
      isResending,
      handleCancelInvite,
      isCancelling
    })
  ]

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

  if (isError) {
    return <ErrorState text={te(error)} onRetry={refetch} />
  }

  if (isPending && !members) {
    return <Spinner />
  }

  if (!members.length) {
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
    <TeamMembersRoot>
      <TeamMembersToolbar>
        <ColumnVisibilityDropdown
          config={config}
          createLabel={id => t(`table.members.${id}`)}
        />
        <InviteButton label={t('invite.cta')} onClick={openInviteDialog} />
      </TeamMembersToolbar>

      <Table
        config={config}
        onRowClick={openMemberProfile}
        contextMenu={contextMenu}
      />
    </TeamMembersRoot>
  )
}
