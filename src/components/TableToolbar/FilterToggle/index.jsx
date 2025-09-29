import './styles.scss'

import { SecondaryButtonWithIcon } from '@/components/buttons'
import { FilterIcon } from '@/components/icons'
import { ChevronToggle } from '@/components/icons/animated'

const FilterToggle = ({ label, isActive, onToggle }) => {
  return (
    <SecondaryButtonWithIcon
      className='filter-toggle'
      iconLeft={<FilterIcon color='secondary' size='xs' />}
      text={label}
      iconRight={<ChevronToggle isOpen={isActive} />}
      onClick={onToggle}
    />
  )
}

export default FilterToggle
