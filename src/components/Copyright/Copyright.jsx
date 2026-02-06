import { useLocale } from '@/hooks/useLocale'
import { cn } from '@/lib/utils'

const currentYear = new Date().getFullYear()

export const Copyright = ({ className }) => {
  const { t } = useLocale()

  return (
    <div
      className={cn(
        'text-center text-xs font-light text-muted-foreground',
        className
      )}
    >
      {t('copyright', { year: currentYear, companyName: t('companyName') })}
    </div>
  )
}
