import './styles.scss'

import clsx from 'clsx'

const BandwidthStub = ({ className = '' }) => (
  <div className={clsx('bandwidth-container__stub', className)}></div>
)

export default BandwidthStub
