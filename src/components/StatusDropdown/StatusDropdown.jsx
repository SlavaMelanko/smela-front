import { StatusBadge } from '@/components/badges'
import { ChevronIcon } from '@/components/icons'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui'
import { UserStatus } from '@/lib/types'
import { cn } from '@/lib/utils'

const statuses = Object.values(UserStatus)

export const StatusDropdown = ({ className, value, onChange }) => (
  <DropdownMenu>
    <DropdownMenuTrigger
      render={
        <Button
          variant='outline'
          className={cn('min-w-36 justify-between', className)}
        />
      }
    >
      <StatusBadge status={value} />
      <ChevronIcon className='hidden group-aria-expanded/button:rotate-180 sm:block' />
    </DropdownMenuTrigger>

    <DropdownMenuContent align='end' className='min-w-(--anchor-width)'>
      <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
        {statuses.map(status => (
          <DropdownMenuRadioItem key={status} value={status}>
            <StatusBadge status={status} />
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
)
