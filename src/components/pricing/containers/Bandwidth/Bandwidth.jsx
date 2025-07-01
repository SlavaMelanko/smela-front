import './styles.scss'

import clsx from 'clsx'

import { GlobeIcon } from '@/components/icons'

const Bandwidth = ({ value, unit, className = '', showIcon = true }) => (
  <div className={clsx('bandwidth-container', className)}>
    {showIcon && <GlobeIcon />}
    <p className='bandwidth-container__value'>
      {value} {unit}
    </p>
  </div>
)

export default Bandwidth
