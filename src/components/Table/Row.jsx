import './styles.scss'

const TableRow = ({ children, className = '', ...props }) => (
  <tr className={className} {...props}>
    {children}
  </tr>
)

export default TableRow
