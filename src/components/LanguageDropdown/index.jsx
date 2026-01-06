import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui'
import useLocale from '@/hooks/useLocale'

import Flag from './Flag'
import { languages } from './languages'

const LanguageDropdown = () => {
  const { locale, changeLocale } = useLocale()

  const currentLanguage =
    languages.find(lang => lang.id === locale) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant='ghost'
            size='icon'
            className='rounded-full'
            aria-label='Change language'
          />
        }
      >
        <Flag code={currentLanguage.code} className='size-6' />
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuRadioGroup value={locale} onValueChange={changeLocale}>
          {languages.map(lang => (
            <DropdownMenuRadioItem key={lang.id} value={lang.id}>
              <Flag code={lang.code} className='size-5' />
              <span>{lang.name}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageDropdown
