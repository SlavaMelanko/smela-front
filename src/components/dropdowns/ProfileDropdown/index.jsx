import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import useLocale from '@/hooks/useLocale'

const ProfileDropdown = ({ firstName, menu }) => {
  const { t } = useLocale()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant='ghost'
            size='icon'
            className='rounded-full'
            aria-label='Profile menu'
          />
        }
      >
        <Avatar className='size-6'>
          <AvatarFallback className='text-lg'>
            {firstName?.[0].toUpperCase() || 'X'}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        {menu.map(({ label, icon, onClick, separatorBefore, danger }) => (
          <div key={label}>
            {separatorBefore && <DropdownMenuSeparator />}
            <DropdownMenuItem
              onClick={onClick}
              variant={danger ? 'destructive' : 'default'}
            >
              {icon}
              <span>{t(label)}</span>
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdown
