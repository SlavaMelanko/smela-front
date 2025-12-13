import { render } from '@testing-library/react'

import ActiveIndicator from '../ActiveIndicator'

describe('ActiveIndicator', () => {
  it('renders without variant', () => {
    const { container } = render(<ActiveIndicator />)

    const indicator = container.querySelector('.active-indicator')

    expect(indicator).toBeInTheDocument()
  })

  it('renders with item variant', () => {
    const { container } = render(<ActiveIndicator variant='item' />)

    const indicator = container.querySelector('.active-indicator')

    expect(indicator).toHaveClass('active-indicator--item')
  })

  it('renders with sub-item variant', () => {
    const { container } = render(<ActiveIndicator variant='sub-item' />)

    const indicator = container.querySelector('.active-indicator')

    expect(indicator).toHaveClass('active-indicator--sub-item')
  })
})
