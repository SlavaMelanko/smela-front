import './styles.scss'

import clsx from 'clsx'

import useLocale from '@/hooks/useLocale'

import { Bandwidth, PricePerUnit, TotalPrice } from '../../containers'

const getPricePerGB = bandwidth => {
  const price = 4 - ((bandwidth - 1) / 998) * 2

  return parseFloat(price.toFixed(2))
}

const getPricePerGbWithDiscount = (bandwidth, discount) => {
  const price = 4 - ((bandwidth - 1) / 998) * 2
  const priceWithDiscount = price * (1 - discount / 100)

  return parseFloat(priceWithDiscount.toFixed(2))
}

const SummaryItem = ({
  label,
  value,
  valueWithDiscount,
  isTotal = false,
  discount
}) => (
  <div
    className={clsx(`slider__detail-row`, {
      'slider__detail-row--total': isTotal,
      'slider__detail-row--discounted': discount
    })}
  >
    {discount ? (
      <>
        {label}{' '}
        <div className='slider__detail-row__prices'>
          <span className='slider__detail-row__old-price'>{value}</span>{' '}
          <span className='slider__detail-row__new-price'>
            {valueWithDiscount}
          </span>
        </div>
      </>
    ) : (
      <>
        {label} <span>{value}</span>
      </>
    )}
  </div>
)

const PlanSummary = ({ value, discount }) => {
  const { t, formatNumber, formatPrice } = useLocale()

  const pricePerGB = getPricePerGB(value)
  const totalPrice = (value * pricePerGB).toFixed(2)
  const pricePerGbWithDiscount = getPricePerGbWithDiscount(value, discount)
  const totalPriceWithDiscount = (value * pricePerGbWithDiscount).toFixed(2)

  return (
    <div className='slider__details'>
      <SummaryItem
        label={t('offer.summary.selected')}
        value={
          <Bandwidth
            value={formatNumber(value)}
            unit={t('unit.traffic.gb')}
            showIcon={false}
          />
        }
      />
      <SummaryItem
        label={t('offer.summary.price')}
        value={
          <PricePerUnit
            original={formatPrice(pricePerGB)}
            final={formatPrice(pricePerGbWithDiscount)}
            unit={t('unit.traffic.gb')}
          />
        }
      />
      <SummaryItem
        label={t('offer.summary.total')}
        value={
          <TotalPrice
            original={formatPrice(totalPrice)}
            final={formatPrice(totalPriceWithDiscount)}
          />
        }
      />
    </div>
  )
}

export default PlanSummary
