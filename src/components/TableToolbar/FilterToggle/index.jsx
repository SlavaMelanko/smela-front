import './styles.scss'

import { FilterIcon } from '@/components/icons'
import { ChevronToggle } from '@/components/icons/animated'
import { Button } from '@/components/ui/button'

const FilterToggle = ({ label, isActive, onToggle }) => {
  return (
    <Button variant='outline' size='sm' onClick={onToggle}>
      <FilterIcon color='secondary' size='xs' />
      {label}
      <ChevronToggle isOpen={isActive} />
    </Button>
  )
}

export default FilterToggle
