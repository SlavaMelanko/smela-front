import { Table as TableRoot } from '@/components/ui'

import { TableBody, TableHeader } from './elements'

export const Table = ({ config, onRowClick }) => (
  <TableRoot className='overflow-hidden rounded-md border bg-card shadow-sm'>
    <TableHeader config={config} />
    <TableBody config={config} onRowClick={onRowClick} />
  </TableRoot>
)
