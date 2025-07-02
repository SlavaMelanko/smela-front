import './styles.scss'

import { flexRender } from '@tanstack/react-table'

import { TableHeaderCell } from './Cell'
import TableRow from './Row'

const TableHeader = ({ config }) => (
  <thead>
    {config.getHeaderGroups().map(headerGroup => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map(header => (
          <TableHeaderCell
            key={header.id}
            style={{ width: header.getSize?.() }}
            onClick={header.column.getToggleSortingHandler?.()}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
            {header.column.getIsSorted()
              ? header.column.getIsSorted() === 'asc'
                ? ' ↑'
                : ' ↓'
              : ''}
          </TableHeaderCell>
        ))}
      </TableRow>
    ))}
  </thead>
)

export default TableHeader
