import './styles.scss'

import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import { useContext } from 'react'

import LocaleContext from '@/contexts/LocaleContext'
import useOutsideClick from '@/hooks/useOutsideClick'

import Dropdown from './Dropdown'
import Flag from './Flag'
import { languages } from './languages'

const LanguageSelector = ({ className = '' }) => {
  const { locale, changeLocale } = useContext(LocaleContext)

  const { ref, isActive, setIsActive } = useOutsideClick()

  const currentLanguage =
    languages.find(lang => lang.code === locale) || languages[0]

  const toggle = () => setIsActive(prev => !prev)

  const handleSelect = lang => {
    changeLocale(lang.code)
    setIsActive(false)
  }

  return (
    <div className={clsx('language-selector', className)} ref={ref}>
      <button
        onClick={toggle}
        className='language-selector__button'
        aria-label='Change language'
      >
        <Flag
          code={currentLanguage.code}
          flag={currentLanguage.flag}
          className='language-selector__flag'
        />
        <ChevronDown className='language-selector__icon' />
      </button>

      {isActive && (
        <Dropdown
          languages={languages}
          currentLanguage={currentLanguage}
          onSelect={handleSelect}
        />
      )}
    </div>
  )
}

export default LanguageSelector
