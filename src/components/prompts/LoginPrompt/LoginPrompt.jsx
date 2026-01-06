import { Link } from '@/components/ui'
import useLocale from '@/hooks/useLocale'

import { Prompt } from '../components'

export const LoginPrompt = ({ question }) => {
  const { t } = useLocale()

  return (
    <Prompt>
      {question || t('alreadyHaveAccount')}{' '}
      <Link size='sm' to='/login'>
        {t('login.verb')}
      </Link>
    </Prompt>
  )
}
