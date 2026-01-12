import { useNavigate } from 'react-router-dom'

import {
  Badge,
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui'
import useLocale from '@/hooks/useLocale'

import { Bandwidth, PricePerUnit, TotalPrice } from './elements'

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
  discountPercent
}) => {
  const { t, formatPrice } = useLocale()
  const navigate = useNavigate()

  return (
    <div className='relative flex h-[460px] w-full flex-col rounded-lg border bg-card p-4 shadow-sm transition-shadow hover:border-primary hover:shadow-lg'>
      {discountPercent > 0 && (
        <Badge variant='discount' className='absolute -top-4 -right-3'>
          {t('offer.discount.label', { percent: discountPercent })}
        </Badge>
      )}

      <h2 className='mb-8 text-3xl font-bold text-foreground'>{title}</h2>

      <Bandwidth
        className='mb-8'
        value={bandwidth.value}
        unit={translateUnit(bandwidth.unit, t)}
      />
      <PricePerUnit
        className='mb-8'
        original={formatPrice(pricePerUnit.original)}
        final={formatPrice(pricePerUnit.final)}
        unit={translateUnit(pricePerUnit.unit, t)}
      />
      <TotalPrice
        original={formatPrice(totalPrice.original)}
        final={formatPrice(totalPrice.final)}
      />

      <div className='flex flex-1 flex-wrap items-center justify-center gap-6'>
        {features.map((feature, index) => (
          <Tooltip key={index}>
            <TooltipTrigger>{feature.icon}</TooltipTrigger>
            <TooltipContent>{feature.text}</TooltipContent>
          </Tooltip>
        ))}
      </div>

      <Button
        className='mt-auto w-full uppercase'
        onClick={() => navigate(redirectPath)}
      >
        {t('offer.cta')}
      </Button>
    </div>
  )
}

export default StandardPricingCard
