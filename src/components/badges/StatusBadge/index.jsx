import './styles.scss'

import clsx from 'clsx'

const StatusBadge = ({ status }) => (
  <span className={clsx('status-badge', `status-badge--${status}`)}>
    {status}
  </span>
)

export default StatusBadge
