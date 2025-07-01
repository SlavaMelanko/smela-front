import clsx from 'clsx'

import useLocale from '@/hooks/useLocale'

const Dropdown = ({ className, menu, onSelect }) => {
  const { t } = useLocale()

  return (
    <div className={clsx('profile-dropdown__dropdown', className)}>
      <div className='profile-dropdown__list'>
        {menu.map(
          ({ label, icon, onClick, separatorBefore, danger }, index) => {
            const isFirst = index === 0
            const isLast = index === menu.length - 1

            return (
              <div key={label}>
                {separatorBefore && (
                  <div className='profile-dropdown__separator' />
                )}
                <button
                  className={clsx('profile-dropdown__item', {
                    'profile-dropdown__item--first': isFirst,
                    'profile-dropdown__item--last': isLast,
                    'profile-dropdown__item--danger': danger
                  })}
                  onClick={() => onSelect({ label, icon, onClick })}
                >
                  <span className='profile-dropdown__icon'>{icon}</span>
                  <span className='profile-dropdown__label'>{t(label)}</span>
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
