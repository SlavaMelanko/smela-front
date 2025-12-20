import './styles.scss'

import clsx from 'clsx'

import { DropdownList } from '@/components/dropdowns'
import { SettingsIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
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
      <Button variant='outline' size='sm' onClick={toggle}>
        <SettingsIcon color='secondary' size='xs' />
        {label}
      </Button>
      <DropdownList menu={normalizedMenu} isOpen={isActive} />
    </div>
  )
}

export default ColumnVisibilityDropdown
