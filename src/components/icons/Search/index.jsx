import './styles.scss'

import { Search, SearchX } from 'lucide-react'

import BaseIcon from '../Icon'

const SearchIcon = props => <BaseIcon {...props} icon={Search} name='search' />

const SearchXIcon = props => (
  <BaseIcon {...props} icon={SearchX} name='search-x' />
)

export { SearchIcon, SearchXIcon }
