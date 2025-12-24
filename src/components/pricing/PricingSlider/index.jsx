import './styles.scss'

import { useState } from 'react'

import { Slider } from '@/components/inputs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useLocale from '@/hooks/useLocale'

import FeatureList from './FeatureList'
import PlanSummary from './Summary'

const PricingSlider = ({ discount, onComplete }) => {
  const { t } = useLocale()
  const [bandwidth, setBandwidth] = useState(1)

  return (
    <div className='pricing-slider'>
      {discount && (
        <Badge variant='discount'>
          {t('offer.discount.label', { percent: discount })}
        </Badge>
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

      <Button className='w-full' onClick={onComplete}>
        {t('offer.cta')}
      </Button>
    </div>
  )
}

export default PricingSlider
