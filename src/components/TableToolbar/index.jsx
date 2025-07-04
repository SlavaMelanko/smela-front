import './styles.scss'

import { SecondaryButtonWithIcon } from '@/components/buttons'
import { ColumnsDropdown } from '@/components/dropdowns'
import { ChevronDownIcon, FilterIcon } from '@/components/icons'
import useLocale from '@/hooks/useLocale'

const TableToolbar = ({ columnsMenu }) => {
  const { t } = useLocale()

  return (
    <div className='table-toolbar'>
      <SecondaryButtonWithIcon
        className='columns-dropdown__button'
        iconLeft={<FilterIcon color='secondary' size='xs' />}
        iconRight={<ChevronDownIcon color='secondary' size='xs' />}
        text={t('table.filter_plural')}
        onClick={() => {}}
      />
      <ColumnsDropdown text={t('table.column_plural')} menu={columnsMenu} />
    </div>
  )
}

export default TableToolbar
