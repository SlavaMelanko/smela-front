import './styles.scss'

import { flexRender } from '@tanstack/react-table'

import { TableBodyCell } from './Cell'
import TableRow from './Row'

const TableBody = ({ config }) => (
  <tbody>
    {config.getRowModel().rows.map(row => (
      <TableRow key={row.id}>
        {row.getVisibleCells().map(cell => (
          <TableBodyCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableBodyCell>
        ))}
      </TableRow>
    ))}
  </tbody>
)

export default TableBody
