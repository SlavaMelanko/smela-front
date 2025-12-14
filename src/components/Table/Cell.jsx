import './styles.scss'

import clsx from 'clsx'

const BodyCell = ({ children, className, ...props }) => (
  <td className={clsx('table__cell', className)} {...props}>
    {children}
  </td>
)

const HeaderCell = ({ children, className, ...props }) => (
  <th className={clsx('table__header-cell', className)} {...props}>
    {children}
  </th>
)

export { BodyCell, HeaderCell }
