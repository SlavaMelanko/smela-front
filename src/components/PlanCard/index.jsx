import './styles.scss'

import { Globe } from 'lucide-react'

const PlanCard = ({
  title,
  bandwidth,
  showGlobeIcon,
  pricePerGB,
  totalPrice,
  features,
  buttonText,
  hasDiscount,
  customPricing,
  customMessage
}) => {
  return (
    <div className='plan-card'>
      {hasDiscount && (
        <span className='plan-card__discount-badge'>-50% Off</span>
      )}

      <div className='plan-card__header'>
        <h2 className='plan-card__title'>{title}</h2>
      </div>

      {!customPricing ? (
        <>
          <div className='plan-card__bandwidth-container'>
            {showGlobeIcon && <Globe className='plan-card__globe-icon' />}
            <p className='plan-card__bandwidth'>{bandwidth}</p>
          </div>

          <p className='plan-card__price-per-gb'>
            <span className='plan-card__original-price'>
              {pricePerGB.original}
            </span>
            {pricePerGB.discounted}
          </p>

          <div className='plan-card__total-price'>
            <span className='plan-card__original-price'>
              {totalPrice.original}
            </span>
            <span className='plan-card__discounted-price'>
              {totalPrice.discounted}
            </span>
          </div>

          <div className='plan-card__features'>
            {features.map((feature, index) => (
              <div key={index} className='plan-card__feature'>
                {feature.icon}
                <span className='plan-card__feature-text'>{feature.text}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className='plan-card__spacer plan-card__spacer--bandwidth'></div>
          <div className='plan-card__spacer plan-card__spacer--price-per-gb'></div>

          <div className='plan-card__custom-price'>
            <span className='plan-card__discounted-price'>
              {totalPrice.discounted}
            </span>
          </div>

          <div className='plan-card__custom-message'>
            <p>{customMessage}</p>
          </div>
        </>
      )}

      <button className='plan-card__button'>{buttonText}</button>
    </div>
  )
}

export default PlanCard
