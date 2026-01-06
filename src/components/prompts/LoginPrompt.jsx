import { Link, Prompt } from '@/components/ui'
import useLocale from '@/hooks/useLocale'

const LoginPrompt = ({ question }) => {
  const { t } = useLocale()

  return (
    <Prompt size='sm'>
      {question || t('alreadyHaveAccount')}{' '}
      <Link size='sm' to='/login'>
        {t('login.verb')}
      </Link>
    </Prompt>
  )
}

export default LoginPrompt
