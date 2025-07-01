import './styles.scss'

import clsx from 'clsx'

const formatPrice = (price, unit) => `${price} / ${unit}`

const PricePerUnit = ({ original, final, unit, className = '' }) => {
  const hasDiscount = !!final && final < original

  return (
    <p className={clsx('price-per-unit', className)}>
      {hasDiscount ? (
        <>
          <span className='price-per-unit__original'>{original}</span>
          {formatPrice(final, unit)}
        </>
      ) : (
        <>{formatPrice(original, unit)}</>
      )}
    </p>
  )
}

export default PricePerUnit
