import './styles.scss'

import React from 'react'

const TableBodyCell = ({ children, className, ...props }) => (
  <td className={className} {...props}>
    {children}
  </td>
)

const TableHeaderCell = ({ children, className, ...props }) => (
  <th className={className} {...props}>
    {children}
  </th>
)

export { TableBodyCell, TableHeaderCell }
