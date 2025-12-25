import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const SearchInput = ({
  className = '',
  placeholder = '',
  value = '',
  onChange
}) => (
  <div className={cn('w-full', className)}>
    <Input
      id='search'
      name='userSearch'
      placeholder={placeholder}
      autoComplete='on'
      aria-label='Search users'
      value={value}
      onChange={e => onChange?.(e.target.value)}
      leftIcon={<Search className='size-4' />}
    />
  </div>
)

export default SearchInput
