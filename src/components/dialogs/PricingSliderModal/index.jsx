import './styles.scss'

import Copyright from '@/components/Copyright'
import { ModalBody, ModalFooter, ModalHeader } from '@/components/Modal'
import { PricingSlider } from '@/components/pricing'
import useLocale from '@/hooks/useLocale'

export const PricingSliderModal = ({ onComplete, onClose }) => {
  const { t } = useLocale()

  return (
    <div className='pricing-slider-modal'>
      <ModalHeader onClose={onClose}>{t('offer.custom.title')}</ModalHeader>
      <ModalBody scrollable={false}>
        <PricingSlider
          onComplete={() => {
            onComplete()
          }}
        />
      </ModalBody>
      <ModalFooter>
        <Copyright />
      </ModalFooter>
    </div>
  )
}
