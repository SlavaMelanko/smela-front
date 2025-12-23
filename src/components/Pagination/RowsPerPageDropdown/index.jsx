import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const RowsPerPageDropdown = ({ className, value, options, onChange }) => (
  <DropdownMenu>
    <DropdownMenuTrigger
      className={cn(className)}
      render={<Button variant='ghost' size='sm' />}
    >
      {value}
      <ChevronDown className='size-4 transition-transform duration-300 group-aria-expanded/button:rotate-180' />
    </DropdownMenuTrigger>

    <DropdownMenuContent align='start' className='min-w-0'>
      <DropdownMenuRadioGroup value={String(value)} onValueChange={onChange}>
        {options.map(option => (
          <DropdownMenuRadioItem key={option} value={String(option)}>
            {option}
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
)

export default RowsPerPageDropdown
