import { Table as TableRoot } from '@/components/ui/table'

import TableBody from './Body'
import TableHeader from './Header'

const Table = ({ config, onRowClick }) => (
  <TableRoot className='overflow-hidden rounded-md border bg-card shadow-sm'>
    <TableHeader config={config} />
    <TableBody config={config} onRowClick={onRowClick} />
  </TableRoot>
)

export default Table
