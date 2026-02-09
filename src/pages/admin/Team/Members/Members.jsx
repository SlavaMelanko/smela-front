import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'

import { InviteButton } from '@/components/buttons'
import { MemberInvitationDialog, ProfileDialog } from '@/components/dialogs'
import { EmptyState } from '@/components/states'
import { ColumnVisibilityDropdown, Table } from '@/components/table'
import { useLocale } from '@/hooks/useLocale'
import { useModal } from '@/hooks/useModal'

import { defaultHiddenColumns, getColumns } from './columns'

const coreRowModel = getCoreRowModel()

const Toolbar = ({ children }) => (
  <div className='flex min-h-11 justify-end gap-4'>{children}</div>
)

export const Members = ({ teamId, members }) => {
  const { t, formatDate } = useLocale()
  const { openModal } = useModal()

  const columns = getColumns(t, formatDate)
  const [columnVisibility, setColumnVisibility] = useState(defaultHiddenColumns)

  const isEmpty = members.length === 0

  const openUserProfile = member => {
    const close = openModal({
      children: <ProfileDialog profile={member} onClose={() => close()} />
    })
  }

  const openInvitationDialog = () => {
    const close = openModal({
      children: (
        <MemberInvitationDialog teamId={teamId} onClose={() => close()} />
      )
    })
  }

  // eslint-disable-next-line react-hooks/incompatible-library
  const config = useReactTable({
    data: members,
    columns,
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: coreRowModel
  })

  if (isEmpty) {
    return (
      <EmptyState text={t('team.members.empty')}>
        <InviteButton
          label={t('invite.cta')}
          onClick={openInvitationDialog}
          hideTextOnMobile={false}
        />
      </EmptyState>
    )
  }

  const availableColumns = config.getAllLeafColumns().map(column => ({
    id: column.id,
    label: t(`table.members.${column.id}`),
    getIsVisible: () => column.getIsVisible(),
    toggleVisibility: () => column.toggleVisibility()
  }))

  return (
    <div className='flex flex-col gap-4'>
      <Toolbar>
        <ColumnVisibilityDropdown
          label={t('table.column_plural')}
          columns={availableColumns}
        />
        <InviteButton label={t('invite.cta')} onClick={openInvitationDialog} />
      </Toolbar>

      <Table config={config} onRowClick={openUserProfile} />
    </div>
  )
}
