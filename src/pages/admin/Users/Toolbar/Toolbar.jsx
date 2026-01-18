import { ColumnVisibilityDropdown } from '@/components/table'
import useLocale from '@/hooks/useLocale'

import { FilterToggle } from './FilterToggle'
import { SearchInput } from './SearchInput'

export const Toolbar = ({
  columns,
  showFilters,
  onToggleFilters,
  searchValue,
  onSearchChange
}) => {
  const { t } = useLocale()

  return (
    <div className='flex max-h-11 items-center gap-4'>
      <SearchInput
        className='flex-1'
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
