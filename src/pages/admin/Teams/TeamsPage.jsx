import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Users } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AddButton } from '@/components/buttons'
import { TeamAddDialog } from '@/components/dialogs'
import { SearchInput } from '@/components/inputs'
import { defaultOptions, Pagination } from '@/components/Pagination'
import { Spinner } from '@/components/Spinner'
import { ErrorState } from '@/components/states'
import { ColumnVisibilityDropdown, Table } from '@/components/table'
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch'
import { useLocale } from '@/hooks/useLocale'
import { useModal } from '@/hooks/useModal'
import { useTableParams } from '@/hooks/useTableParams'
import { useTeams } from '@/hooks/useTeam'
import { PageContent } from '@/pages/Page'

import { defaultHiddenColumns, getColumns } from './columns'

const coreRowModel = getCoreRowModel()
const sortedRowModel = getSortedRowModel()

const Toolbar = ({ children }) => (
  <div className='flex min-h-11 items-center gap-4'>{children}</div>
)

export const TeamsPage = () => {
  const navigate = useNavigate()
  const { t, te, formatDate } = useLocale()
  const { openModal } = useModal()

  const { params, apiParams, setParams } = useTableParams()

  const handleSearch = value =>
    setParams({ search: value || null }, { resetPage: true })
  const { searchValue, setSearchValue } = useDebouncedSearch(
    params.search,
    handleSearch
  )

  const { data, isPending, isError, error, refetch } = useTeams(apiParams)
  const { teams = [], pagination = defaultOptions } = data ?? {}

  const columns = getColumns(t, formatDate)
  const [columnVisibility, setColumnVisibility] = useState(defaultHiddenColumns)
  const [sorting, setSorting] = useState([])

  const openCreateTeamDialog = () => {
    const close = openModal({
      children: <TeamAddDialog onClose={() => close()} />
    })
  }

  const viewTeam = team => navigate(`/admin/teams/${team.id}`)

  const contextMenu = [
    {
      icon: Users,
      label: t('contextMenu.open'),
      onClick: viewTeam
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
    data: teams,
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
    label: t(`table.teams.${column.id}`),
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
          placeholder={t('searchBy.teams')}
          value={searchValue}
          onChange={setSearchValue}
        />
        <ColumnVisibilityDropdown
          label={t('table.column_plural')}
          columns={availableColumns}
        />
        <AddButton label={t('add')} onClick={openCreateTeamDialog} />
      </Toolbar>

      <Table config={config} onRowClick={viewTeam} contextMenu={contextMenu} />
      <Pagination
        pagination={pagination}
        onPageChange={changePage}
        onLimitChange={changeLimit}
      />
    </PageContent>
  )
}
