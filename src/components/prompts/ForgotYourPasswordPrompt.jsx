import { Link, Prompt } from '@/components/ui'
import useLocale from '@/hooks/useLocale'

const ForgotYourPasswordPrompt = () => {
  const { t } = useLocale()

  return (
    <Prompt size='sm'>
      <Link size='sm' to='/reset-password'>
        {t('forgotYourPassword')}
      </Link>
    </Prompt>
  )
}

export default ForgotYourPasswordPrompt
