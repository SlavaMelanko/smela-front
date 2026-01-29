import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useCallback, useMemo, useState } from 'react'

import { InfoAlert } from '@/components/alerts'
import { AddButton } from '@/components/buttons'
import { MemberInvitationDialog, ProfileDialog } from '@/components/dialogs'
import { ColumnVisibilityDropdown, Table } from '@/components/table'
import useLocale from '@/hooks/useLocale'
import useModal from '@/hooks/useModal'

import { defaultHiddenColumns, getColumns } from './columns'

const coreRowModel = getCoreRowModel()

const Toolbar = ({ children }) => (
  <div className='flex min-h-11 justify-end gap-4'>{children}</div>
)

export const CompanyTeam = ({ companyId, members }) => {
  const { t, formatDate } = useLocale()
  const { openModal } = useModal()

  const columns = useMemo(() => getColumns(t, formatDate), [t, formatDate])
  const [columnVisibility, setColumnVisibility] = useState(defaultHiddenColumns)

  const isEmpty = members.length === 0

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

  // TanStack Table uses interior mutability which is incompatible with React Compiler's memoization.
  // See: https://react.dev/reference/eslint-plugin-react-hooks/lints/incompatible-library
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
      <InfoAlert text={t('company.team.empty')}>
        <AddButton
          label={t('invite')}
          onClick={handleInviteClick}
          hideTextOnMobile={false}
        />
      </InfoAlert>
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
      <Toolbar>
        <ColumnVisibilityDropdown
          label={t('table.column_plural')}
          columns={availableColumns}
        />
        <AddButton label={t('invite')} onClick={handleInviteClick} />
      </Toolbar>

      <Table config={config} onRowClick={handleRowClick} />
    </div>
  )
}
