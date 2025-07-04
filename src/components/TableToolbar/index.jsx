import './styles.scss'

import { ColumnsDropdown } from '@/components/dropdowns'
import useLocale from '@/hooks/useLocale'

import FilterToggle from './FilterToggle'

const TableToolbar = ({ columns, onToggleFilters }) => {
  const { t } = useLocale()

  return (
    <div className='table-toolbar'>
      <FilterToggle
        label={t('table.filter_plural')}
        onToggle={onToggleFilters}
      />
      <ColumnsDropdown label={t('table.column_plural')} menu={columns} />
    </div>
  )
}

export default TableToolbar
