import './styles.scss'

import clsx from 'clsx'

import { SecondaryButtonWithIcon } from '@/components/buttons'
import { SettingsIcon } from '@/components/icons'
import useOutsideClick from '@/hooks/useOutsideClick'

import Dropdown from './Dropdown'

const ColumnVisibilityDropdown = ({ className = '', label, menu }) => {
  const { ref, isActive, setIsActive } = useOutsideClick()

  const toggle = () => setIsActive(prev => !prev)

  const handleSelect = ({ onClick }) => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <div className={clsx('columns-dropdown', className)} ref={ref}>
      <SecondaryButtonWithIcon
        className='columns-dropdown__button'
        iconLeft={<SettingsIcon color='secondary' size='xs' />}
        text={label}
        onClick={toggle}
      />
      <Dropdown
        className={clsx(isActive && 'columns-dropdown__dropdown--open')}
        menu={menu}
        onSelect={handleSelect}
      />
    </div>
  )
}

export default ColumnVisibilityDropdown
