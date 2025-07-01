import React from 'react'

const TableCell = ({ children, header = false, className = '', ...props }) => {
  const Tag = header ? 'th' : 'td'

  return (
    <Tag className={`table__cell ${className}`} {...props}>
      {children}
    </Tag>
  )
}

export default TableCell
