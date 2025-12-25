import { ChevronDown, Filter } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const FilterToggle = ({ className, label, isActive, onToggle }) => {
  return (
    <Button
      variant='outline'
      aria-expanded={isActive}
      onClick={onToggle}
      className={cn(className)}
    >
      <Filter className='size-4' />
      <span className='hidden sm:inline'>{label}</span>
      <ChevronDown className='hidden size-4 transition-transform duration-300 group-aria-expanded/button:rotate-180 sm:block' />
    </Button>
  )
}

export default FilterToggle
