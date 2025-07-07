import './styles.scss'

import clsx from 'clsx'

import useLocale from '@/hooks/useLocale'

const Dropdown = ({ className, menu, onSelect }) => {
  const { t } = useLocale()

  return (
    <div className={clsx('rows-per-page-dropdown__dropdown', className)}>
      <div className='rows-per-page-dropdown__list'>
        {menu.map(
          ({ label, icon, onClick, separatorBefore, danger }, index) => {
            const isFirst = index === 0
            const isLast = index === menu.length - 1

            return (
              <div key={label}>
                {separatorBefore && (
                  <div className='rows-per-page-dropdown__separator' />
                )}
                <button
                  className={clsx('rows-per-page-dropdown__item', {
                    'rows-per-page-dropdown__item--first': isFirst,
                    'rows-per-page-dropdown__item--last': isLast,
                    'rows-per-page-dropdown__item--danger': danger
                  })}
                  onClick={() => onSelect({ label, icon, onClick })}
                >
                  <span className='rows-per-page-dropdown__icon'>{icon}</span>
                  <span className='rows-per-page-dropdown__label'>
                    {t(label)}
                  </span>
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
