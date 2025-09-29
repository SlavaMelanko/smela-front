import './styles.scss'

import clsx from 'clsx'

import InternalLink from '@/components/links/InternalLink'
import useLocale from '@/hooks/useLocale'

const TermsAndPrivacyPrompt = ({ className }) => {
  const { t } = useLocale()

  return (
    <p className={clsx('terms-and-privacy-prompt', className)}>
      {t('termsAndPrivacy.prefix')}{' '}
      <InternalLink to='/terms' size='sm' newTab>
        {t('termsAndPrivacy.termsLink')}
      </InternalLink>{' '}
      {t('termsAndPrivacy.middle')}{' '}
      <InternalLink to='/privacy' size='sm' newTab>
        {t('termsAndPrivacy.privacyLink')}
      </InternalLink>
      {'.'}
    </p>
  )
}

export default TermsAndPrivacyPrompt
