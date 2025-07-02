import './styles.scss'

import TableBody from './Body'
import TableHeader from './Header'

const Table = ({ config }) => {
  return (
    <table className='table' style={{ width: '100%' }}>
      <TableHeader config={config} />
      <TableBody config={config} />
    </table>
  )
}

export default Table
