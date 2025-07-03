import './styles.scss'

import { flexRender } from '@tanstack/react-table'

import { BodyCell as Cell } from './Cell'
import Row from './Row'

const TableBody = ({ config }) => (
  <tbody>
    {config.getRowModel().rows.map(row => (
      <Row key={row.id}>
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
