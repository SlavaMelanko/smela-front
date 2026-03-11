import { useLocale } from '@/hooks/useLocale'

export const YouBadge = () => {
  const { t } = useLocale()

  return <span className='m-1 text-sm text-muted-foreground'>({t('you')})</span>
}
