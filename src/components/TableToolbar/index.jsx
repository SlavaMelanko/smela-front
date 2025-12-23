import './styles.scss'

import useLocale from '@/hooks/useLocale'

import ColumnVisibilityDropdown from './ColumnVisibilityDropdown'
import FilterToggle from './FilterToggle'
import SearchInput from './SearchInput'

const TableToolbar = ({
  columns,
  showFilters,
  onToggleFilters,
  searchValue,
  onSearchChange
}) => {
  const { t } = useLocale()

  return (
    <div className='table-toolbar'>
      <SearchInput
        className='table-toolbar__search'
        placeholder={t('searchBy')}
        value={searchValue}
        onChange={onSearchChange}
      />
      <FilterToggle
        label={t('table.filter_plural')}
        isActive={showFilters}
        onToggle={onToggleFilters}
      />
      <ColumnVisibilityDropdown
        label={t('table.column_plural')}
        columns={columns}
      />
    </div>
  )
}

export default TableToolbar
