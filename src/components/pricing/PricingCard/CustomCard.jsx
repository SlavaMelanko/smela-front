import './styles.scss'

import clsx from 'clsx'

import { OfferButton } from '@/components/buttons'

import { BandwidthStub, PricePerUnitStub, TotalPriceStub } from '../containers'

const CustomPricingCard = ({
  title,
  totalPrice,
  customMessage,
  buttonText,
  showModal,
  className
}) => {
  return (
    <div className={clsx('pricing-card', className)}>
      <div className='pricing-card__header'>
        <h2 className='pricing-card__title'>{title}</h2>
      </div>

      <BandwidthStub />
      <PricePerUnitStub />
      <TotalPriceStub
        className='pricing-card__total-price'
        text={totalPrice.original}
      />

      <div className='pricing-card__custom-message'>
        <p>{customMessage}</p>
      </div>

      <OfferButton
        className='pricing-card__cta'
        variant='outlined'
        onClick={() => showModal()}
      >
        {buttonText}
      </OfferButton>
    </div>
  )
}

export default CustomPricingCard
