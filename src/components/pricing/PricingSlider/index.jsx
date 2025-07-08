import './styles.scss'

import { useState } from 'react'

import { DiscountBadge } from '@/components/badges'
import { OfferButton } from '@/components/buttons'
import { Slider } from '@/components/inputs'
import useLocale from '@/hooks/useLocale'

import FeatureList from './FeatureList'
import PlanSummary from './Summary'

const PricingSlider = ({ discount, onComplete }) => {
  const { t } = useLocale()
  const [bandwidth, setBandwidth] = useState(1)

  return (
    <div className='pricing-slider'>
      {discount && (
        <DiscountBadge
          prefix={t('offer.discount.prefix')}
          label={t('offer.discount.label', { percent: discount })}
        />
      )}

      <Slider
        value={bandwidth}
        onChange={setBandwidth}
        min={1}
        max={1000}
        presetValues={[25, 50, 100, 250, 500]}
        unit={t('unit.traffic.gb')}
      />

      <div className='pricing-slider__summary'>
        <FeatureList value={bandwidth} />
        <PlanSummary value={bandwidth} discount={discount} />
      </div>

      <OfferButton onClick={onComplete}>{t('offer.cta')}</OfferButton>
    </div>
  )
}

export default PricingSlider
