import clsx from 'clsx'

import useLocale from '@/hooks/useLocale'

const currentYear = new Date().getFullYear()

const Copyright = ({ className }) => {
  const { t } = useLocale()

  return (
    <div
      className={clsx('text-xs font-light text-muted-foreground', className)}
    >
      {t('copyright', {
        year: currentYear,
        companyName: t('companyName')
      })}
    </div>
  )
}

export default Copyright
