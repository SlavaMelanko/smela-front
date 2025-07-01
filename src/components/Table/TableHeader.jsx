import React from 'react'

const TableHeader = ({ children, className = '', ...props }) => (
  <thead className={`table__header ${className}`} {...props}>
    {children}
  </thead>
)

export default TableHeader
