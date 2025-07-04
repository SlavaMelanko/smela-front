import './styles.scss'

import { SecondaryButtonWithIcon } from '@/components/buttons'
import { ChevronDownIcon, FilterIcon } from '@/components/icons'

const FilterToggle = ({ label, onToggle }) => {
  return (
    <SecondaryButtonWithIcon
      className='filter-toggle'
      iconLeft={<FilterIcon color='secondary' size='xs' />}
      text={label}
      iconRight={<ChevronDownIcon color='secondary' size='xs' />}
      onClick={onToggle}
    />
  )
}

export default FilterToggle
