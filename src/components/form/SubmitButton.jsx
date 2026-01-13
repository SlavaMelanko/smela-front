import { Button, Spinner } from '@/components/ui'
import useLocale from '@/hooks/useLocale'

export const SubmitButton = ({ isLoading, children }) => {
  const { t } = useLocale()

  return (
    <Button type='submit' disabled={isLoading}>
      {isLoading ? (
        <>
          <Spinner size={16} />
          {t('processing')}
        </>
      ) : (
        children
      )}
    </Button>
  )
}
