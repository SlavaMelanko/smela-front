import './styles.scss'

import clsx from 'clsx'

import { SearchIcon } from '@/components/icons'
import { TextInput } from '@/components/inputs'

const SearchInput = ({
  className = '',
  placeholder = '',
  value = '',
  onChange
}) => (
  <div className={clsx('search', className)}>
    <TextInput
      id='search'
      name='userSearch'
      className='search__input'
      placeholder={placeholder}
      autoComplete='on'
      aria-label='Search users'
      value={value}
      onChange={e => onChange?.(e.target.value)}
      leftElement={<SearchIcon size='xs' color='secondary' />}
    />
  </div>
)

export default SearchInput
