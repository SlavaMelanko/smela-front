import { CompanyAddForm } from '@/components/form'
import { DialogBody, DialogHeader, DialogTitle } from '@/components/ui'
import { useCreateCompany } from '@/hooks/useAdmin'
import { useLocale } from '@/hooks/useLocale'
import { useToast } from '@/hooks/useToast'

export const CompanyAddDialog = ({ onClose }) => {
  const { t, te } = useLocale()
  const { showSuccessToast, showErrorToast } = useToast()
  const { mutate: createCompany, isPending } = useCreateCompany()

  const onSubmit = data => {
    createCompany(data, {
      onSuccess: () => {
        showSuccessToast(t('company.add.success'))
        onClose()
      },
      onError: error => {
        showErrorToast(te(error))
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
