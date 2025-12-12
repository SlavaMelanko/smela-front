import './styles.scss'

import { flexRender } from '@tanstack/react-table'
import clsx from 'clsx'

import { BodyCell as Cell } from './Cell'
import Row from './Row'

const TableBody = ({ config, onRowClick }) => (
  <tbody>
    {config.getRowModel().rows.map(row => (
      <Row
        key={row.id}
        className={clsx({ 'table__row--clickable': onRowClick })}
        onClick={onRowClick ? () => onRowClick(row.original) : undefined}
      >
        {row.getVisibleCells().map(cell => (
          <Cell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </Cell>
        ))}
      </Row>
    ))}
  </tbody>
)

export default TableBody
