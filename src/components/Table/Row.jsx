import './styles.scss'

const TableRow = ({ children, className = '', ...props }) => (
  <tr className={`table__row ${className}`} {...props}>
    {children}
  </tr>
)

export default TableRow
