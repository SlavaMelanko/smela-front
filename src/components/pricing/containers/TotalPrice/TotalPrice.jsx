import './styles.scss'

import clsx from 'clsx'

const TotalPrice = ({ original, final, className = '' }) => {
  const hasDiscount = !!final && final < original

  return (
    <div className={clsx('total-price', className)}>
      {hasDiscount ? (
        <>
          <span className='total-price__original'>{original}</span>
          <span className='total-price__final'>{final}</span>
        </>
      ) : (
        <span className='total-price__final'>{original}</span>
      )}
    </div>
  )
}

export default TotalPrice
