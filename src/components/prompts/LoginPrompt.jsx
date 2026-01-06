import { Link } from '@/components/ui/link'
import { Prompt } from '@/components/ui/prompt'
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
