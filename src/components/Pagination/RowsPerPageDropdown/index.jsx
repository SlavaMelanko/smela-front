import './styles.scss'

import clsx from 'clsx'

import { SecondaryButtonWithIcon } from '@/components/buttons'
import { ChevronToggle } from '@/components/icons/animated'
import useOutsideClick from '@/hooks/useOutsideClick'

import Dropdown from './Dropdown'

const RowsPerPageDropdown = ({ className = '', label, menu }) => {
  const { ref, isActive, setIsActive } = useOutsideClick()

  const toggle = () => setIsActive(prev => !prev)

  const handleSelect = ({ onClick }) => {
    if (onClick) {
      onClick()
    }

    setIsActive(false)
  }

  return (
    <div className={clsx('rows-per-page-dropdown', className)} ref={ref}>
      <SecondaryButtonWithIcon
        className='rows-per-page-dropdown__button'
        iconRight={<ChevronToggle isOpen={isActive} />}
        text={label}
        onClick={toggle}
      />
      <Dropdown
        className={clsx(isActive && 'rows-per-page-dropdown__dropdown--open')}
        menu={menu}
        onSelect={handleSelect}
      />
    </div>
  )
}

export default RowsPerPageDropdown
