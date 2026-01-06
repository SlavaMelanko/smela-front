import { cva } from 'class-variance-authority'

import useLocale from '@/hooks/useLocale'
import { cn } from '@/lib/utils'

const currentYear = new Date().getFullYear()

const copyrightVariants = cva('text-center font-light text-muted-foreground', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      default: 'text-base',
      lg: 'text-lg'
    }
  },
  defaultVariants: {
    size: 'xs'
  }
})

export const Copyright = ({ className, size = 'xs' }) => {
  const { t } = useLocale()

  return (
    <div className={cn(copyrightVariants({ size }), className)}>
      {t('copyright', {
        year: currentYear,
        companyName: t('companyName')
      })}
    </div>
  )
}
