import { Table as TableRoot } from '@/components/ui'

import { TableBody, TableHeader } from './elements'

export const Table = ({ config, onRowClick, contextMenu }) => (
  <div className='overflow-hidden rounded-md'>
    <TableRoot>
      <TableHeader config={config} />
      <TableBody
        config={config}
        onRowClick={onRowClick}
        contextMenu={contextMenu}
      />
    </TableRoot>
  </div>
)
