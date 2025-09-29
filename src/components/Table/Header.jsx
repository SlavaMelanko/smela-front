import './styles.scss'

import { flexRender } from '@tanstack/react-table'
import clsx from 'clsx'

import { HeaderCell as Cell } from './Cell'
import Row from './Row'

const TableHeader = ({ config }) => (
  <thead>
    {config.getHeaderGroups().map(headerGroup => (
      <Row key={headerGroup.id}>
        {headerGroup.headers.map(header => (
          <Cell
            key={header.id}
            colSpan={header.colSpan}
            style={{ width: header.getSize?.() }}
            onClick={header.column.getToggleSortingHandler?.()}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
            {header.column.getIsSorted()
              ? header.column.getIsSorted() === 'asc'
                ? ' ↑'
                : ' ↓'
              : ''}
            <div
              onDoubleClick={() => header.column.resetSize()}
              onMouseDown={header.getResizeHandler()}
              onTouchStart={header.getResizeHandler()}
              className={clsx('table__header-resizer', {
                'table__header-resizer--active': header.column.getIsResizing()
              })}
            />
          </Cell>
        ))}
      </Row>
    ))}
  </thead>
)

export default TableHeader
