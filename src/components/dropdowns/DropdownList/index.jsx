import './styles.scss'

import clsx from 'clsx'

import useLocale from '@/hooks/useLocale'

const DropdownList = ({ className, menu, isOpen }) => {
  const { t } = useLocale()

  return (
    <div
      className={clsx('dropdown', { 'dropdown--open': isOpen }, className)}
      role='menu'
    >
      <div className='dropdown__list'>
        {menu.map(
          ({ label, icon, onClick, separatorBefore, danger }, index) => {
            const isFirst = index === 0
            const isLast = index === menu.length - 1

            return (
              <div key={label}>
                {separatorBefore && <div className='dropdown__separator' />}
                <button
                  className={clsx('dropdown__item', {
                    'dropdown__item--first': isFirst,
                    'dropdown__item--last': isLast,
                    'dropdown__item--danger': danger
                  })}
                  onClick={onClick}
                >
                  <span className='dropdown__icon'>{icon}</span>
                  <span className='dropdown__label'>{t(label)}</span>
                </button>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}

export default DropdownList
