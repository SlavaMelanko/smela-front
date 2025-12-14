import './styles.scss'

import clsx from 'clsx'

const TableRow = ({ children, className, ...props }) => (
  <tr className={clsx('table__row', className)} {...props}>
    {children}
  </tr>
)

export default TableRow
