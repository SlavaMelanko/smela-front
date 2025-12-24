import './styles.scss'

import { useNavigate } from 'react-router-dom'

import Tooltip from '@/components/Tooltip'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useLocale from '@/hooks/useLocale'

import { Bandwidth, PricePerUnit, TotalPrice } from '../containers'

const translateUnit = (unit, t) => {
  return t(`unit.traffic.${unit.toLowerCase()}`)
}

const StandardPricingCard = ({
  title,
  bandwidth,
  pricePerUnit,
  totalPrice,
  features,
  redirectPath,
  hasDiscount
}) => {
  const { t, formatPrice } = useLocale()

  const navigate = useNavigate()

  return (
    <div className='pricing-card'>
      {hasDiscount && (
        <Badge variant='discount' className='pricing-card__discount-badge'>
          {t('offer.discount.label', { percent: 50 })}
        </Badge>
      )}

      <div className='pricing-card__header'>
        <h2 className='pricing-card__title'>{title}</h2>
      </div>

      <Bandwidth
        className='pricing-card__bandwidth'
        value={bandwidth.value}
        unit={translateUnit(bandwidth.unit, t)}
      />
      <PricePerUnit
        className='pricing-card__price-per-unit'
        original={formatPrice(pricePerUnit.original)}
        final={formatPrice(pricePerUnit.final)}
        unit={translateUnit(pricePerUnit.unit, t)}
      />
      <TotalPrice
        className='pricing-card__total-price'
        original={formatPrice(totalPrice.original)}
        final={formatPrice(totalPrice.final)}
      />

      <div className='pricing-card__features'>
        {features.map((feature, index) => (
          <Tooltip key={index} icon={feature.icon} text={feature.text} />
        ))}
      </div>

      <Button onClick={() => navigate(redirectPath)}>{t('offer.cta')}</Button>
    </div>
  )
}

export default StandardPricingCard
