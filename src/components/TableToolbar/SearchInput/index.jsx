import './styles.scss'

import clsx from 'clsx'

import { TextInput } from '@/components/inputs'

const SearchInput = ({ className = '', placeholder = '' }) => (
  <div className={clsx('search', className)}>
    <TextInput
      id='search'
      name='userSearch'
      className='search__input'
      placeholder={placeholder}
      autoComplete='on'
      aria-label='Search users'
    />
  </div>
)

export default SearchInput
