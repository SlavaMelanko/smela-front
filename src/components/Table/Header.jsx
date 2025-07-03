import './styles.scss'

import { flexRender } from '@tanstack/react-table'

import { HeaderCell as Cell } from './Cell'
import Row from './Row'

const TableHeader = ({ config }) => (
  <thead>
    {config.getHeaderGroups().map(headerGroup => (
      <Row key={headerGroup.id}>
        {headerGroup.headers.map(header => (
          <Cell
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
          </Cell>
        ))}
      </Row>
    ))}
  </thead>
)

export default TableHeader
