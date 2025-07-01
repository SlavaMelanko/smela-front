import './styles.scss'

import Copyright from '@/components/Copyright'
import { ModalBody, ModalFooter, ModalHeader } from '@/components/Modal'
import { PricingSlider } from '@/components/pricing'
import useLocale from '@/hooks/useLocale'

export const PricingSliderModal = ({ onComplete, onClose }) => {
  const { t } = useLocale()

  return (
    <div className='pricing-slider-modal'>
      <ModalHeader borderBottom={false} onClose={onClose}>
        {t('offer.custom.title')}
      </ModalHeader>
      <ModalBody scrollable={false} padding='sm'>
        <PricingSlider
          onComplete={() => {
            onComplete()
          }}
        />
      </ModalBody>
      <ModalFooter justify='center' spacing='sm' borderTop={false}>
        <Copyright />
      </ModalFooter>
    </div>
  )
}
