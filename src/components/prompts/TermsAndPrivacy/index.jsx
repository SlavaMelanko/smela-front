import './styles.scss'

import clsx from 'clsx'

import { Link } from '@/components/ui/link'
import useLocale from '@/hooks/useLocale'

const TermsAndPrivacyPrompt = ({ className }) => {
  const { t } = useLocale()

  return (
    <p className={clsx('terms-and-privacy-prompt', className)}>
      {t('termsAndPrivacy.prefix')}{' '}
      <Link to='/terms' size='sm' openInNewTab>
        {t('termsAndPrivacy.termsLink')}
      </Link>{' '}
      {t('termsAndPrivacy.middle')}{' '}
      <Link to='/privacy' size='sm' openInNewTab>
        {t('termsAndPrivacy.privacyLink')}
      </Link>
      {'.'}
    </p>
  )
}

export default TermsAndPrivacyPrompt
