import './styles.scss'

import clsx from 'clsx'

import { DropdownList } from '@/components/dropdowns'
import { ChevronToggle } from '@/components/icons/animated'
import { Button } from '@/components/ui/button'
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
      <Button variant='ghost' size='sm' onClick={toggle}>
        {label}
        <ChevronToggle isOpen={isActive} />
      </Button>
      <DropdownList menu={normalizedMenu} isOpen={isActive} direction='top' />
    </div>
  )
}

export default RowsPerPageDropdown
