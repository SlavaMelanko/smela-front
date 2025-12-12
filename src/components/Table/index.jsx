import './styles.scss'

import TableBody from './Body'
import TableHeader from './Header'

const Table = ({ config, onRowClick }) => {
  return (
    <table className='table'>
      <TableHeader config={config} />
      <TableBody config={config} onRowClick={onRowClick} />
    </table>
  )
}

export default Table
