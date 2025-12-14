import './styles.scss'

import clsx from 'clsx'

import { SecondaryButtonWithIcon } from '@/components/buttons'
import { DropdownList } from '@/components/dropdowns'
import { ChevronToggle } from '@/components/icons/animated'
import useOutsideClick from '@/hooks/useOutsideClick'

const RowsPerPageDropdown = ({ className = '', label, menu }) => {
  const { ref, isActive, setIsActive } = useOutsideClick()

  const toggle = () => setIsActive(prev => !prev)

  const normalizedMenu = menu.map(item => ({
    ...item,
    onClick: () => {
      item.onClick?.()
      setIsActive(false)
    }
  }))

  return (
    <div className={clsx('rows-per-page-dropdown', className)} ref={ref}>
      <SecondaryButtonWithIcon
        className='rows-per-page-dropdown__button'
        iconRight={<ChevronToggle isOpen={isActive} />}
        text={label}
        onClick={toggle}
      />
      <DropdownList menu={normalizedMenu} isOpen={isActive} direction='top' />
    </div>
  )
}

export default RowsPerPageDropdown
