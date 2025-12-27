import './styles.scss'

import clsx from 'clsx'

import { Badge } from '@/components/ui/badge'
import useLocale from '@/hooks/useLocale'

import ActiveIndicator from '../ActiveIndicator'

const SidebarSubItem = ({ item, isActive, onClick }) => {
  const { t } = useLocale()

  return (
    <li
      className={clsx('sidebar-sub-item', {
        'sidebar-sub-item--active': isActive
      })}
    >
      <ActiveIndicator variant='sub-item' />

      <button
        type='button'
        onClick={onClick}
        className='sidebar-sub-item__button'
        aria-current={isActive ? 'page' : undefined}
      >
        <div className='sidebar-sub-item__content-left'>
          <span className='sidebar-sub-item__label'>{t(item.name)}</span>
        </div>

        <div className='sidebar-sub-item__content-right'>
          {item.badge && (
            <Badge variant='notification'>
              {item.badge > 9 ? '9+' : item.badge}
            </Badge>
          )}
        </div>
      </button>
    </li>
  )
}

export default SidebarSubItem
