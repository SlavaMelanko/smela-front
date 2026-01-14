import { flexRender } from '@tanstack/react-table'

import {
  TableBody as TableBodyRoot,
  TableCell,
  TableRow
} from '@/components/ui'
import { cn } from '@/lib/utils'

export const TableBody = ({ config, onRowClick }) => (
  <TableBodyRoot>
    {config.getRowModel().rows.map(row => (
      <TableRow
        key={row.id}
        className={cn(onRowClick && 'cursor-pointer')}
        onClick={onRowClick ? () => onRowClick(row.original) : undefined}
      >
        {row.getVisibleCells().map(cell => (
          <TableCell key={cell.id} className='text-center'>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBodyRoot>
)
