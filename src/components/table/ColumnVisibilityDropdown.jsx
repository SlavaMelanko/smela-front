import { SlidersVertical } from 'lucide-react'

import { ChevronIcon } from '@/components/icons'
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui'
import { cn } from '@/lib/utils'

export const ColumnVisibilityDropdown = ({ className, label, columns }) => (
  <DropdownMenu>
    <DropdownMenuTrigger
      className={cn(className)}
      render={<Button variant='outline' />}
    >
      <SlidersVertical className='size-4' />
      <span className='hidden sm:inline'>{label}</span>
      <ChevronIcon className='hidden group-aria-expanded/button:rotate-180 sm:block' />
    </DropdownMenuTrigger>

    <DropdownMenuContent align='end' className='min-w-(--anchor-width)'>
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
