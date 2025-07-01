import {
  columns,
  initialColumnVisibility,
  users
} from '../../data/demo/adminUsersTableData'
import UsersTable from '../dialogs/UserList/UsersTable'
import Checkbox from '../inputs/Checkbox'
import Table from './Table'
import TableCell from './TableCell'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

export default {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    rowCount: {
      control: { type: 'number', min: 1, max: 20 },
      defaultValue: 4,
      description: 'Number of rows'
    },
    colCount: {
      control: { type: 'number', min: 1, max: 10 },
      defaultValue: 5,
      description: 'Number of columns'
    }
  },
  args: {
    rowCount: 4,
    colCount: 5
  }
}

const generateColumns = colCount => {
  return Array.from({ length: colCount }, (_, i) => ({
    key: `col${i + 1}`,
    label: `Col ${i + 1}`
  }))
}

const generateData = (rowCount, colCount) => {
  return Array.from({ length: rowCount }, (_, rowIdx) => {
    const row = {}

    for (let col = 0; col < colCount; col++) {
      row[`col${col + 1}`] =
        col % 2 === 0 ? `R ${rowIdx + 1} C ${col + 1}` : Math.random() > 0.5
    }

    return row
  })
}

export const BasicTable = {
  render: ({ rowCount, colCount }) => {
    const columns = generateColumns(colCount)
    const data = generateData(rowCount, colCount)

    return <Table columns={columns} data={data} />
  },
  parameters: {
    controls: {
      include: ['rowCount', 'colCount']
    }
  },
  args: {
    rowCount: 4,
    colCount: 5
  }
}

export const CustomCellTable = {
  render: ({ rowCount, colCount, onCheckboxChange }) => {
    const columns = generateColumns(colCount)
    const data = generateData(rowCount, colCount)
    const handleCheckboxChange = (event, row, col) => {
      if (onCheckboxChange) {
        onCheckboxChange(event.target.checked, row, col)
      }
    }

    return (
      <Table
        columns={columns}
        data={data}
        renderCell={(row, col) =>
          typeof row[col.key] === 'boolean' ? (
            <Checkbox
              onChange={e => handleCheckboxChange(e, row, col)}
              data-testid={`checkbox-${col.key}-${row.id || ''}`}
              table
            />
          ) : (
            row[col.key]
          )
        }
      />
    )
  },
  parameters: {
    controls: {
      include: ['rowCount', 'colCount', 'onCheckboxChange']
    }
  },
  argTypes: {
    onCheckboxChange: { action: 'checkbox changed' }
  },
  args: {
    rowCount: 4,
    colCount: 5
  }
}

export const OnlyHeader = {
  render: () => (
    <table className='table'>
      <TableHeader>
        <TableRow>
          <TableCell header>Header 1</TableCell>
          <TableCell header>Header 2</TableCell>
        </TableRow>
      </TableHeader>
    </table>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true }
  }
}

export const OnlyRow = {
  render: () => (
    <table className='table'>
      <tbody>
        <TableRow>
          <TableCell>Cell 1</TableCell>
          <TableCell>Cell 2</TableCell>
        </TableRow>
      </tbody>
    </table>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true }
  }
}

export const OnlyCell = {
  render: () => (
    <table className='table'>
      <tbody>
        <tr>
          <TableCell>Cell 1</TableCell>
        </tr>
      </tbody>
    </table>
  ),
  parameters: {
    controls: { hideNoControlsWarning: true }
  }
}

export const AdminUsers = {
  render: () => (
    <UsersTable
      data={users}
      columns={columns}
      initialColumnVisibility={initialColumnVisibility}
    />
  )
}
