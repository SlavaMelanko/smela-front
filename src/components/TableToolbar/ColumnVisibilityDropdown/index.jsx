import { Settings } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

const ColumnVisibilityDropdown = ({ className, label, columns }) => (
  <DropdownMenu>
    <DropdownMenuTrigger
      className={cn(className)}
      render={<Button variant='outline' />}
    >
      <Settings className='size-4' />
      <span className='hidden sm:inline'>{label}</span>
    </DropdownMenuTrigger>

    <DropdownMenuContent align='end'>
      {columns.map(column => (
        <DropdownMenuCheckboxItem
          key={column.id}
          checked={column.getIsVisible()}
          onCheckedChange={column.toggleVisibility}
          closeOnClick={false}
        >
          {column.label}
        </DropdownMenuCheckboxItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
)

export default ColumnVisibilityDropdown
