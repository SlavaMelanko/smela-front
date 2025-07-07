import './styles.scss'

import clsx from 'clsx'

import useLocale from '@/hooks/useLocale'

const Dropdown = ({ className, menu, onSelect }) => {
  const { t } = useLocale()

  return (
    <div className={clsx('columns-dropdown__dropdown', className)}>
      <div className='columns-dropdown__list'>
        {menu.map(
          ({ label, icon, onClick, separatorBefore, danger }, index) => {
            const isFirst = index === 0
            const isLast = index === menu.length - 1

            return (
              <div key={label}>
                {separatorBefore && (
                  <div className='columns-dropdown__separator' />
                )}
                <button
                  className={clsx('columns-dropdown__item', {
                    'columns-dropdown__item--first': isFirst,
                    'columns-dropdown__item--last': isLast,
                    'columns-dropdown__item--danger': danger
                  })}
                  onClick={() => onSelect({ label, icon, onClick })}
                >
                  <span className='columns-dropdown__icon'>{icon}</span>
                  <span className='columns-dropdown__label'>{t(label)}</span>
                </button>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}

export default Dropdown
