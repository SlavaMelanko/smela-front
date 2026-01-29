import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { PencilIcon } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ErrorAlert } from '@/components/alerts'
import { AddButton } from '@/components/buttons'
import { CompanyAddDialog } from '@/components/dialogs'
import { SearchInput } from '@/components/inputs'
import { defaultOptions, Pagination } from '@/components/Pagination'
import { Spinner } from '@/components/Spinner'
import { ColumnVisibilityDropdown, Table } from '@/components/table'
import { useCompanies } from '@/hooks/useAdmin'
import useDebouncedSearch from '@/hooks/useDebouncedSearch'
import useLocale from '@/hooks/useLocale'
import useModal from '@/hooks/useModal'
import useTableParams from '@/hooks/useTableParams'

import { defaultHiddenColumns, getColumns } from './columns'

const coreRowModel = getCoreRowModel()
const sortedRowModel = getSortedRowModel()

const Toolbar = ({ children }) => (
  <div className='flex min-h-11 items-center gap-4'>{children}</div>
)

export const CompaniesPage = () => {
  const navigate = useNavigate()
  const { t, formatDate } = useLocale()
  const { openModal } = useModal()

  const { params, apiParams, setParams } = useTableParams()

  const handleSearch = useCallback(
    value => setParams({ search: value || null }, { resetPage: true }),
    [setParams]
  )
  const { searchValue, setSearchValue } = useDebouncedSearch(
    params.search,
    handleSearch
  )

  const { data, isPending, isError } = useCompanies(apiParams)
  const { companies = [], pagination = defaultOptions } = data ?? {}

  const columns = useMemo(() => getColumns(t, formatDate), [t, formatDate])
  const [columnVisibility, setColumnVisibility] = useState(defaultHiddenColumns)
  const [sorting, setSorting] = useState([])

  const handleAddClick = useCallback(() => {
    const close = openModal({
      children: <CompanyAddDialog onClose={() => close()} />
    })
  }, [openModal])

  const handleRowClick = useCallback(
    company => navigate(`/admin/companies/${company.id}`),
    [navigate]
  )

  const contextMenu = useMemo(
    () => [
      {
        icon: PencilIcon,
        label: t('contextMenu.edit'),
        onClick: handleRowClick
      }
    ],
    [t, handleRowClick]
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
    data: companies,
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
    label: t(`table.companies.${column.id}`),
    getIsVisible: () => column.getIsVisible(),
    toggleVisibility: () => column.toggleVisibility()
  }))

  if (isPending) {
    return <Spinner />
  }

  if (isError) {
    return <ErrorAlert text={t('error.loading')} />
  }

  return (
    <div className='flex flex-col gap-4 md:gap-5'>
      <Toolbar>
        <SearchInput
          className='flex-1'
          placeholder={t('searchBy.companies')}
          value={searchValue}
          onChange={setSearchValue}
        />
        <ColumnVisibilityDropdown
          label={t('table.column_plural')}
          columns={availableColumns}
        />
        <AddButton label={t('add')} onClick={handleAddClick} />
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
