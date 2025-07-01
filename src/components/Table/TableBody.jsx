import React from 'react'

const TableBody = ({ children, className = '', ...props }) => (
  <tbody className={`table__body ${className}`} {...props}>
    {children}
  </tbody>
)

export default TableBody
