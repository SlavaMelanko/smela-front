import './styles.scss'

import React from 'react'

const BodyCell = ({ children, className, ...props }) => (
  <td className={className} {...props}>
    {children}
  </td>
)

const HeaderCell = ({ children, className, ...props }) => (
  <th className={className} {...props}>
    {children}
  </th>
)

export { BodyCell, HeaderCell }
