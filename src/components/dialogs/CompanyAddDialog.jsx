import { CompanyAddForm } from '@/components/form'
import { DialogBody, DialogHeader, DialogTitle } from '@/components/ui'
import { useCreateCompany } from '@/hooks/useAdmin'
import useLocale from '@/hooks/useLocale'
import useToast from '@/hooks/useToast'
import { toTranslationKey } from '@/services/catch'

export const CompanyAddDialog = ({ onClose }) => {
  const { t } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const { mutate: createCompany, isPending } = useCreateCompany()

  const onSubmit = data => {
    createCompany(data, {
      onSuccess: () => {
        showSuccessToast(t('company.add.success'))
        onClose()
      },
      onError: err => {
        showErrorToast(t(toTranslationKey(err)))
      }
    })
  }

  return (
    <>
      <DialogHeader onClose={onClose}>
        <DialogTitle>{t('company.add.title')}</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <CompanyAddForm
          isLoading={isPending}
          submitLabel={t('company.add.cta')}
          onSubmit={onSubmit}
        />
      </DialogBody>
    </>
  )
}
