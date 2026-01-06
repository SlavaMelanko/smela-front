import { Link } from '@/components/ui'
import useLocale from '@/hooks/useLocale'

import { Prompt } from '../components'

export const ForgotYourPasswordPrompt = () => {
  const { t } = useLocale()

  return (
    <Prompt>
      <Link size='sm' to='/reset-password'>
        {t('forgotYourPassword')}
      </Link>
    </Prompt>
  )
}
