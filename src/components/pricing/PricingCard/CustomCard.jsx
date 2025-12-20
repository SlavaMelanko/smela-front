import './styles.scss'

import clsx from 'clsx'

import { Button } from '@/components/ui/button'

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

      <Button variant='outline' onClick={() => showModal()}>
        {buttonText}
      </Button>
    </div>
  )
}

export default CustomPricingCard
