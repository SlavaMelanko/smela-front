import './styles.scss'

import clsx from 'clsx'

import { ChevronDownIcon } from '@/components/icons'
import useLocale from '@/hooks/useLocale'
import useOutsideClick from '@/hooks/useOutsideClick'
import toasts from '@/lib/toasts'

import Dropdown from './Dropdown'
import Flag from './Flag'
import { languages } from './languages'

const LanguageSelector = ({ className = '' }) => {
  const { locale, changeLocale } = useLocale()

  const { ref, isActive, setIsActive } = useOutsideClick()

  const currentLanguage =
    languages.find(lang => lang.id === locale) ||
    languages.find(lang => lang.id === 'en')

  const toggle = () => setIsActive(prev => !prev)

  const handleSelect = lang => {
    changeLocale(lang.id)
    setIsActive(false)

    // Clear toasts when language is changed to avoid visual glitches.
    toasts.clear()
  }

  return (
    <div className={clsx('language-selector', className)} ref={ref}>
      <button
        className='language-selector__button'
        aria-label='Change language'
        onClick={toggle}
      >
        <Flag className='language-selector__flag' code={currentLanguage.code} />
      </button>
      <Dropdown
        languages={languages}
        currentLanguage={currentLanguage}
        isOpen={isActive}
        onSelect={handleSelect}
      />
    </div>
  )
}

export default LanguageSelector
