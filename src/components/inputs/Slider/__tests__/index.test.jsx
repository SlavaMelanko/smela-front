import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Slider from '../index'

jest.mock('@/hooks/useLocale', () => ({
  __esModule: true,
  default: () => ({
    formatNumberWithUnit: (val, unit) => (unit ? `${val} ${unit}` : String(val))
  })
}))

const defaultProps = {
  value: 500,
  onChange: jest.fn(),
  min: 0,
  max: 1000,
  presetValues: [100, 250, 500, 750, 1000],
  unit: 'USD'
}

describe('Slider', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders labels with min, mid, and max values', () => {
    const { container } = render(<Slider {...defaultProps} />)

    const labels = container.querySelectorAll('.text-foreground')

    expect(labels[0]).toHaveTextContent('0 USD')
    expect(labels[1]).toHaveTextContent('500 USD')
    expect(labels[2]).toHaveTextContent('1000 USD')
  })

  it('renders preset buttons', () => {
    render(<Slider {...defaultProps} />)

    expect(screen.getByRole('button', { name: '100 USD' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '250 USD' })).toBeInTheDocument()
    expect(screen.getAllByText('500 USD')).toHaveLength(2) // label + preset
    expect(screen.getByRole('button', { name: '750 USD' })).toBeInTheDocument()
    expect(screen.getAllByText('1000 USD')).toHaveLength(2) // label + preset
  })

  it('calls onChange when preset button is clicked', async () => {
    const onChange = jest.fn()

    render(<Slider {...defaultProps} onChange={onChange} />)

    await userEvent.click(screen.getByRole('button', { name: '250 USD' }))

    expect(onChange).toHaveBeenCalledWith(250)
  })

  it('highlights active preset button', () => {
    render(<Slider {...defaultProps} value={750} />)

    const activeButton = screen.getByRole('button', { name: '750 USD' })

    expect(activeButton).toHaveClass('text-foreground')
  })

  it('renders without unit', () => {
    const { container } = render(<Slider {...defaultProps} unit={undefined} />)

    const labels = container.querySelectorAll('.text-foreground')

    expect(labels[0]).toHaveTextContent('0')
    expect(labels[2]).toHaveTextContent('1000')
  })
})
