import { Link } from '@/components/ui'
import useLocale from '@/hooks/useLocale'

import { Prompt } from '../components'

export const SignupPrompt = () => {
  const { t } = useLocale()

  return (
    <Prompt>
      {t('doNotHaveAccount')}{' '}
      <Link size='sm' to='/pricing'>
        {t('signUp')}
      </Link>
    </Prompt>
  )
}
