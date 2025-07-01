import './styles.scss'

import clsx from 'clsx'

const PricePerUnitStub = ({ className = '' }) => (
  <div className={clsx('price-per-unit__stub', className)}></div>
)

export default PricePerUnitStub
