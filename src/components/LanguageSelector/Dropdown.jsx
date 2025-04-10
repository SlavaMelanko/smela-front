import clsx from 'clsx'

const Dropdown = ({ languages, currentLanguage, onSelect }) => (
  <div className='language-selector__dropdown'>
    <div className='language-selector__list'>
      {languages.map(({ code, name, flag }) => (
        <button
          key={code}
          onClick={() => onSelect({ code, name, flag })}
          className={clsx('language-selector__item', {
            'language-selector__item--active': currentLanguage.code === code
          })}
        >
          <span className='language-selector__flag'>{flag}</span>
          <span className='language-selector__name'>{name}</span>
        </button>
      ))}
    </div>
  </div>
)

export default Dropdown
