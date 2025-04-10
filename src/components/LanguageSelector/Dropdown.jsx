import clsx from 'clsx'

import Flag from './Flag'

const Dropdown = ({ languages, currentLanguage, onSelect }) => (
  <div className='language-selector__dropdown'>
    <div className='language-selector__list'>
      {languages.map(({ id, code, name, flag }) => (
        <button
          key={id}
          onClick={() => onSelect({ id, code, name, flag })}
          className={clsx('language-selector__item', {
            'language-selector__item--active': currentLanguage.id === id
          })}
        >
          <Flag code={code} flag={flag} className='language-selector__flag' />
          <span className='language-selector__name'>{name}</span>
        </button>
      ))}
    </div>
  </div>
)

export default Dropdown
