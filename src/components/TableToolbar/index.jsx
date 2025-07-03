import './styles.scss'

import { SecondaryButtonWithIcon } from '@/components/buttons'
import { ColumnsDropdown } from '@/components/dropdowns'
import { FilterIcon } from '@/components/icons'

const TableToolbar = ({ columnsMenu }) => {
  return (
    <div className='table-toolbar'>
      <SecondaryButtonWithIcon
        className='columns-dropdown__button'
        iconLeft={<FilterIcon color='secondary' size='xs' />}
        text='Filters'
        onClick={() => {}}
      />
      <ColumnsDropdown text='Columns' menu={columnsMenu} />
    </div>
  )
}

export default TableToolbar
