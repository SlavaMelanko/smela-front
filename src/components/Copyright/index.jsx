import './styles.scss'

import clsx from 'clsx'

import useLocale from '@/hooks/useLocale'

const Copyright = ({ className }) => {
  const { t } = useLocale()

  return (
    <div className={clsx('copyright', className)}>
      {t('copyright', {
        year: new Date().getFullYear(),
        companyName: t('companyName')
      })}
    </div>
  )
}

export default Copyright
