import './styles.scss'

import clsx from 'clsx'

import { SecondaryButtonWithIcon } from '@/components/buttons'
import { DropdownList } from '@/components/dropdowns'
import { SettingsIcon } from '@/components/icons'
import useOutsideClick from '@/hooks/useOutsideClick'

const ColumnVisibilityDropdown = ({ className = '', label, menu }) => {
  const { ref, isActive, setIsActive } = useOutsideClick()

  const toggle = () => setIsActive(prev => !prev)

  const normalizedMenu = menu.map(item => ({
    ...item,
    onClick: () => item.onClick?.()
  }))

  return (
    <div className={clsx('column-visibility-dropdown', className)} ref={ref}>
      <SecondaryButtonWithIcon
        className='column-visibility-dropdown__button'
        iconLeft={<SettingsIcon color='secondary' size='xs' />}
        text={label}
        onClick={toggle}
      />
      <DropdownList menu={normalizedMenu} isOpen={isActive} />
    </div>
  )
}

export default ColumnVisibilityDropdown
