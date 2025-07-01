import './styles.scss'

import clsx from 'clsx'
import React, { useCallback, useMemo } from 'react'

import TableBody from './TableBody'
import TableCell from './TableCell'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

const Table = ({
  columns = [],
  data = [],
  renderCell,
  renderHeaderCell,
  className = '',
  ...props
}) => {
  const cols = useMemo(() => columns, [columns])
  const tableData = useMemo(() => data, [data])

  const cellRenderMemo = useCallback(
    (row, col) => {
      if (renderCell) {
        return renderCell(row, col)
      }

      return null
    },
    [renderCell]
  )

  const headerCellRenderMemo = useCallback(
    col => {
      if (renderHeaderCell) {
        return renderHeaderCell(col)
      }

      return col.label
    },
    [renderHeaderCell]
  )

  return (
    <table className={clsx('table', className)} {...props}>
      <TableHeader>
        <TableRow>
          {cols.map(col => (
            <TableCell key={col.key} header>
              {headerCellRenderMemo(col)}
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((row, rowIndex) => (
          <TableRow key={row.id || rowIndex}>
            {cols.map(col => (
              <TableCell key={col.key}>
                {cellRenderMemo && renderCell
                  ? cellRenderMemo(row, col)
                  : row[col.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </table>
  )
}

export default Table
