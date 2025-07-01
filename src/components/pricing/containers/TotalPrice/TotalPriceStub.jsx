import './styles.scss'

import clsx from 'clsx'

const TotalPriceStub = ({ text, className = '' }) => (
  <div className={clsx('total-price', className)}>
    <span className='total-price__final'>{text}</span>
  </div>
)

export default TotalPriceStub
