import './styles.scss'

import clsx from 'clsx'

import { DropdownList } from '@/components/dropdowns'
import useLocale from '@/hooks/useLocale'
import useOutsideClick from '@/hooks/useOutsideClick'

import Flag from './Flag'
import { languages } from './languages'

const LanguageSelector = ({ className = '' }) => {
  const { locale, changeLocale } = useLocale()

  const { ref, isActive, setIsActive } = useOutsideClick()

  const currentLanguage =
    languages.find(lang => lang.id === locale) ||
    languages.find(lang => lang.id === 'en')

  const toggle = () => setIsActive(prev => !prev)

  const languageMenu = languages.map(lang => ({
    label: lang.name,
    icon: <Flag className='language-selector__flag' code={lang.code} />,
    onClick: () => {
      changeLocale(lang.id)
      setIsActive(false)
    }
  }))

  return (
    <div className={clsx('language-selector', className)} ref={ref}>
      <button
        className='language-selector__button'
        aria-label='Change language'
        onClick={toggle}
      >
        <Flag className='language-selector__flag' code={currentLanguage.code} />
      </button>
      <DropdownList menu={languageMenu} isOpen={isActive} />
    </div>
  )
}

export default LanguageSelector
