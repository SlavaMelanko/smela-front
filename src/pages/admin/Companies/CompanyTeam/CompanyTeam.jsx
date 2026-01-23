import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Plus, Users } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

import { MemberInvitationDialog, ProfileDialog } from '@/components/dialogs'
import { ColumnVisibilityDropdown, Table } from '@/components/table'
import { Button } from '@/components/ui'
import useLocale from '@/hooks/useLocale'
import useModal from '@/hooks/useModal'

import { getColumns } from './columns'

export const CompanyTeam = ({ companyId, members }) => {
  const { t, formatDate } = useLocale()
  const { openModal } = useModal()

  const columns = useMemo(() => getColumns(t, formatDate), [t, formatDate])
  const [columnVisibility, setColumnVisibility] = useState({
    id: false,
    invitedBy: false
  })

  const handleRowClick = useCallback(
    member => {
      const close = openModal({
        children: <ProfileDialog profile={member} onClose={() => close()} />
      })
    },
    [openModal]
  )

  const handleInviteClick = useCallback(() => {
    const close = openModal({
      children: (
        <MemberInvitationDialog companyId={companyId} onClose={() => close()} />
      )
    })
  }, [companyId, openModal])

  // eslint-disable-next-line react-hooks/incompatible-library
  const config = useReactTable({
    data: members,
    columns,
    state: { columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel()
  })

  if (members.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 py-12 text-muted-foreground'>
        <Users className='size-10 stroke-1' />
        <p>{t('company.team.empty')}</p>
        <Button variant='outline' onClick={handleInviteClick}>
          <Plus className='size-5' />
          {t('invite')}
        </Button>
      </div>
    )
  }

  const availableColumns = config.getAllLeafColumns().map(column => ({
    id: column.id,
    label: t(`table.team.${column.id}`),
    getIsVisible: () => column.getIsVisible(),
    toggleVisibility: () => column.toggleVisibility()
  }))

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-end gap-4'>
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
    </div>
  )
}
