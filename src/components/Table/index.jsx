import './styles.scss'

import TableBody from './Body'
import TableHeader from './Header'

const Table = ({ config, onRowClick }) => {
  return (
    <div className='table-container'>
      <table className='table'>
        <TableHeader config={config} />
        <TableBody config={config} onRowClick={onRowClick} />
      </table>
    </div>
  )
}

export default Table
