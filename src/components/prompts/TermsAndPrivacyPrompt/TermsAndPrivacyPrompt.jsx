import { Link } from '@/components/ui'
import useLocale from '@/hooks/useLocale'

import { Prompt } from '../components'

export const TermsAndPrivacyPrompt = () => {
  const { t } = useLocale()

  return (
    <Prompt>
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
