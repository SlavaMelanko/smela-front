import { Link, Prompt } from '@/components/ui'
import useLocale from '@/hooks/useLocale'

const SignupPrompt = () => {
  const { t } = useLocale()

  return (
    <Prompt size='sm'>
      {t('doNotHaveAccount')}{' '}
      <Link size='sm' to='/pricing'>
        {t('signUp')}
      </Link>
    </Prompt>
  )
}

export default SignupPrompt
