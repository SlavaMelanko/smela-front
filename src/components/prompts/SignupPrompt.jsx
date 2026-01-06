import { Link } from '@/components/ui'
import useLocale from '@/hooks/useLocale'

import { Prompt } from './components'

export const SignupPrompt = ({ size = 'sm' }) => {
  const { t } = useLocale()

  return (
    <Prompt size={size}>
      <span>{t('doNotHaveAccount')}</span>
      <Link size={size} to='/pricing'>
        {t('signUp')}
      </Link>
    </Prompt>
  )
}
