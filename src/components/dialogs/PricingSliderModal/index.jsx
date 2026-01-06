import { Copyright } from '@/components/Copyright'
import { PricingSlider } from '@/components/pricing'
import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui'
import useLocale from '@/hooks/useLocale'

export const PricingSliderModal = ({ onComplete, onClose }) => {
  const { t } = useLocale()

  return (
    <>
      <DialogHeader onClose={onClose}>
        <DialogTitle>{t('offer.custom.title')}</DialogTitle>
      </DialogHeader>
      <DialogBody scrollable={false}>
        <PricingSlider onComplete={onComplete} />
      </DialogBody>
      <DialogFooter className='justify-center'>
        <Copyright />
      </DialogFooter>
    </>
  )
}
