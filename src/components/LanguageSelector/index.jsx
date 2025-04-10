import './styles.scss'

import clsx from 'clsx'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import Dropdown from './Dropdown'
import { languages } from './languages'

const LanguageSelector = ({ className = '' }) => {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0])
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggle = () => setIsOpen(prev => !prev)

  const handleSelect = lang => {
    setCurrentLanguage(lang)
    setIsOpen(false)
    // TODO: i18n logic
  }

  return (
    <div className={clsx('language-selector', className)} ref={ref}>
      <button
        onClick={toggle}
        className='language-selector__button'
        aria-label='Change language'
      >
        <span className='language-selector__flag'>{currentLanguage.flag}</span>
        <ChevronDown className='language-selector__icon' />
      </button>

      {isOpen && (
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
