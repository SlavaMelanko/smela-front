import { flexRender } from '@tanstack/react-table'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  TableBody as TableBodyRoot,
  TableCell,
  TableRow
} from '@/components/ui'
import useLocale from '@/hooks/useLocale'
import { cn } from '@/lib/utils'

const RowCells = ({ row }) =>
  row.getVisibleCells().map(cell => (
    <TableCell key={cell.id} className='text-center'>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  ))

const TableRowContent = ({ row, onRowClick, contextMenu }) => {
  const { t } = useLocale()

  const visibleItems = contextMenu?.filter(
    item => item.isVisible?.(row.original) ?? true
  )

  const rowProps = {
    className: cn(onRowClick && 'cursor-pointer'),
    onClick: onRowClick ? () => onRowClick(row.original) : undefined
  }

  if (!visibleItems?.length) {
    return (
      <TableRow {...rowProps}>
        <RowCells row={row} />
      </TableRow>
    )
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger render={<TableRow {...rowProps} />}>
        <RowCells row={row} />
      </ContextMenuTrigger>
      <ContextMenuContent>
        {visibleItems.map(item => (
          <ContextMenuItem
            key={item.labelKey}
            onClick={() => item.onClick(row.original)}
          >
            {item.icon && <item.icon className='size-4' />}
            {t(item.labelKey)}
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  )
}

export const TableBody = ({ config, onRowClick, contextMenu }) => (
  <TableBodyRoot>
    {config.getRowModel().rows.map(row => (
      <TableRowContent
        key={row.id}
        row={row}
        onRowClick={onRowClick}
        contextMenu={contextMenu}
      />
    ))}
  </TableBodyRoot>
)
