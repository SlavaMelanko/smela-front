import { Link } from '@/components/ui'
import useLocale from '@/hooks/useLocale'

import { Prompt } from './components'

export const ForgotYourPasswordPrompt = ({ size = 'sm' }) => {
  const { t } = useLocale()

  return (
    <Prompt size={size}>
      <Link size={size} to='/reset-password'>
        {t('forgotYourPassword')}
      </Link>
    </Prompt>
  )
}
