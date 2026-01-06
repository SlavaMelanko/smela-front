import { Link } from '@/components/ui/link'
import { Prompt } from '@/components/ui/prompt'
import useLocale from '@/hooks/useLocale'

const TermsAndPrivacyPrompt = ({ className }) => {
  const { t } = useLocale()

  return (
    <Prompt size='sm' className={className}>
      {t('termsAndPrivacy.prefix')}{' '}
      <Link size='sm' to='/terms' openInNewTab>
        {t('termsAndPrivacy.termsLink')}
      </Link>{' '}
      {t('termsAndPrivacy.middle')}{' '}
      <Link size='sm' to='/privacy' openInNewTab>
        {t('termsAndPrivacy.privacyLink')}
      </Link>
      {'.'}
    </Prompt>
  )
}

export default TermsAndPrivacyPrompt
